package com.mindbridge.data.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.util.Date;

@Data
@MappedSuperclass
@EqualsAndHashCode(callSuper = true)
public abstract class BaseAuditableEntity extends BaseEntity {

	@Column(name = "created_at", nullable = false)
	@CreationTimestamp
	private Date createdAt;

	@Column(name = "updated_at", nullable = false)
	@UpdateTimestamp
	private Date updatedAt;
}
