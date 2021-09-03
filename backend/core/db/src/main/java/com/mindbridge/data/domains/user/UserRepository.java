package com.mindbridge.data.domains.user;

import com.mindbridge.data.domains.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID>, JpaSpecificationExecutor<User> {

	Optional<User> findByEmail(String email);

	Optional<User> findByNickname(String nickname);

	List<User> findAllByNicknameIsContaining(String nickname);

	boolean existsByEmail(String email);

	boolean existsByNickname(String nickname);

	int countUserByDeletedFalse();

	Optional<User> findByActivationCode(String code);
}
