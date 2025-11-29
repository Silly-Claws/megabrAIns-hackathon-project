package sk.sillyclaws.megabrainshackathonproject.repository;

import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import sk.sillyclaws.megabrainshackathonproject.models.HousePopulationEntity;

public interface HousePopulationJpa extends JpaRepository<@NonNull HousePopulationEntity, @NonNull Long> {
}
