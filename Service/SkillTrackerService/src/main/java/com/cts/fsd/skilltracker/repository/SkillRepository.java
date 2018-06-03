package com.cts.fsd.skilltracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.fsd.skilltracker.repository.entity.SkillsTable;


@Repository
public interface SkillRepository extends JpaRepository<SkillsTable, Integer>{

	
}
