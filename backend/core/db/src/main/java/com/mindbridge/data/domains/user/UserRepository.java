package com.mindbridge.data.domains.user;

import com.mindbridge.data.domains.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, UUID>, JpaSpecificationExecutor<User> {

	Optional<User> findByEmail(String email);

	Optional<User> findByNickname(String nickname);

	List<User> findAllByNicknameIsContaining(String nickname);

	boolean existsByEmail(String email);

	boolean existsByNickname(String nickname);

	int countUserByDeletedFalse();

	@Query(value = "SELECT count (rating) " + "from ( select "
			+ "COALESCE(SUM(CASE WHEN pr.liked = TRUE THEN 1 ELSE -1 END), 0) as rating " + "from posts p "
			+ "join post_reactions pr on pr.post_id = p.id " + "where p.author_id = :id "
			+ "group by p.id) sums where sums.rating > 1000 ", nativeQuery = true)
	long countCoolPostsByAuthor(UUID id);

	@Query(value = "SELECT count (rating) " + "from( select "
			+ "COALESCE(SUM(CASE WHEN cr.liked = TRUE THEN 1 ELSE -1 END), 0) as rating " + "from comments c "
			+ "join comment_reactions cr on cr.comment_id = c.id " + "where c.author_id = :id "
			+ "group by c.id) sums where sums.rating > 1000 ", nativeQuery = true)
	long countCoolCommentsByAuthor(UUID id);

	@Query(value = "Select * from users u " + "where  created_at < (current_date - interval '1 year ') "
			+ "and created_at > (current_date - interval '1 year 1 day') ", nativeQuery = true)
	List<User> getUsersByOneYearAfterRegistration();

	@Query(value = "Select * from users u " + "where  created_at < (current_date - interval '2 year ') "
			+ "and created_at > (current_date - interval '2 year 1 day') ", nativeQuery = true)
	List<User> getUsersByTwoYearsAfterRegistration();

	@Query(value = "Select * from users u " + "where  created_at < (current_date - interval '3 year ') "
			+ "and created_at > (current_date - interval '3 year 1 day') ", nativeQuery = true)
	List<User> getUsersByThreeYearsAfterRegistration();

	@Query(value = "Select * from users u " + "where  created_at < (current_date - interval '5 year ') "
			+ "and created_at > (current_date - interval '5 year 1 day') ", nativeQuery = true)
	List<User> getUsersByFiveYearsAfterRegistration();

	Optional<User> findByActivationCode(String code);
}
