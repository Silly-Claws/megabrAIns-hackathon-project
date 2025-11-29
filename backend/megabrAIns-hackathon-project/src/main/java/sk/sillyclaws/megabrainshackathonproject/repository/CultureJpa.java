package sk.sillyclaws.megabrainshackathonproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sk.sillyclaws.megabrainshackathonproject.models.CultureEntity;

import java.util.List;

public interface CultureJpa extends JpaRepository<CultureEntity, Long> {
    @Query(value = "SELECT x, y FROM institute_points", nativeQuery = true)
    List<Object[]> getAllCulture();
}
