update users
set
	id = u2.id::uuid,
    is_viewed = u2.is_viewed
from (values
		  ('db127d6b-f2f3-4115-b20a-5b5f67c384aa',  true),
		  ('a9212bcd-9410-4f2c-a51e-cad095d6982b',  true),
		  ('8a29bd6d-9c90-44e5-87ea-493618aa1f6b',  true),
		  ('e1ed2f0f-b402-4208-b39b-ff8d2fbf6164',  true),
		  ('b9eb8231-5422-4d6f-906b-eeb55da1edd1',  true),
		  ('1934406d-e088-4a28-8c44-ccfdd5125b90',  true),
		  ('22be7f78-037c-11ec-9a03-0242ac130003',  true),
		  ('28856520-037c-11ec-9a03-0242ac130003',  true),
		  ('2e04946c-037c-11ec-9a03-0242ac130003',  true),
		  ('31d94cea-037c-11ec-9a03-0242ac130003',  true)
) as u2(id, is_viewed)
where u2.id::uuid= users.id
