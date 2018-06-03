package com.cts.fsd.skilltracker.repository.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@Embeddable
public class AssociateSkillId implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@ManyToOne(fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	private AssociateTable associates;
	
	@ManyToOne(fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	private SkillsTable skills;

	public AssociateTable getAssociates() {
		return associates;
	}

	public void setAssociates(AssociateTable associates) {
		this.associates = associates;
	}

	public SkillsTable getSkills() {
		return skills;
	}

	public void setSkills(SkillsTable skills) {
		this.skills = skills;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
