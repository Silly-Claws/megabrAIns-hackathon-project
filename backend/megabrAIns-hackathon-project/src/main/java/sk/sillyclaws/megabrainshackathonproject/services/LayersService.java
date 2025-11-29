package sk.sillyclaws.megabrainshackathonproject.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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

    private final List<Point> gridPoints = gridGeneratorService.generateGrid();

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
        List<WeightedPoint> populationPointsGridded = new ArrayList<>();

        for (Point point : gridPoints) {
            WeightedPoint wp = new WeightedPoint();



            populationPointsGridded.add(wp);
        }

        return normalizePoints(populationPointsGridded);
    }
}
