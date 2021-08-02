package com.mindbridge.data.domains.notification.model;

import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "notifications")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class Notification extends BaseAuditableEntity {

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "receiver_id")
	private User receiver;

	@Column(name = "source_id")
	private UUID sourceId;

	private String text;

	@Column(name = "is_read")
	private Boolean isRead;

	private String type;

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"Notification\", " +
			"\"text\":" + (text == null ? "null" : "\"" + text + "\"") + ", " +
			"\"type\":" + (type == null ? "null" : "\"" + type + "\"") + ", " +
			"\"receiver_id\":" + (receiver.getId() == null ? "null" : "\"" + receiver.getId() + "\"") + ", " +
			"\"source_id\":" + (sourceId == null ? "null" : "\"" + sourceId + "\"") + ", " +
			"\"isRead\":" + (isRead == null ? "null" : "\"" + isRead + "\"") + ", " +
			"}";
	}
}
