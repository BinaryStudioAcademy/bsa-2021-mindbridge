create table users (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    nickname text,
    email text not null,
    password text,
    first_name text,
    last_name text,
    avatar text,
    verified_email boolean default false,
    primary key (id)
);

create table posts (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    author_id uuid not null,
    title text,
    text text,
    draft boolean,
    primary key (id)
);

create table comments (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    author_id uuid not null,
    post_id uuid not null,
    comment_id uuid,
    text text,
    primary key (id)
);

create table tags (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    name text,
    primary key (id)
);

create table post2tag (
    post_id uuid not null,
    tag_id uuid not null,
    primary key (post_id, tag_id)
);

create table post_reactions (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    author_id uuid not null,
    post_id uuid not null,
    liked boolean,
    primary key (id)
);

create table comment_reactions (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    author_id uuid not null,
    comment_id uuid not null,
    liked boolean,
    primary key (id)
);

create table post_versions (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    post_id uuid not null,
    title text,
    text text,
    primary key (id)
);

create table post_pr (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    contributor_id uuid not null,
    post_id uuid not null,
    text text,
    closed boolean,
    primary key (id)
);

create table achievements (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    text text,
    title text,
    type text,
    level integer,
    primary key (id)
);

create table favorites (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    user_id uuid not null,
    post_id uuid not null,
    primary key (id)
);

create table followers (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    followed_id uuid not null,
    follower_id uuid not null,
    primary key (id)
);

create table highlights (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    user_id uuid not null,
    post_id uuid not null,
    text text,
    primary key (id)
);

create table notifications (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    receiver_id uuid not null,
    source_id uuid,
    text text,
    is_read boolean,
    type text,
    primary key (id)
);

create table pr_comments (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    author_id uuid not null,
    pr_id uuid not null,
    comment_id uuid,
    text text,
    primary key (id)
);

create table users_achievements (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    user_id uuid not null,
    achievement_id uuid not null,
    primary key (id)
);

alter table if exists posts
    add constraint fk_posts2users foreign key (author_id) references users;


alter table if exists comments
    add constraint fk_comments2users foreign key (author_id) references users;

alter table if exists comments
    add constraint fk_comments2posts foreign key (post_id) references posts;

alter table if exists comments
    add constraint fk_comments2comments foreign key (comment_id) references comments;


alter table if exists post_reactions
    add constraint fk_post_reactions2users foreign key (author_id) references users;

alter table if exists post_reactions
    add constraint fk_post_reactions2posts foreign key (post_id) references posts;

alter table if exists comment_reactions
    add constraint fk_comment_reactions2users foreign key (author_id) references users;

alter table if exists comment_reactions
    add constraint fk_comment_reactions2posts foreign key (comment_id) references comments;


alter table if exists post_versions
    add constraint fk_post_versions2posts foreign key (post_id) references posts;


alter table if exists post_pr
    add constraint fk_post_pr2posts foreign key (post_id) references posts;

alter table if exists post_pr
    add constraint fk_post_pr2users foreign key (contributor_id) references users;


alter table if exists post2tag
    add constraint fk_post2tag2tags foreign key (tag_id) references tags;

alter table if exists post2tag
    add constraint fk_post2tag2posts foreign key (post_id) references posts;


alter table if exists favorites
    add constraint fk_favorites2posts foreign key (post_id) references posts;

alter table if exists favorites
    add constraint fk_favorites2users foreign key (user_id) references users;


alter table if exists followers
    add constraint fk_followers2usersFollowed foreign key (followed_id) references users;

alter table if exists followers
    add constraint fk_followers2usersFollower foreign key (follower_id) references users;


alter table if exists highlights
    add constraint fk_highlights2posts foreign key (post_id) references posts;

alter table if exists highlights
    add constraint fk_highlights2users foreign key (user_id) references users;


alter table if exists notifications
    add constraint fk_notifications2users foreign key (receiver_id) references users;


alter table if exists pr_comments
    add constraint fk_comments2users foreign key (author_id) references users;

alter table if exists pr_comments
    add constraint fk_comments2postpr foreign key (pr_id) references post_pr;

alter table if exists pr_comments
    add constraint fk_comments2comments foreign key (comment_id) references comments;


alter table if exists users_achievements
    add constraint fk_users_achievements2users foreign key (user_id) references users;

alter table if exists users_achievements
    add constraint fk_users_achievements2achievements foreign key (achievement_id) references achievements;
