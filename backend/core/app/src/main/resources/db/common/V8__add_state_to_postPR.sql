ALTER TABLE post_pr
ADD state VARCHAR default 'closed';

ALTER TABLE post_pr
DROP COLUMN closed;
