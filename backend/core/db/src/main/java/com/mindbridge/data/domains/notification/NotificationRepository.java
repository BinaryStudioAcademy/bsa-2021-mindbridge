package com.mindbridge.data.domains.notification;

import com.mindbridge.data.domains.notification.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface NotificationRepository
		extends JpaRepository<Notification, UUID>, JpaSpecificationExecutor<Notification> {

	@Query("SELECT count(n) FROM Notification n WHERE n.receiver.id = :id and n.isRead = false")
	long calcUnreadNotifications(@Param("id") UUID id);

	@Query("SELECT n FROM Notification n WHERE n.receiver.id = :id and n.isRead = false")
	List<Notification> getNotificationList(@Param("id") UUID id);
}
