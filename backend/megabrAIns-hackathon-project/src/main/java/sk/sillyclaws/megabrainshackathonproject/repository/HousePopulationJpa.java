package sk.sillyclaws.megabrainshackathonproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sk.sillyclaws.megabrainshackathonproject.models.HousePopulationEntity;

public interface HousePopulationJpa extends JpaRepository<HousePopulationEntity, Long> {

    @Query(value = """
        SELECT COALESCE(SUM(pocet_obyvatelov), 0)
        FROM population_points
        WHERE x BETWEEN :lonMin AND :lonMax
          AND y BETWEEN :latMin AND :latMax
    """, nativeQuery = true)
    Float getPopulationInArea(
            @Param("latMin") double latMin,
            @Param("latMax") double latMax,
            @Param("lonMin") double lonMin,
            @Param("lonMax") double lonMax
    );
}
