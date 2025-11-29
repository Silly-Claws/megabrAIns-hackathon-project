package sk.sillyclaws.megabrainshackathonproject.repository;

import lombok.RequiredArgsConstructor;
import sk.sillyclaws.megabrainshackathonproject.models.Point;
import org.springframework.stereotype.Repository;
import sk.sillyclaws.megabrainshackathonproject.models.WeightedPoint;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PopulationRepository {

    private final HousePopulationJpa housePopulationJpa;

    public List<WeightedPoint> getHousesAndNumberOfPeople() {
        return housePopulationJpa.findAll()
                .stream()
                .map(e -> {
                    WeightedPoint wp = new WeightedPoint();
                    wp.setCoordinate(new Point(e.getX(), e.getY()));
                    wp.setWeight(e.getResidents());
                    return wp;
                })
                .toList();
    }

    public float getPopulationInArea(double latMin, double latMax, double lonMin, double lonMax) {
        return housePopulationJpa.getPopulationInArea(latMin, latMax, lonMin, lonMax);
    }
}
