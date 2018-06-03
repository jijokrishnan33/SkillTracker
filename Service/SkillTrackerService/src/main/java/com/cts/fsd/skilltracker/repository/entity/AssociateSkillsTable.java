package com.cts.fsd.skilltracker.repository.entity;

import java.io.Serializable;

import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;

@Entity
@AssociationOverrides({ @AssociationOverride(name = "pk.associates", joinColumns = @JoinColumn(name = "associateId")),
		@AssociationOverride(name = "pk.skills", joinColumns = @JoinColumn(name = "skillId")) })
public class AssociateSkillsTable implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private AssociateSkillId pk = new AssociateSkillId();

	private int skillLevel;

	public AssociateSkillId getPk() {
		return pk;
	}

	public void setPk(AssociateSkillId pk) {
		this.pk = pk;
	}

	public int getSkillLevel() {
		return skillLevel;
	}

	public void setSkillLevel(int skillLevel) {
		this.skillLevel = skillLevel;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public AssociateTable getAssociates() {
		return getPk().getAssociates();
	}

	public void setAssociates(AssociateTable associates) {
		getPk().setAssociates(associates);
	}

	public SkillsTable getSkills() {
		return getPk().getSkills();
	}

	public void setSkills(SkillsTable skills) {
		getPk().setSkills(skills);
	}

}
