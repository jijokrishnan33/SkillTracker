package com.cts.fsd.skilltracker.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.cts.fsd.skilltracker.model.Response;
import com.cts.fsd.skilltracker.model.Skill;

public interface SkillService {

	ResponseEntity<List<Skill>> getAllSkills();

	ResponseEntity<Response> saveSkill(Skill skill);

	ResponseEntity<Response> deleteSkill(Skill skill);

}
