package com.mindbridge.data.domains.notification;

import com.mindbridge.data.domains.notification.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface NotificationRepository
		extends JpaRepository<Notification, UUID>, JpaSpecificationExecutor<Notification> {

	@Query("SELECT count(n) FROM Notification n WHERE n.receiver.id = :id and n.isRead = false")
	long calcUnreadNotifications(@Param("id") UUID id);

	@Query("SELECT n FROM Notification n WHERE n.receiver.id = :id and n.isRead = false and n.deleted = false order by n.createdAt desc")
	List<Notification> getUnreadNotificationList(@Param("id") UUID id);

	@Query("SELECT n FROM Notification n WHERE n.receiver.id = :id and n.deleted = false order by n.createdAt desc")
	List<Notification> getNotificationList(@Param("id") UUID id);

	@Transactional
	@Modifying
	@Query("update Notification n set n.isRead = true where n.receiver.id = :userId")
	void readAll(UUID userId);

	@Transactional
	@Modifying
	@Query("update Notification n set n.isRead = CASE n.isRead when true then false else true end where n.id = :id ")
	void toggleNotificationRead(@Param("id") UUID id);

}
