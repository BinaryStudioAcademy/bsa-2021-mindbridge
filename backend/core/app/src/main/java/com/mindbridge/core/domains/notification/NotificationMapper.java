package com.mindbridge.core.domains.notification;

import com.mindbridge.core.domains.notification.dto.NotificationDto;
import com.mindbridge.data.domains.notification.model.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NotificationMapper {

	NotificationMapper MAPPER = Mappers.getMapper(NotificationMapper.class);

	public abstract NotificationDto notificationToNotificationDto(Notification notification);

}
