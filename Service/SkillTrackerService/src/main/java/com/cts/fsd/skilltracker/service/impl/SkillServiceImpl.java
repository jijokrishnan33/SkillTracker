package com.cts.fsd.skilltracker.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cts.fsd.skilltracker.model.Response;
import com.cts.fsd.skilltracker.model.Skill;
import com.cts.fsd.skilltracker.repository.SkillRepository;
import com.cts.fsd.skilltracker.repository.entity.SkillsTable;
import com.cts.fsd.skilltracker.service.SkillService;

@Service
public class SkillServiceImpl implements SkillService {

	@Autowired
	SkillRepository repository;

	@Override
	@Cacheable("skills")
	public ResponseEntity<List<Skill>> getAllSkills() {
		List<Skill> skillList = new ArrayList<>();
		try {
			List<SkillsTable> skillTableList = repository.findAll();
			if (skillTableList != null && !skillTableList.isEmpty()) {
				for (SkillsTable skillsTable : skillTableList) {
					Skill skill = new Skill();
					skill.setSkillId(skillsTable.getSkillId());
					skill.setSkillName(skillsTable.getSkillName());
					skillList.add(skill);
				}
				return new ResponseEntity<List<Skill>>(skillList, HttpStatus.OK);
			} else {
				return new ResponseEntity<List<Skill>>(skillList, HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return new ResponseEntity<List<Skill>>(skillList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	@CacheEvict(cacheNames= {"skills","associates"},allEntries = true)
	public ResponseEntity<Response> saveSkill(Skill skill) {
		SkillsTable skillTable = new SkillsTable();
		try {
			if (skill != null) {
				skillTable.setSkillId(skill.getSkillId());
				skillTable.setSkillName(skill.getSkillName());
				repository.save(skillTable);
				return new ResponseEntity<Response>(new Response("Success"), HttpStatus.OK);
			} else {
				return new ResponseEntity<Response>(new Response("Insufficienrt data"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<Response>(new Response("Failed"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	@CacheEvict(cacheNames= {"skills","associates"},allEntries = true)
	public ResponseEntity<Response> deleteSkill(Skill skill) {
		SkillsTable skillTable = new SkillsTable();
		try {
			if (skill != null) {
				skillTable.setSkillId(skill.getSkillId());
				skillTable.setSkillName(skill.getSkillName());
				repository.delete(skillTable);
				return new ResponseEntity<Response>(new Response("Success"), HttpStatus.OK);
			} else {
				return new ResponseEntity<Response>(new Response("Insufficienrt data"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<Response>(new Response("Failed"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
