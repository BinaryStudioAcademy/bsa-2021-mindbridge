package com.mindbridge.core.domains.notification;

import com.mindbridge.core.domains.notification.dto.CreateNotificationDto;
import com.mindbridge.core.domains.notification.dto.NotificationDto;
import com.mindbridge.data.domains.notification.model.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NotificationMapper {

	NotificationMapper MAPPER = Mappers.getMapper(NotificationMapper.class);

	NotificationDto notificationToNotificationDto(Notification notification);

	@Mapping(source = "receiverId", target = "receiver.id")
	Notification createDtoToNotification(CreateNotificationDto createNotificationDto);
}
