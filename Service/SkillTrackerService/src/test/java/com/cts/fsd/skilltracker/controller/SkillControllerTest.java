package com.cts.fsd.skilltracker.controller;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.cts.fsd.skilltracker.model.Response;
import com.cts.fsd.skilltracker.model.Skill;
import com.cts.fsd.skilltracker.service.SkillService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@WebMvcTest(value = SkillController.class, secure = false)
public class SkillControllerTest {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private SkillService service;
	
	String skillString = "{\"skillId\":1,\"skillName\":\"Skill\",\"skillLevel\":1}";
	List<Skill> skillList = new ArrayList<Skill>();
	Response response = new Response("Success");
	
	@Test
	public void testGetAllSkills() throws Exception {
		Skill skill = new ObjectMapper().readValue(skillString, Skill.class);
		skillList.add(skill);

		Mockito.when(service.getAllSkills())
				.thenReturn(new ResponseEntity<List<Skill>>(skillList, HttpStatus.OK));

		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/skills/getall")
				.accept(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		JSONAssert.assertEquals("[" + skillString + "]", result.getResponse().getContentAsString(), false);
	}
	
	@Test
	public void testSaveskill() throws Exception {

		Mockito.when(service.saveSkill(Mockito.any(Skill.class)))
				.thenReturn(new ResponseEntity<Response>(response, HttpStatus.OK));

		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/skills/save").content(skillString)
				.contentType(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();

		JSONAssert.assertEquals("{\"message\":\"Success\"}", result.getResponse().getContentAsString(), false);
	}
	
	@Test
	public void testDeletekill() throws Exception {

		Mockito.when(service.deleteSkill(Mockito.any(Skill.class)))
				.thenReturn(new ResponseEntity<Response>(response, HttpStatus.OK));

		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/skills/delete").content(skillString)
				.contentType(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();

		JSONAssert.assertEquals("{\"message\":\"Success\"}", result.getResponse().getContentAsString(), false);
	}
	
}
