package com.cts.fsd.skilltracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cts.fsd.skilltracker.model.Response;
import com.cts.fsd.skilltracker.model.Skill;
import com.cts.fsd.skilltracker.service.SkillService;

@RestController
@CrossOrigin(origins="*")
public class SkillController {

	@Autowired
	SkillService skillService;

	@RequestMapping(value="/skills/getall",method = RequestMethod.GET)
	public ResponseEntity<List<Skill>> getAllSkills(){
		
		return skillService.getAllSkills();
		
	}
	
	@RequestMapping(value="/skills/save",method = RequestMethod.POST)
	public ResponseEntity<Response> saveSkill(@RequestBody Skill skill){
		
		return skillService.saveSkill(skill);
		
	}
	
	@RequestMapping(value="/skills/delete",method = RequestMethod.POST)
	public ResponseEntity<Response> deleteSkill(@RequestBody Skill skill){
		
		return skillService.deleteSkill(skill);
		
	}
}
