ALTER TABLE post_versions
    ADD author_id uuid;

alter table if exists post_versions
    add constraint fk_post_versions2users foreign key (author_id) references users;
