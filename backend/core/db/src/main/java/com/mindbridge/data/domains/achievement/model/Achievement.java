package com.mindbridge.data.domains.achievement.model;

import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "achievements")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class Achievement extends BaseAuditableEntity {

	private String text;

	private String title;

	private String type;

	private Integer level;

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"Achievement\", " +
			"\"text\":" + (text == null ? "null" : "\"" + text + "\"") + ", " +
			"\"title\":" + (title == null ? "null" : "\"" + title + "\"") + ", " +
			"\"type\":" + (type == null ? "null" : "\"" + type + "\"") + ", " +
			"\"level\":" + (level == null ? "null" : "\"" + level + "\"") + ", " +
			"}";
	}
}
