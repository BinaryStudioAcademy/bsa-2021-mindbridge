ALTER TABLE posts
ADD cover_image text;

ALTER TABLE posts
ADD markdown boolean not null default false;
