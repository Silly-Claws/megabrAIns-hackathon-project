package sk.sillyclaws.megabrainshackathonproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sk.sillyclaws.megabrainshackathonproject.models.SocialEntity;

import java.util.List;

public interface SocialJpa extends JpaRepository<SocialEntity, Long> {
    @Query(value = "SELECT id, x, y FROM social_services_points", nativeQuery = true)
    List<SocialEntity> getAllSocial();
}
