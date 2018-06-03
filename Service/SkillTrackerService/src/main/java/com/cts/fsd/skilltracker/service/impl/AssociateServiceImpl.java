package com.cts.fsd.skilltracker.service.impl;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.cts.fsd.skilltracker.model.AssociateDetails;
import com.cts.fsd.skilltracker.model.Response;
import com.cts.fsd.skilltracker.model.Skill;
import com.cts.fsd.skilltracker.repository.AssociateRepository;
import com.cts.fsd.skilltracker.repository.entity.AssociateSkillsTable;
import com.cts.fsd.skilltracker.repository.entity.AssociateTable;
import com.cts.fsd.skilltracker.repository.entity.SkillsTable;
import com.cts.fsd.skilltracker.service.AssociateService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AssociateServiceImpl implements AssociateService {

	@Autowired
	AssociateRepository repository;

	@Override
	public ResponseEntity<List<AssociateDetails>> getAllAssociates() {
		List<AssociateDetails> associateList = new ArrayList<>();
		try {
			List<AssociateTable> associateTableList = repository.findAll();
			if (associateTableList != null && !associateTableList.isEmpty()) {
				for (AssociateTable associateTable : associateTableList) {
					AssociateDetails details = new AssociateDetails();
					details.setAssociateId(associateTable.getAssociateId());
					details.setEmail(associateTable.getEmail());
					details.setLevel1(associateTable.isLevel1());
					details.setLevel2(associateTable.isLevel2());
					details.setLevel3(associateTable.isLevel3());
					details.setMobile(associateTable.getMobile());
					details.setName(associateTable.getName());
					details.setPic(Base64.getEncoder().encodeToString(associateTable.getPic()));
					details.setRemark(associateTable.getRemark());
					details.setStatusBlue(associateTable.isStatusBlue());
					details.setStatusGreen(associateTable.isStatusGreen());
					details.setStatusRed(associateTable.isStatusRed());
					details.setStrength(associateTable.getStrength());
					details.setWeakness(associateTable.getWeakness());
					List<Skill> skills = new ArrayList<Skill>();
					for (AssociateSkillsTable associateSkillTable : associateTable.getAssociateSkills()) {
						Skill skill = new Skill();
						skill.setSkillId(associateSkillTable.getSkills().getSkillId());
						skill.setSkillName(associateSkillTable.getSkills().getSkillName());
						skill.setSkillLevel(associateSkillTable.getSkillLevel());
						skills.add(skill);
					}
					details.setSkills(skills);
					associateList.add(details);
				}

				return new ResponseEntity<List<AssociateDetails>>(associateList, HttpStatus.OK);
			} else {
				return new ResponseEntity<List<AssociateDetails>>(associateList, HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return new ResponseEntity<List<AssociateDetails>>(associateList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<Response> saveAssociate(MultipartFile file,String associateDetailString) {
		AssociateTable associateTable = new AssociateTable();
		
		try {
			if (!StringUtils.isEmpty(associateDetailString)) {
				
				AssociateDetails associateDetails = new ObjectMapper().readValue(associateDetailString,
						AssociateDetails.class);

				associateTable.setAssociateId(associateDetails.getAssociateId());
				associateTable.setEmail(associateDetails.getEmail());
				associateTable.setLevel1(associateDetails.isLevel1());
				associateTable.setLevel2(associateDetails.isLevel2());
				associateTable.setLevel3(associateDetails.isLevel3());
				associateTable.setMobile(associateDetails.getMobile());
				associateTable.setName(associateDetails.getName());
				associateTable.setPic(file.getBytes());
				associateTable.setRemark(associateDetails.getRemark());
				associateTable.setStatusBlue(associateDetails.isStatusBlue());
				associateTable.setStatusGreen(associateDetails.isStatusGreen());
				associateTable.setStatusRed(associateDetails.isStatusRed());
				associateTable.setStrength(associateDetails.getStrength());
				associateTable.setWeakness(associateDetails.getWeakness());
				Set<AssociateSkillsTable> associateSkillsTableList = new HashSet<AssociateSkillsTable>();
				for (Skill skill : associateDetails.getSkills()) {
					SkillsTable skillTable = new SkillsTable();
					skillTable.setSkillId(skill.getSkillId());
					skillTable.setSkillName(skill.getSkillName());
					AssociateSkillsTable associateSkillsTable = new AssociateSkillsTable();
					associateSkillsTable.setAssociates(associateTable);
					associateSkillsTable.setSkills(skillTable);
					associateSkillsTable.setSkillLevel(skill.getSkillLevel());
					associateSkillsTableList.add(associateSkillsTable);
				}
				associateTable.setAssociateSkills(associateSkillsTableList);
				repository.save(associateTable);
				return new ResponseEntity<Response>(new Response("Success"), HttpStatus.OK);
			} else {
				return new ResponseEntity<Response>(new Response("Insufficienrt data"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<Response>(new Response("Failed"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<AssociateDetails> getAssociateById(String id) {
		AssociateDetails details = new AssociateDetails();
		try {
			if (id != null) {
				int idNum=Integer.parseInt(id);
				AssociateTable associateTable = repository.findById(idNum).get();

				details.setAssociateId(associateTable.getAssociateId());
				details.setEmail(associateTable.getEmail());
				details.setLevel1(associateTable.isLevel1());
				details.setLevel2(associateTable.isLevel2());
				details.setLevel3(associateTable.isLevel3());
				details.setMobile(associateTable.getMobile());
				details.setName(associateTable.getName());
				details.setPic(Base64.getEncoder().encodeToString(associateTable.getPic()));
				details.setRemark(associateTable.getRemark());
				details.setStatusBlue(associateTable.isStatusBlue());
				details.setStatusGreen(associateTable.isStatusGreen());
				details.setStatusRed(associateTable.isStatusRed());
				details.setStrength(associateTable.getStrength());
				details.setWeakness(associateTable.getWeakness());
				List<Skill> skills = new ArrayList<Skill>();
				for (AssociateSkillsTable associateSkillTable : associateTable.getAssociateSkills()) {
					Skill skill = new Skill();
					skill.setSkillId(associateSkillTable.getSkills().getSkillId());
					skill.setSkillName(associateSkillTable.getSkills().getSkillName());
					skill.setSkillLevel(associateSkillTable.getSkillLevel());
					skills.add(skill);
				}
				details.setSkills(skills);
				return new ResponseEntity<AssociateDetails>(details, HttpStatus.OK);
			} else {
				return new ResponseEntity<AssociateDetails>(details, HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<AssociateDetails>(details, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<Response> deleteAssociate(AssociateDetails associateDetails) {
		AssociateTable associateTable = new AssociateTable();
		try {
			if (associateDetails != null) {
				associateTable.setAssociateId(associateDetails.getAssociateId());
				associateTable.setEmail(associateDetails.getEmail());
				associateTable.setLevel1(associateDetails.isLevel1());
				associateTable.setLevel2(associateDetails.isLevel2());
				associateTable.setLevel3(associateDetails.isLevel3());
				associateTable.setMobile(associateDetails.getMobile());
				associateTable.setName(associateDetails.getName());
				associateTable.setPic(associateDetails.getPic().getBytes());
				associateTable.setRemark(associateDetails.getRemark());
				associateTable.setStatusBlue(associateDetails.isStatusBlue());
				associateTable.setStatusGreen(associateDetails.isStatusGreen());
				associateTable.setStatusRed(associateDetails.isStatusRed());
				associateTable.setStrength(associateDetails.getStrength());
				associateTable.setWeakness(associateDetails.getWeakness());
				Set<AssociateSkillsTable> associateSkillsTableList = new HashSet<AssociateSkillsTable>();
				for (Skill skill : associateDetails.getSkills()) {
					SkillsTable skillTable = new SkillsTable();
					skillTable.setSkillId(skill.getSkillId());
					skillTable.setSkillName(skill.getSkillName());
					AssociateSkillsTable associateSkillsTable = new AssociateSkillsTable();
					associateSkillsTable.setAssociates(associateTable);
					associateSkillsTable.setSkills(skillTable);
					associateSkillsTable.setSkillLevel(skill.getSkillLevel());
					associateSkillsTableList.add(associateSkillsTable);
				}
				associateTable.setAssociateSkills(associateSkillsTableList);
				repository.delete(associateTable);
				return new ResponseEntity<Response>(new Response("Success"), HttpStatus.OK);
			} else {
				return new ResponseEntity<Response>(new Response("Insufficienrt data"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<Response>(new Response("Failed"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
