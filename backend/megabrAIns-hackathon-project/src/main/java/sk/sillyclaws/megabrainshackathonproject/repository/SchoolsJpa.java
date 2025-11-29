package sk.sillyclaws.megabrainshackathonproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sk.sillyclaws.megabrainshackathonproject.models.SchoolEntity;

import java.util.List;

public interface SchoolsJpa extends JpaRepository<SchoolEntity, Long> {
    @Query(value = "SELECT x, y FROM school_points", nativeQuery = true)
    List<Object[]> getAllSchools();
}


