package com.cts.fsd.skilltracker.service.impl;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;

import com.cts.fsd.skilltracker.model.AssociateDetails;
import com.cts.fsd.skilltracker.model.Response;
import com.cts.fsd.skilltracker.repository.AssociateRepository;
import com.cts.fsd.skilltracker.repository.entity.AssociateSkillId;
import com.cts.fsd.skilltracker.repository.entity.AssociateSkillsTable;
import com.cts.fsd.skilltracker.repository.entity.AssociateTable;
import com.cts.fsd.skilltracker.repository.entity.SkillsTable;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
public class AssociateServiceImplTest {

	@Mock
	AssociateRepository repository;

	@InjectMocks
	private AssociateServiceImpl service;
	
	
	AssociateTable table = new AssociateTable();
	List<AssociateTable> associateLists = new ArrayList<AssociateTable>();
	
	String associateDetailString = "{\"associateId\":3,\"name\":\"name\",\"email\":\"\",\"mobile\":\"1213546\",\"pic\":\"com.mysql.jdbc.Blob@23f5ff57\",\"statusGreen\":false,\"statusBlue\":true,\"statusRed\":false,\"level1\":true,\"level2\":false,\"level3\":false,\"remark\":\"\",\"strength\":\"\",\"weakness\":\"\",\"skills\":[{\"skillId\":1,\"skillName\":\"Skill\",\"skillLevel\":1}]}";
	
	@Before
	public void setup() {
		table.setAssociateId(1);
		table.setEmail("test@test.com");
		table.setLevel1(true);
		table.setLevel2(false);
		table.setLevel3(false);
		table.setMobile("12124584");
		table.setName("Name");
		table.setPic("PIC".getBytes());
		table.setRemark("Remark");
		table.setStatusBlue(false);
		table.setStatusGreen(true);
		table.setStatusRed(false);
		table.setStrength("strength");
		table.setWeakness("weakness");
		AssociateSkillsTable askillTable = new AssociateSkillsTable();
		SkillsTable skillTable = new SkillsTable();
		skillTable.setSkillId(1);
		skillTable.setSkillName("skillName");
		AssociateSkillId pk = new AssociateSkillId();
		pk.setAssociates(table);
		pk.setSkills(skillTable);
		askillTable.setPk(pk);
		Set<AssociateSkillsTable> skillSet = new HashSet<AssociateSkillsTable>();
		skillSet.add(askillTable);
		table.setAssociateSkills(skillSet);
		associateLists.add(table);
	}

	@Test
	public void testGetAllAssociates() {

		Mockito.when(repository.findAll()).thenReturn(associateLists);
		ResponseEntity<List<AssociateDetails>> getResponse=service.getAllAssociates();
		assertEquals(1, getResponse.getBody().size());
	}
	@Test
	public void testGetAllAssociatesBadInputScenario() {

		Mockito.when(repository.findAll()).thenReturn(null);
		ResponseEntity<List<AssociateDetails>> getResponse=service.getAllAssociates();
		assertEquals(HttpStatus.NO_CONTENT, getResponse.getStatusCode());
	}
	@Test
	public void testGetAllAssociatesExceptionScenario() {

		Mockito.when(repository.findAll()).thenThrow(NullPointerException.class);
		ResponseEntity<List<AssociateDetails>> getResponse=service.getAllAssociates();
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, getResponse.getStatusCode());
	}
	
	@Test
	public void testSaveAssociate() {
		Mockito.when(repository.save(Mockito.any(AssociateTable.class))).thenReturn(table);
		MockMultipartFile file = new MockMultipartFile("file", "filename.txt", "text/plain", "some image".getBytes());
		ResponseEntity<Response> response=service.saveAssociate(file, associateDetailString);
		assertEquals("Success",response.getBody().getMessage());
	}
	@Test
	public void testSaveAssociateBadRequest() {
		Mockito.when(repository.save(Mockito.any(AssociateTable.class))).thenReturn(table);
		MockMultipartFile file = new MockMultipartFile("file", "filename.txt", "text/plain", "some image".getBytes());
		ResponseEntity<Response> response=service.saveAssociate(file, "");
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
	@Test
	public void testSaveAssociateExceptiont() {
		Mockito.when(repository.save(Mockito.any(AssociateTable.class))).thenThrow(NullPointerException.class);
		MockMultipartFile file = new MockMultipartFile("file", "filename.txt", "text/plain", "some image".getBytes());
		ResponseEntity<Response> response=service.saveAssociate(file, associateDetailString);
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
	}
	@Test
	public void testGetAssociateById() {
		Mockito.when(repository.findById(Mockito.anyInt())).thenReturn(Optional.of(table));
		ResponseEntity<AssociateDetails> getResponse=service.getAssociateById("1");
		assertEquals(1, getResponse.getBody().getAssociateId());
	}
	
	@Test
	public void testGetAssociateByIdException() {
		Mockito.when(repository.findById(Mockito.anyInt())).thenReturn(null);
		ResponseEntity<AssociateDetails> getResponse=service.getAssociateById("1");
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, getResponse.getStatusCode());
	}
	@Test
	public void testDeleteAssociate() throws Exception {
		AssociateDetails associateDetails = new ObjectMapper().readValue(associateDetailString, AssociateDetails.class);
		Mockito.doNothing().when(repository).delete(Mockito.any(AssociateTable.class));
		ResponseEntity<Response> getResponse=service.deleteAssociate(associateDetails);
		assertEquals(HttpStatus.OK, getResponse.getStatusCode());
	}
	@Test
	public void testDeleteAssociateBadRequest() {
		Mockito.doNothing().when(repository).delete(Mockito.any(AssociateTable.class));
		ResponseEntity<Response> response=service.deleteAssociate(null);
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
	@Test
	public void testDeleteAssociateExceptiont()  throws Exception {
		AssociateDetails associateDetails = new ObjectMapper().readValue(associateDetailString, AssociateDetails.class);
		associateDetails.setPic(null);
		ResponseEntity<Response> response=service.deleteAssociate(associateDetails);
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
	}

}
