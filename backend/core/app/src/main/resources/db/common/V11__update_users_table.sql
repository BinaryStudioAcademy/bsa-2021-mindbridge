ALTER TABLE users
	ADD is_viewed boolean default false;
ALTER TABLE users
	ADD activation_code text;
