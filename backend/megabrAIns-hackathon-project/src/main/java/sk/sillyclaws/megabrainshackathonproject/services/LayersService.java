package sk.sillyclaws.megabrainshackathonproject.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sk.sillyclaws.megabrainshackathonproject.config.CoordinatesConfig;
import sk.sillyclaws.megabrainshackathonproject.models.Point;
import sk.sillyclaws.megabrainshackathonproject.models.WeightedPoint;
import sk.sillyclaws.megabrainshackathonproject.repository.PopulationRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LayersService {

    private final PopulationRepository populationRepository;
    private final GridGeneratorService gridGeneratorService;

    private List<WeightedPoint> normalizePoints(List<WeightedPoint> points) {
        float max = points.stream()
                .map(WeightedPoint::getWeight)
                .max(Float::compare)
                .orElse(1f);

        return points.stream()
                .map(p -> {
                    WeightedPoint wp = new WeightedPoint();
                    wp.setCoordinate(p.getCoordinate());
                    wp.setWeight(p.getWeight() / max);
                    return wp;
                })
                .toList();
    }

    public List<WeightedPoint> getPopulationLayerPoints() {
        List<WeightedPoint> population = populationRepository.getHousesAndNumberOfPeople();
        return normalizePoints(population);
    }

    public List<WeightedPoint> getPopulationLayerGridded() {

        List<WeightedPoint> result = new ArrayList<>();
        double halfMeters = CoordinatesConfig.DISTANCE / 2.0;

        var grid = gridGeneratorService.generateGrid();

        for (Point gp : grid) {

//            System.out.println(gp);

            // convert search radius from meters → degrees
            double metersPerDegLat = 111_320.0;
            double metersPerDegLon =
                    111_320.0 * Math.cos(Math.toRadians(gp.lat()));

            double halfLat = halfMeters / metersPerDegLat;
            double halfLon = halfMeters / metersPerDegLon;

//            System.out.println((gp.lat() - halfLat) + " " + (gp.lat() + halfLat));
//            System.out.println((gp.lon() - halfLon) + " " + (gp.lon() + halfLon));

            float people = populationRepository.getPopulationInArea(
                    gp.lat() - halfLat, gp.lat() + halfLat,
                    gp.lon() - halfLon, gp.lon() + halfLon
            );

//            System.out.println(people);

            if (people > 0) {
                result.add(new WeightedPoint(gp, people));
            }
        }

        return normalizePoints(result);
    }
}
