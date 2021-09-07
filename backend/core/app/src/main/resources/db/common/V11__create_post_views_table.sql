create table post_views (
    id uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted boolean not null default false,
    user_id text,
    user_ip text,
    post_id uuid not null,
    primary key (id)
);
