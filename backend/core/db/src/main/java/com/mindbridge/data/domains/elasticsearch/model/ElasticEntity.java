package com.mindbridge.data.domains.elasticsearch.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setting(settingPath = "elasticsearch/es-config.json")
@Document(indexName = "mindbridge")
public class ElasticEntity {

	@Id
	private String id;

	@Field(type = FieldType.Text)
	private String createdAt;

	@Field(type = FieldType.Text)
	private String updatedAt;

	@MultiField(
			mainField = @Field(type = FieldType.Text, analyzer = "autocomplete_index",
					searchAnalyzer = "autocomplete_search"),
			otherFields = { @InnerField(suffix = "keyword", type = FieldType.Keyword) })
	private String author;

	@MultiField(
			mainField = @Field(type = FieldType.Text, analyzer = "autocomplete_index",
					searchAnalyzer = "autocomplete_search"),
			otherFields = { @InnerField(suffix = "keyword", type = FieldType.Keyword) })
	private String title;

	@Field(type = FieldType.Auto)
	private List<String> tags;

	@Field(type = FieldType.Auto)
	private UUID sourceId;

	@Field(type = FieldType.Object)
	private Object metadata;

}
