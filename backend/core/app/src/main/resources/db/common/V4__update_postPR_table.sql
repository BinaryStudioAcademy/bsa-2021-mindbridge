create table post_pr2tag (
    post_pr_id uuid not null,
    tag_id uuid not null,
    primary key (post_pr_id, tag_id)
);

ALTER TABLE post_pr
    ADD cover_image text;

ALTER TABLE post_pr
    ADD title text;

ALTER TABLE post_pr
    ADD markdown boolean not null default false;
