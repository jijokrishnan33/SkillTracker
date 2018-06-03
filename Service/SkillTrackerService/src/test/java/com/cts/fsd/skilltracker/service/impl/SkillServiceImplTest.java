package com.cts.fsd.skilltracker.service.impl;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.cts.fsd.skilltracker.model.AssociateDetails;
import com.cts.fsd.skilltracker.model.Response;
import com.cts.fsd.skilltracker.model.Skill;
import com.cts.fsd.skilltracker.repository.SkillRepository;
import com.cts.fsd.skilltracker.repository.entity.AssociateTable;
import com.cts.fsd.skilltracker.repository.entity.SkillsTable;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
public class SkillServiceImplTest {

	@Mock
	SkillRepository repository;

	@InjectMocks
	private SkillServiceImpl service;

	SkillsTable table = new SkillsTable();
	List<SkillsTable> skillLists = new ArrayList<SkillsTable>();
	Skill skill = new Skill();

	@Before
	public void setup() {
		table.setSkillId(1);
		table.setSkillName("skillName");
		skillLists.add(table);

		skill.setSkillId(2);
		skill.setSkillName("skillName");
	}

	@Test
	public void testGetAllSkills() {

		Mockito.when(repository.findAll()).thenReturn(skillLists);
		ResponseEntity<List<Skill>> getResponse = service.getAllSkills();
		assertEquals(1, getResponse.getBody().size());
	}

	@Test
	public void testGetAllSkillsBadInputScenario() {

		Mockito.when(repository.findAll()).thenReturn(null);
		ResponseEntity<List<Skill>> getResponse = service.getAllSkills();
		assertEquals(HttpStatus.NO_CONTENT, getResponse.getStatusCode());
	}

	@Test
	public void testGetAllSkillsExceptionScenario() {

		Mockito.when(repository.findAll()).thenThrow(NullPointerException.class);
		ResponseEntity<List<Skill>> getResponse = service.getAllSkills();
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, getResponse.getStatusCode());
	}

	@Test
	public void testSaveSkills() {

		Mockito.when(repository.save(Mockito.any(SkillsTable.class))).thenReturn(table);
		ResponseEntity<Response> response = service.saveSkill(skill);
		assertEquals("Success", response.getBody().getMessage());
	}

	@Test
	public void testSaveSkillsBadRequest() {

		Mockito.when(repository.save(Mockito.any(SkillsTable.class))).thenReturn(table);
		ResponseEntity<Response> response = service.saveSkill(null);
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}

	@Test
	public void testSaveSkillsException() {

		Mockito.when(repository.save(Mockito.any(SkillsTable.class))).thenThrow(NullPointerException.class);
		ResponseEntity<Response> response = service.saveSkill(skill);
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
	}

	@Test
	public void testDeleteSkill() throws Exception {
		Mockito.doNothing().when(repository).delete(Mockito.any(SkillsTable.class));
		ResponseEntity<Response> getResponse=service.deleteSkill(skill);
		assertEquals(HttpStatus.OK, getResponse.getStatusCode());
	}
	@Test
	public void testDeleteSkillBadRequest() {
		Mockito.doNothing().when(repository).delete(Mockito.any(SkillsTable.class));
		ResponseEntity<Response> response=service.deleteSkill(null);
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
	
}
