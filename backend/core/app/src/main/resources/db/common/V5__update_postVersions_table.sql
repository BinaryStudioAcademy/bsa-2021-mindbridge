create table post_version2tag (
    post_version_id uuid not null,
    tag_id uuid not null,
    primary key (post_version_id, tag_id)
);

ALTER TABLE post_versions
    ADD cover_image text;

ALTER TABLE post_versions
    ADD draft boolean;

ALTER TABLE post_versions
    ADD markdown boolean not null default false;
