package com.mindbridge.core.domains.elasticsearch;

import com.mindbridge.core.domains.post.PostService;
import com.mindbridge.core.domains.post.dto.PostsListDetailsDto;
import com.mindbridge.data.domains.elasticsearch.ElasticRepository;
import com.mindbridge.data.domains.elasticsearch.model.EMapper;
import com.mindbridge.data.domains.elasticsearch.model.ElasticEntity;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.tag.TagRepository;
import com.mindbridge.data.model.BaseEntity;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static org.elasticsearch.index.query.QueryBuilders.matchQuery;

@Service
@Slf4j
public class ElasticService {

	@Autowired
	private ElasticRepository elasticRepository;

	@Autowired
	private ElasticsearchOperations elasticsearchTemplate;

	@Autowired
	private TagRepository tagRepository;

	@Autowired
	private ElasticService elasticService;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private PostService postService;

	public void update(BaseEntity data) {

		ElasticEntity entity = convertToEntity(data);

		ElasticEntity esEntityFromEs = elasticRepository.findBySourceId(data.getId()).orElseThrow();
		entity.setId(esEntityFromEs.getId());

		log.info("Updating for ES {}", data.getId());
		elasticRepository.save(entity);
	}

	public void put(BaseEntity data) {
		ElasticEntity entity = convertToEntity(data);
		log.info("Work: ", data.getId());
		elasticRepository.save(entity);
	}

	public List<ElasticEntity> findAll() {
		var response = new ArrayList<ElasticEntity>();
		elasticRepository.findAll().forEach(response::add);
		return response;
	}

	public List<ElasticEntity> search(String query) {
		String searchByTitle = "title";

		return getSearchResult(query, searchByTitle, 0, 10);
	}

	public List<PostsListDetailsDto> searchList(String query, String tags, Integer from, Integer count, Principal principal) {

		String searchByTitle = "title";
		String searchByTags = "tags";
		List<ElasticEntity> searchResult;

		searchResult = getSearchByTagsAndTitleResult(query, searchByTitle, tags, searchByTags, from, count);

		return postService
				.listIDsToListPosts(searchResult.stream().map(ElasticEntity::getSourceId).collect(Collectors.toList()), principal);
	}

	public List<ElasticEntity> searchByAuthor(String query) {
		String searchByAuthor = "author";

		return getSearchResult(query, searchByAuthor, 0, 10);
	}

	public List<ElasticEntity> searchByTags(String query) {
		String searchByTags = "tags";

		return getSearchResult(query, searchByTags, 0, 10);
	}

	private List<ElasticEntity> getSearchResult(String query, String searchBy, Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);

		NativeSearchQuery searchQuery = new NativeSearchQueryBuilder().withQuery(matchQuery(searchBy, query))
				.withPageable(pageable).build();

		SearchHits<ElasticEntity> entities = elasticsearchTemplate.search(searchQuery, ElasticEntity.class);

		List<ElasticEntity> result = entities.getSearchHits().stream().map(SearchHit::getContent).distinct()
				.collect(Collectors.toList());
		return result;
	}

	private List<ElasticEntity> getSearchByTagsAndTitleResult(String query1, String searchBy1,
															 String query2, String searchBy2,
															 Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);

		BoolQueryBuilder boolQuery = new BoolQueryBuilder();

		if (!Objects.equals(query1, "")) {
			boolQuery.must(QueryBuilders.matchQuery(searchBy1, query1));
		}
		if (!Objects.equals(query2, "")) {
			List<String> tagsList = List.of(query2.split(","));
			for (String entry : tagsList) {
				boolQuery.must(QueryBuilders.matchQuery(searchBy2, entry));
			}
		}

		NativeSearchQuery searchQuery = new NativeSearchQueryBuilder().withQuery(boolQuery)
			.withPageable(pageable).build();

		SearchHits<ElasticEntity> entities = elasticsearchTemplate.search(searchQuery, ElasticEntity.class);

		List<ElasticEntity> result = entities.getSearchHits().stream().map(SearchHit::getContent).distinct()
			.collect(Collectors.toList());
		return result;
	}

	public long getCountOfResults(String query, String tags) {
		BoolQueryBuilder boolQuery = new BoolQueryBuilder();

		if (!Objects.equals(query, "")) {
			boolQuery.must(QueryBuilders.matchQuery("title", query));
		}
		if (!Objects.equals(tags, "")) {
			List<String> tagsList = List.of(tags.split(","));
			for (String entry : tagsList) {
				boolQuery.must(QueryBuilders.matchQuery("tags", entry));
			}
		}

		NativeSearchQuery searchQuery = new NativeSearchQueryBuilder().withQuery(boolQuery).build();
		return elasticsearchTemplate.count(searchQuery, ElasticEntity.class);

	}

	private ElasticEntity convertToEntity(BaseEntity data) {
		ElasticEntity entity;

		Post post = (Post) data;
		List<String> tags = tagRepository.getTagById(post.getId());
		for (String x : tags) {
			log.info("tags: " + x + " Post ID: " + post.getId().toString());
		}
		entity = EMapper.eEntityFromPostEntity(post, tags);
		return entity;
	}

	public long deleteAll() {
		return elasticRepository.deleteAllBy();
	}

	public void add() {
		List<Post> posts = postRepository.findAll();
		List<ElasticEntity> entities = elasticService.findAll();
		List<ElasticEntity> esPost = new ArrayList<>(entities);
		sync(posts, esPost);
	}

	private void sync(List<? extends BaseEntity> dbEntities, List<ElasticEntity> esEntities) {
		log.info("Elasticsearch syncing...");
		for (BaseEntity dbEntity : dbEntities) {
			boolean savedBefore = false;
			for (ElasticEntity esEntity : esEntities) {
				if (dbEntity.getId().equals(esEntity.getSourceId())) {
					savedBefore = true;
					if (!dbEntity.getUpdatedAt().toString().equals(esEntity.getUpdatedAt())) {
						elasticService.update(dbEntity);
					}
					else {
						log.info("Up to date");
					}
				}
			}
			if (!savedBefore) {
				log.info("New entity");
				elasticService.put(dbEntity);
			}
		}
	}

}
