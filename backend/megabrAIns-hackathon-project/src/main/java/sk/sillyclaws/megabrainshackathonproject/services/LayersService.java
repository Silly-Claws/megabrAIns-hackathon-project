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

        var grid = gridGeneratorService.generateGrid();

        double latMin = grid.stream().mapToDouble(Point::lat).min().orElseThrow();
        double latMax = grid.stream().mapToDouble(Point::lat).max().orElseThrow();
        double lonMin = grid.stream().mapToDouble(Point::lon).min().orElseThrow();
        double lonMax = grid.stream().mapToDouble(Point::lon).max().orElseThrow();

        double metersPerDegLat = 111_320.0;
        double metersPerDegLon = 111_320.0 * Math.cos(Math.toRadians((latMin + latMax) / 2));

        double latStep = CoordinatesConfig.DISTANCE / metersPerDegLat;
        double lonStep = CoordinatesConfig.DISTANCE / metersPerDegLon;

        var aggregated = populationRepository.getPopulationGrid(latMin, latStep, lonMin, lonStep);

        List<WeightedPoint> result = new ArrayList<>();
        for (Object[] row : aggregated) {
            int gLat = ((Number) row[0]).intValue();
            int gLon = ((Number) row[1]).intValue();
            float people = ((Number) row[2]).floatValue();

            double lat = latMin + gLat * latStep;
            double lon = lonMin + gLon * lonStep;

            result.add(new WeightedPoint(new Point(lat, lon), people));
        }

        return normalizePoints(result);
    }

}
