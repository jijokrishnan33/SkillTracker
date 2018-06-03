package com.cts.fsd.skilltracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.fsd.skilltracker.repository.entity.AssociateTable;

@Repository
public interface AssociateRepository extends JpaRepository<AssociateTable, Integer>{

}
