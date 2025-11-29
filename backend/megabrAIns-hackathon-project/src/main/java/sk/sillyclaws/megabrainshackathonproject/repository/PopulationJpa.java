package sk.sillyclaws.megabrainshackathonproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sk.sillyclaws.megabrainshackathonproject.models.HousePopulationEntity;

import java.util.List;

public interface PopulationJpa extends JpaRepository<HousePopulationEntity, Long> {

    @Query(value = """
    SELECT 
        FLOOR((y - :latMin) / :latStep) AS gridLat,
        FLOOR((x - :lonMin) / :lonStep) AS gridLon,
        SUM(pocet_obyvatelov) AS total
    FROM population_points
    GROUP BY gridLat, gridLon
""", nativeQuery = true)
    List<Object[]> getPopulationGrid(
            @Param("latMin") double latMin,
            @Param("latStep") double latStep,
            @Param("lonMin") double lonMin,
            @Param("lonStep") double lonStep
    );

}
