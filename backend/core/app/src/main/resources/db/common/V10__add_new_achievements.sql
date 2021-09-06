insert into achievements
(id, title, text, level, type)
values
('31ed1a82-4758-4c3c-a053-55c541f54cb3', 'I know the alphabet', 'Wrote a post', 1, 'Write'),
('4650f4bc-27f7-4499-8b3c-b02fc4546c49', 'Young writer', 'Wrote 10 posts', 2, 'Write'),
('58199fcf-0dd5-42af-873b-27f5b56b34c3', 'Great writer', 'Wrote 100 posts', 4, 'Write'),
('fa66480a-1409-4c1b-bbf7-0c8581131cea', 'I know better!', 'Made 5 contributions', 1, 'Contributor'),
('ac1d9b68-e5cb-496f-b2f7-26608479fd46', 'I want to help everyone', 'Made 10 contributions', 2, 'Contributor'),
('236a6d66-6c5a-442f-91be-20a21863dfbc', 'Great contributor', 'Made 50 contributions', 3, 'Contributor'),
('e2a80576-0d66-4587-8c0d-f012e9a97c21', 'What would you had done without me?', 'Made 100 contributions', 4, 'Contributor'),
('8055d036-d9d7-47fb-ac6e-afb44bdd7dd4', 'Somebody likes it', 'Have a post or a comment with a rating of 1000 or higher', 1, 'Awesome'),
('e43f32b7-53c5-49f5-a802-def005442e91', 'Going to be a star', 'Have 5 posts or comments with a rating of 1000 or higher', 2, 'Awesome'),
('38a2aa80-78ac-49fe-af03-750c956adcec', 'Awesome', 'Have 10 posts or comments with a rating of 1000 or higher', 3, 'Awesome'),
('27d27383-230a-427f-be68-2895cedb34b8', 'Best of the best', 'Have 100 posts or comments with a rating of 1000 or higher', 4, 'Awesome'),
('4e437ece-cf9c-4c10-94fb-78437f1601f4', 'Not alone', 'Have one subscriber', 1, 'Subscribers'),
('8e1ee7fa-6cec-42d5-a976-84a3cfb402fc', 'We are a gang!', 'More than 50 subscribers', 2, 'Subscribers'),
('adb7a48d-684e-4bb2-a0a5-d6bfd7f7a975', 'Popular', 'More than 100 subscribers', 3, 'Subscribers'),
('cc5b1825-248a-4b43-b722-47dc2ec78857', 'Celebrity', 'More than 500 subscribers', 4, 'Subscribers'),
('3f0fad64-dd39-45ce-98b5-2f798497859a', 'I have an opinion', 'Wrote 10 comments', 1, 'Comments'),
('20cb04da-afc2-4c6a-8395-a4ccc2c4080f', 'Casual commenter', 'Write 50 comments', 2, 'Comments'),
('8abf84b6-2742-43fc-9c90-6aa7e98425bc', 'God of comments', 'Write 500 comments', 4, 'Comments');

UPDATE achievements SET title = 'Teen' WHERE title = 'Boy';
UPDATE achievements SET title = 'Adult' WHERE title = 'Man';
UPDATE achievements SET text = 'Wrote 50 posts' WHERE text = 'Write 50 posts';
UPDATE achievements SET type = 'Comments' WHERE id = '80bf1604-f394-42ca-af1d-2ab8dc551c45';


