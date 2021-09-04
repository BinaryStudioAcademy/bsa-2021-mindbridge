ALTER TABLE users
	ADD is_viewed boolean not null default false;
ALTER TABLE users
	ADD activation_code text;
