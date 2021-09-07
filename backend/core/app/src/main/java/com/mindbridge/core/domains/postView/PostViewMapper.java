package com.mindbridge.core.domains.postView;

import com.mindbridge.core.domains.postView.dto.PostViewDto;
import com.mindbridge.data.domains.postViews.model.PostView;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PostViewMapper {

	PostViewMapper MAPPER = Mappers.getMapper(PostViewMapper.class);

	@Mapping(source = "postId", target = "post.id")
	PostView postViewDtoToPostView(PostViewDto postViewDto);
}
