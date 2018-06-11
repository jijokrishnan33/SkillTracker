package com.cts.fsd.skilltracker.repository.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;

@Entity
public class AssociateTable implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	private int associateId;

	private String name;

	private String email;

	private String mobile;
	
	private String gender;

	@Lob
	private byte[] pic;

	private boolean statusGreen;

	private boolean statusBlue;

	private boolean statusRed;

	@Column(name = "Level_1")
	private boolean level1;

	@Column(name = "Level_2")
	private boolean level2;

	@Column(name = "Level_3")
	private boolean level3;

	private String remark;

	private String strength;

	private String weakness;
	
	private int spokenLevel;
	
	private int communicactionLevel;
	
	private int logicLevel;
	
	private int aptitudeLevel;
	
	private int confidenceLevel;
	
	@OneToMany(cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="pk.associates",orphanRemoval=true)
	private Set<AssociateSkillsTable> associateSkills= new HashSet<AssociateSkillsTable>(0);

	public int getAssociateId() {
		return associateId;
	}

	public void setAssociateId(int associateID) {
		this.associateId = associateID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public byte[] getPic() {
		return pic;
	}

	public void setPic(byte[] pic) {
		this.pic = pic;
	}

	public boolean isStatusGreen() {
		return statusGreen;
	}

	public void setStatusGreen(boolean statusGreen) {
		this.statusGreen = statusGreen;
	}

	public boolean isStatusBlue() {
		return statusBlue;
	}

	public void setStatusBlue(boolean statusBlue) {
		this.statusBlue = statusBlue;
	}

	public boolean isStatusRed() {
		return statusRed;
	}

	public void setStatusRed(boolean statusRed) {
		this.statusRed = statusRed;
	}

	public boolean isLevel1() {
		return level1;
	}

	public void setLevel1(boolean level1) {
		this.level1 = level1;
	}

	public boolean isLevel2() {
		return level2;
	}

	public void setLevel2(boolean level2) {
		this.level2 = level2;
	}

	public boolean isLevel3() {
		return level3;
	}

	public void setLevel3(boolean level3) {
		this.level3 = level3;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getStrength() {
		return strength;
	}

	public void setStrength(String strength) {
		this.strength = strength;
	}

	public String getWeakness() {
		return weakness;
	}

	public void setWeakness(String weakness) {
		this.weakness = weakness;
	}

	public Set<AssociateSkillsTable> getAssociateSkills() {
		return associateSkills;
	}

	public void setAssociateSkills(Set<AssociateSkillsTable> associateSkills) {
		this.associateSkills = associateSkills;
	}

	public int getSpokenLevel() {
		return spokenLevel;
	}

	public void setSpokenLevel(int spokenLevel) {
		this.spokenLevel = spokenLevel;
	}

	public int getCommunicactionLevel() {
		return communicactionLevel;
	}

	public void setCommunicactionLevel(int communicactionLevel) {
		this.communicactionLevel = communicactionLevel;
	}

	public int getLogicLevel() {
		return logicLevel;
	}

	public void setLogicLevel(int logicLevel) {
		this.logicLevel = logicLevel;
	}

	public int getAptitudeLevel() {
		return aptitudeLevel;
	}

	public void setAptitudeLevel(int aptitudeLevel) {
		this.aptitudeLevel = aptitudeLevel;
	}

	public int getConfidenceLevel() {
		return confidenceLevel;
	}

	public void setConfidenceLevel(int confidenceLevel) {
		this.confidenceLevel = confidenceLevel;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
