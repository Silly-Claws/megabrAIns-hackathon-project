package sk.sillyclaws.megabrainshackathonproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sk.sillyclaws.megabrainshackathonproject.models.TransportEntity;

import java.util.List;

public interface TransportationJpa extends JpaRepository<TransportEntity, Long> {
    @Query(value = """
    SELECT id, x, y, autobus, trolejbus, elektricka
    FROM public_transport_points
""", nativeQuery = true)
    List<TransportEntity> getAllStops();
}
