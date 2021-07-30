insert into users
(id, first_name, last_name, email, password, avatar, verified_email)
values
('db127d6b-f2f3-4115-b20a-5b5f67c384aa', 'Anayah', 'Lawson', 'lawson@gmail.com', 'anayahLawson1999', null, true),
('a9212bcd-9410-4f2c-a51e-cad095d6982b', 'Asa', 'Yu', 'avleen@gmail.com', 'allmanleen', null, true),
('e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', 'Lilli', 'Guerra', 'lillirra@gmail.com', 'guelli', null, true),
('8a29bd6d-9c90-44e5-87ea-493618aa1f6b', 'Arwa', 'Bain', 'barwa@gmail.com', 'niabawra', null, true),
('b9eb8231-5422-4d6f-906b-eeb55da1edd1', 'Kali', 'Chan', 'channi@gmail.com', 'kanChankali', null, true),
('1934406d-e088-4a28-8c44-ccfdd5125b90', 'Admin', 'Admin', 'admin@gmail.com', 'admin12345', null, true);

insert into posts
(id, author_id, draft, title, text)
values
('95a46088-b143-483d-a86c-3d6be6fd2e6d', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', false, 'JavaScript is our future', 'A new way to develop from Google'),
('ccb9f16b-e852-4ffb-b5e4-87247d978fd9', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', false, 'Top most popular programming languages', 'The first place is JS, the second is Java, the third .NET'),
('e2eceb99-7388-47bb-9f14-339f3392efbd', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', false, 'Most popular bugs in .NET', '1) Exeptions \n2) Mistakes \n 3) Bad code'),
('e1ad9dc5-a631-485b-a68f-9c4106558b9f', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', false, 'Cur historia mori?', 'Teleporters view from ellipses like final crews.'),
('0bee5886-cf57-4d9f-b8b2-f3dec68cecdc', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', false, 'Oh, scurvy treasure!', 'Confucius says: purpose and om.'),
('6dd35066-4b3b-4321-a576-dd249c45603d', '1934406d-e088-4a28-8c44-ccfdd5125b90', false, 'Crewmates walk with courage!', 'After cooking the garlics, rub broccoli, chicken lard and peppermint tea with it in a wok.'),
('12c94050-70a2-432d-a5ca-efb870be34a2', '1934406d-e088-4a28-8c44-ccfdd5125b90', false, 'Bromium regius triticum est.', 'The machine is more particle now than teleporter. calm and always unrelated.');

insert into tags
(id, name)
values
('b280ecd5-243f-4b55-ba4e-4777ef49453b', 'Java'),
('a099b732-23ba-49aa-9b94-a9541b1c18b7', 'JavaScript'),
('b6c3b74f-b7e6-4718-92fc-e9491ee51d0b', '.NET'),
('6b1a086a-6fc9-426e-9514-ac67d508fb7c', 'Science');

insert into post2tag
(post_id, tag_id)
values
('95a46088-b143-483d-a86c-3d6be6fd2e6d', 'a099b732-23ba-49aa-9b94-a9541b1c18b7'),
('ccb9f16b-e852-4ffb-b5e4-87247d978fd9', 'b280ecd5-243f-4b55-ba4e-4777ef49453b'),
('ccb9f16b-e852-4ffb-b5e4-87247d978fd9', 'a099b732-23ba-49aa-9b94-a9541b1c18b7'),
('ccb9f16b-e852-4ffb-b5e4-87247d978fd9', 'b6c3b74f-b7e6-4718-92fc-e9491ee51d0b'),
('e2eceb99-7388-47bb-9f14-339f3392efbd', 'b6c3b74f-b7e6-4718-92fc-e9491ee51d0b'),
('12c94050-70a2-432d-a5ca-efb870be34a2', '6b1a086a-6fc9-426e-9514-ac67d508fb7c'),
('e1ad9dc5-a631-485b-a68f-9c4106558b9f', '6b1a086a-6fc9-426e-9514-ac67d508fb7c');

insert into comments
(id, author_id, post_id, comment_id, text)
values
('953f401c-7ba7-4523-805e-6fee70e2cb14', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', '95a46088-b143-483d-a86c-3d6be6fd2e6d', null, 'I totally agree! Lovely post'),
('5d538bc8-0644-42de-b1eb-d8afaf47871e', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9', null, 'Expected. No wonder'),
('6ec4bcdc-7121-4dcf-b186-616cbb5c488c', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', 'e2eceb99-7388-47bb-9f14-339f3392efbd', null, 'I had all these mistakes XD'),
('2591bf93-d4e4-4fce-95b6-c730c7ef5fdd', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9', '953f401c-7ba7-4523-805e-6fee70e2cb14', 'I think it''s too early to say that'),
('99abe5fc-8a24-4d2e-91b7-af68cb67fb5e', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', '95a46088-b143-483d-a86c-3d6be6fd2e6d', '2591bf93-d4e4-4fce-95b6-c730c7ef5fdd', 'I don’t know, but it’s very interesting.'),
('cb621b68-e648-4bdb-9a06-a6395a1ca22d', '1934406d-e088-4a28-8c44-ccfdd5125b90', '12c94050-70a2-432d-a5ca-efb870be34a2', null, 'Ho-ho-ho! strength of fortune.'),
('f6fe32fa-72a4-4ec1-8626-d57c9a22956c', '1934406d-e088-4a28-8c44-ccfdd5125b90', '12c94050-70a2-432d-a5ca-efb870be34a2', 'cb621b68-e648-4bdb-9a06-a6395a1ca22d', 'All great gurus hurt each other, only outer creators have a volume.');

insert into post_reactions
(id, author_id, liked, post_id)
values
('d393d58e-3940-42fb-bd9e-8a3f2161fe2e', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', true, 'e2eceb99-7388-47bb-9f14-339f3392efbd'),
('7d9df9e7-845c-470c-b481-5b08bddaeae3', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', false, 'e2eceb99-7388-47bb-9f14-339f3392efbd'),
('754375e4-0acc-49f3-922e-db29837d7f82', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', false, '95a46088-b143-483d-a86c-3d6be6fd2e6d'),
('df14aac7-861e-42e0-a6ed-49b9713d4d11', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', true, '95a46088-b143-483d-a86c-3d6be6fd2e6d'),
('5422df61-f6dc-496d-a9bf-5c7352275d24', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', true, '95a46088-b143-483d-a86c-3d6be6fd2e6d'),
('263172fa-81d3-4c67-ad63-89d3596ba42f', '1934406d-e088-4a28-8c44-ccfdd5125b90', true, '12c94050-70a2-432d-a5ca-efb870be34a2'),
('a614745f-2fdc-4e87-afce-369133d3ab2d', '1934406d-e088-4a28-8c44-ccfdd5125b90', true, '6dd35066-4b3b-4321-a576-dd249c45603d');

insert into comment_reactions
(id, author_id, liked, comment_id)
values
('bfed9e9e-34c1-436a-9e7e-1a1dfc6d87b7', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', false, '2591bf93-d4e4-4fce-95b6-c730c7ef5fdd'),
('b179cb7d-0c99-4a27-92b3-069bf6cd3036', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', true, '5d538bc8-0644-42de-b1eb-d8afaf47871e'),
('f06a9e20-9328-48f1-bc50-502edc951bba', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', false, '953f401c-7ba7-4523-805e-6fee70e2cb14'),
('6942b4e2-275a-470a-ba13-47c56b8bebab', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', true, '953f401c-7ba7-4523-805e-6fee70e2cb14'),
('b204debc-4773-443c-a352-5a1eb97eb8ec', '1934406d-e088-4a28-8c44-ccfdd5125b90', true, 'f6fe32fa-72a4-4ec1-8626-d57c9a22956c');

insert into post_versions
(id, post_id, title, text)
values
('57de387c-d076-422a-9c6c-361f38681fcd', 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9', 'Top most popular programming languages', 'The first place is JavaScript, the second is Java, the third .NET'),
('1371bb37-d3c5-4a3b-9d06-184479900392', '95a46088-b143-483d-a86c-3d6be6fd2e6d', 'JavaScript is OUR future', 'A new way to develop from Google'),
('232a0ec6-266d-4403-8eba-10309858e574', '6dd35066-4b3b-4321-a576-dd249c45603d', 'Crewmates walk with courage!', 'What’s the secret to crushed and hardened okra? Always use muddy brine.');

insert into post_pr
(id, contributor_id, post_id, closed, text)
values
('99a568b0-ac71-458c-8e5e-b94902947b88', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9', false, 'The first place is JavaScript, the second is Java, the third .NET'),
('b73234a4-7bb8-471b-9a2e-cfc29c490e24', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', 'e2eceb99-7388-47bb-9f14-339f3392efbd', false, '1) Exceptions \n2) Mistakes \n 3) Bad code'),
('d3e17128-1480-42c7-b4c3-94f6d46db179', '1934406d-e088-4a28-8c44-ccfdd5125b90', '95a46088-b143-483d-a86c-3d6be6fd2e6d', false, 'Paralysis at the alpha quadrant was the core of mind, accelerated to a fantastic sonic shower.');

insert into achievements
(id, title, text, level, type)
values
('1d1a158f-bda4-4083-a38f-22265d35abe5', 'Kid', 'Be on the project for 1 year', 1, 'Time'),
('36bfa8b9-a1ba-430b-9f4b-5ceaebc4d878', 'Boy', 'Be on the project for 2 year', 2, 'Time'),
('ab1f68c2-186a-4b37-bbc2-ebb1670605a6', 'Man', 'Be on the project for 3 year', 3, 'Time'),
('8b6c07b0-fc5d-4914-a584-6738d5bcf963', 'Old', 'Be on the project for 5 year', 4, 'Time'),
('206a26d4-14ae-45d3-baa4-dc21de2d9c80', 'Writer', 'Write 50 posts', 3, 'Write'),
('80bf1604-f394-42ca-af1d-2ab8dc551c45', 'Talkative', 'Write 100 comments', 3, 'Write');

insert into favorites
(id, user_id, post_id)
values
('54fdfaf8-7ec8-476a-9124-8cfccf7d3260', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9'),
('47ac3b41-df0a-4403-a281-3f0a7443efce', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', 'e2eceb99-7388-47bb-9f14-339f3392efbd'),
('c6f26b8e-fd6d-4e82-a620-916d0edbd376', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', 'e1ad9dc5-a631-485b-a68f-9c4106558b9f'),
('e13f43c9-edab-44d5-94a2-4451bab7c0ac', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', '0bee5886-cf57-4d9f-b8b2-f3dec68cecdc'),
('81dafdf8-d16a-4080-a088-daa72e96ba1e', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', '6dd35066-4b3b-4321-a576-dd249c45603d'),
('141ccea8-d3ed-4cef-8099-5499927cb61a', '1934406d-e088-4a28-8c44-ccfdd5125b90', '6dd35066-4b3b-4321-a576-dd249c45603d');

insert into followers
(id, follower_id, followed_id)
values
('d5c4c669-3fb4-4524-aacb-1afeedf344af', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa'),
('f734237f-4313-440c-b4b6-a859d92428e3', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164'),
('dc957096-063b-4372-af47-af0c6c26dd5a', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1'),
('69b638e4-559c-4c27-8f97-dabc10bbe8d8', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b'),
('89bf6aef-64a1-48bb-af1e-5956d859d04f', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa'),
('a7734beb-d026-49c7-8d56-887bff4095f8', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', '1934406d-e088-4a28-8c44-ccfdd5125b90'),
('4d83d1ec-6b7b-4b83-ac4a-75cc6fe682be', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164'),
('e67113d2-b165-4904-88bc-3a58ea19ff2d', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', '1934406d-e088-4a28-8c44-ccfdd5125b90');

insert into highlights
(id, user_id, post_id, text)
values
('aa7d54b8-3b5a-4cf2-80da-2a38f7baa115', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', '6dd35066-4b3b-4321-a576-dd249c45603d' ,'rub broccoli'),
('7f30d383-6b8d-4cbf-94e2-73efdb795b10', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', 'e2eceb99-7388-47bb-9f14-339f3392efbd' ,'1) Exeptions'),
('234e7f12-5796-4132-8055-367ff04a0622', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', '0bee5886-cf57-4d9f-b8b2-f3dec68cecdc' ,'Confucius says: purpose and om.'),
('f54c9bd1-3667-4a0c-8ea9-3c767d416303', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', '6dd35066-4b3b-4321-a576-dd249c45603d' ,'chicken lard and peppermint tea with it in a wok.'),
('dfe4e5ee-a475-4d26-9e7a-d862991c4ff5', '1934406d-e088-4a28-8c44-ccfdd5125b90', '12c94050-70a2-432d-a5ca-efb870be34a2', 'The machine is more particle'),
('953b990f-a828-40cd-81a8-6713a5a4dea4', '1934406d-e088-4a28-8c44-ccfdd5125b90', '6dd35066-4b3b-4321-a576-dd249c45603d', 'tea with it in a wok');

insert into notifications
(id, receiver_id, source_id, text, is_read, type)
values
('a36acb71-850a-47ab-b60e-1c2311603f7a', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', 'Congratulations on your registration', true, 'New follower'),
('c7cec6ad-6b04-4beb-ba92-33d354bb2c5c', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', 'Your post has been published', true, 'New follower'),
('d14a0c7b-5e91-4e3b-980e-4043f5a0daa8', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', 'ccb9f16b-e852-4ffb-b5e4-87247d978fd9', 'Congratulations on your registration', true, 'New post'),
('7e5616f3-8b8b-4c41-9fcc-672cd98a70e0', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', '95a46088-b143-483d-a86c-3d6be6fd2e6d', 'Congratulations on your registration', true, 'New post'),
('b00c8e87-702d-40b4-943d-4124b0f821c5', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', 'You have new follower', false, 'New follower'),
('0ea40bb8-054b-4b63-91a6-8acccf835eb4', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', 'You have new follower', false, 'New follower'),
('b4309d34-84ea-42c5-a3a6-fc7468208a4f', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'e2eceb99-7388-47bb-9f14-339f3392efbd', 'New post published', false, 'New post'),
('10c9058a-c93a-4254-91ce-6558e786c6d1', '1934406d-e088-4a28-8c44-ccfdd5125b90', '95a46088-b143-483d-a86c-3d6be6fd2e6d', 'New post published', false, 'New post');

insert into pr_comments
(id, author_id, pr_id, comment_id, text)
values
('e22b79f8-a831-426b-aeeb-7145a0aec0ae', 'a9212bcd-9410-4f2c-a51e-cad095d6982b', '99a568b0-ac71-458c-8e5e-b94902947b88', null, 'Urgent need to accept'),
('6b2cb140-fd98-4c4f-8ccb-9692ca5b1b2c', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', 'b73234a4-7bb8-471b-9a2e-cfc29c490e24', null, 'And what are the changes?'),
('51c618ce-702e-46db-9b08-42bba3564842', '8a29bd6d-9c90-44e5-87ea-493618aa1f6b', '99a568b0-ac71-458c-8e5e-b94902947b88', null, 'Good change'),
('f428e458-2a2a-40be-a568-a7371ed6b493', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'b73234a4-7bb8-471b-9a2e-cfc29c490e24', null, 'Mmm... Seems good :)'),
('ef5901fa-0d79-483c-ae8f-25fe491cb951', '1934406d-e088-4a28-8c44-ccfdd5125b90', '99a568b0-ac71-458c-8e5e-b94902947b88', null, 'A great man wrote it');

insert into users_achievements
(id, user_id, achievement_id)
values
('45d6f180-2ddd-4a67-95ea-0fa5d5f094fb', 'db127d6b-f2f3-4115-b20a-5b5f67c384aa', '1d1a158f-bda4-4083-a38f-22265d35abe5'),
('dac52716-ec2d-4435-912c-de0cd849e1f7', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', '206a26d4-14ae-45d3-baa4-dc21de2d9c80'),
('ea6f96a7-88d5-455d-812e-7520a498d3be', 'b9eb8231-5422-4d6f-906b-eeb55da1edd1', '80bf1604-f394-42ca-af1d-2ab8dc551c45'),
('8c11996d-d896-4eff-894e-17794c10f390', '1934406d-e088-4a28-8c44-ccfdd5125b90', '1d1a158f-bda4-4083-a38f-22265d35abe5'),
('9137468e-437a-4f88-91f7-d9dedbda0c24', '1934406d-e088-4a28-8c44-ccfdd5125b90', '36bfa8b9-a1ba-430b-9f4b-5ceaebc4d878'),
('338ead3b-2185-46d7-82ec-4799003be89c', '1934406d-e088-4a28-8c44-ccfdd5125b90', 'ab1f68c2-186a-4b37-bbc2-ebb1670605a6'),
('483dfdb8-9e1c-4ee0-9f14-23a79eb2c6d6', '1934406d-e088-4a28-8c44-ccfdd5125b90', '8b6c07b0-fc5d-4914-a584-6738d5bcf963'),
('edb35a52-ba00-45e7-a5b2-9c35633ec4f5', '1934406d-e088-4a28-8c44-ccfdd5125b90', '206a26d4-14ae-45d3-baa4-dc21de2d9c80'),
('d547f8ff-9d12-4b12-9757-669475ab7e57', '1934406d-e088-4a28-8c44-ccfdd5125b90', '80bf1604-f394-42ca-af1d-2ab8dc551c45');
