package sk.sillyclaws.megabrainshackathonproject.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sk.sillyclaws.megabrainshackathonproject.config.CoordinatesConfig;
import sk.sillyclaws.megabrainshackathonproject.models.Point;
import sk.sillyclaws.megabrainshackathonproject.models.WeightedPoint;
import sk.sillyclaws.megabrainshackathonproject.repository.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LayersService {

    private final PopulationJpa populationRepository;
    private final TransportationJpa transportationRepository;
    private final SchoolsJpa schoolsRepo;
    private final SocialJpa socialRepo;
    private final CultureJpa cultureRepo;

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

    public List<WeightedPoint> getPopulationLayerGridded() {

        var grid = gridGeneratorService.generateGrid();

        double latMin = grid.stream().mapToDouble(Point::lat).min().orElseThrow();
        double latMax = grid.stream().mapToDouble(Point::lat).max().orElseThrow();
        double lonMin = grid.stream().mapToDouble(Point::lon).min().orElseThrow();

        double metersPerDegLat = 111_320.0;
        double metersPerDegLon = 111_320.0 * Math.cos(Math.toRadians((latMin + latMax) / 2));

        double latStep = CoordinatesConfig.DISTANCE / metersPerDegLat;
        double lonStep = CoordinatesConfig.DISTANCE / metersPerDegLon;

        var aggregated = populationRepository.getPopulationGrid(latMin, latStep, lonMin, lonStep);

        var populationMap = new HashMap<String, Float>();
        for (Object[] row : aggregated) {
            int gLat = ((Number) row[0]).intValue();
            int gLon = ((Number) row[1]).intValue();
            float people = ((Number) row[2]).floatValue();
            populationMap.put(gLat + ":" + gLon, people);
        }

        List<WeightedPoint> result = new ArrayList<>();
        for (Point p : grid) {
            int gl = (int) Math.floor((p.lat() - latMin) / latStep);
            int gn = (int) Math.floor((p.lon() - lonMin) / lonStep);
            float value = populationMap.getOrDefault(gl + ":" + gn, 0f);
            result.add(new WeightedPoint(p, value));
        }

        return normalizePoints(result);
    }

    public List<WeightedPoint> getTransportAccessibilityLayer() {

        List<Point> grid = gridGeneratorService.generateGrid();

        List<Object[]> rows = transportationRepository.getAllStops();

        record Stop(double lat, double lon, int weight) {}

        List<Stop> stops = rows.stream().map(r -> {
            double lon = (double) r[0];
            double lat = (double) r[1];

            boolean bus = (boolean) r[2];
            boolean trolley = (boolean) r[3];
            boolean tram = (boolean) r[4];

            int weight = 0;
            if (bus) weight++;
            if (trolley) weight++;
            if (tram) weight++;

            return new Stop(lat, lon, weight);
        }).toList();

        List<WeightedPoint> result = new ArrayList<>();

        double halfDistanceMeters = CoordinatesConfig.WALKING_DISTANCE / 2;

        for (Point gp : grid) {

            double mLat = 111_320.0;
            double mLon = 111_320.0 * Math.cos(Math.toRadians(gp.lat()));

            double dLat = halfDistanceMeters / mLat;
            double dLon = halfDistanceMeters / mLon;

            float score = 0f;
            for (Stop s : stops) {
                if (Math.abs(s.lat - gp.lat()) <= dLat &&
                        Math.abs(s.lon - gp.lon()) <= dLon) {
                    score += s.weight;
                }
            }

            result.add(new WeightedPoint(gp, score));
        }

        return normalizePoints(result);
    }

    private List<WeightedPoint> generateSimpleCountLayer(List<Point> grid, List<Object[]> coords) {

        record Obj(double lat, double lon) {}

        List<Obj> objects = coords.stream()
                .map(o -> new Obj((double) o[1], (double) o[0])) // y=lat x=lon
                .toList();

        List<WeightedPoint> result = new ArrayList<>();

        double half = CoordinatesConfig.WALKING_DISTANCE / 2;

        for (Point gp : grid) {

            double mLat = 111_320.0;
            double mLon = 111_320.0 * Math.cos(Math.toRadians(gp.lat()));

            double dLat = half / mLat;
            double dLon = half / mLon;

            float count = 0;
            for (Obj o : objects) {
                if (Math.abs(o.lat - gp.lat()) <= dLat &&
                        Math.abs(o.lon - gp.lon()) <= dLon) {
                    count += 1;
                }
            }

            result.add(new WeightedPoint(gp, count));
        }

        return normalizePoints(result); // 0→1 scale
    }

    public List<WeightedPoint> getSchoolsLayer() {
        var grid = gridGeneratorService.generateGrid();
        var coords = schoolsRepo.getAllSchools();
        return generateSimpleCountLayer(grid, coords);
    }

    public List<WeightedPoint> getSocialLayer() {
        var grid = gridGeneratorService.generateGrid();
        var coords = socialRepo.getAllSocial();
        return generateSimpleCountLayer(grid, coords);
    }

    public List<WeightedPoint> getCultureLayer() {
        var grid = gridGeneratorService.generateGrid();
        var coords = cultureRepo.getAllCulture();
        return generateSimpleCountLayer(grid, coords);
    }
}
