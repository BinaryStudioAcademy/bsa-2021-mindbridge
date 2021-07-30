package com.mindbridge.data.domains.favorite;

import com.mindbridge.data.domains.favorite.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface FavoriteRepository extends JpaRepository<Favorite, UUID>, JpaSpecificationExecutor<Favorite> {
}
