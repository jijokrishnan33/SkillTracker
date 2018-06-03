package com.cts.fsd.skilltracker.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.cts.fsd.skilltracker.model.AssociateDetails;
import com.cts.fsd.skilltracker.model.Response;

public interface AssociateService {

	ResponseEntity<List<AssociateDetails>> getAllAssociates();

	ResponseEntity<Response> saveAssociate(MultipartFile file, String associateDetails);

	ResponseEntity<AssociateDetails> getAssociateById(String id);

	ResponseEntity<Response> deleteAssociate(AssociateDetails associateDetails);

}
