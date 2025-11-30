package sk.sillyclaws.megabrainshackathonproject.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sk.sillyclaws.megabrainshackathonproject.config.CoordinatesConfig;
import sk.sillyclaws.megabrainshackathonproject.models.*;
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

    private final UserParametersService userParametersService;

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
        for (PopulationEntityWithoutId row : aggregated) {
            int gLat = ((Number) row.getX()).intValue();
            int gLon = ((Number) row.getY()).intValue();
            float people = ((Number) row.getResidents()).floatValue();
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

        List<TransportEntity> rows = transportationRepository.getAllStops();

        record Stop(double lat, double lon, int weight) {}

        List<Stop> stops = rows.stream().map(r -> {
            double lon = r.getX();
            double lat = r.getY();

            boolean bus = r.isBus();
            boolean trolley = r.isTrolley();
            boolean tram = r.isTram();

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

    private List<WeightedPoint> generateSimpleCountLayer(List<Point> grid, List<Point> coords) {

        List<WeightedPoint> result = new ArrayList<>();

        double half = CoordinatesConfig.WALKING_DISTANCE / 2.0;

        for (Point gp : grid) {

            double mLat = 111_320.0;
            double mLon = 111_320.0 * Math.cos(Math.toRadians(gp.lat()));

            double dLat = half / mLat;
            double dLon = half / mLon;

            float count = 0;

            // Count how many objects fall inside the square window
            for (Point p : coords) {
                if (Math.abs(p.lat() - gp.lat()) <= dLat &&
                        Math.abs(p.lon() - gp.lon()) <= dLon) {
                    count++;
                }
            }

            result.add(new WeightedPoint(gp, count));
        }

        return normalizePoints(result);  // returns 0–1 scale across grid
    }

    public List<WeightedPoint> getSchoolsLayer() {
        List<Point> grid = gridGeneratorService.generateGrid();

        List<Point> coords = schoolsRepo.findAll().stream()
                .map(e -> new Point(e.getY(), e.getX())) // lat = y, lon = x
                .toList();

        return generateSimpleCountLayer(grid, coords);
    }

    public List<WeightedPoint> getSocialLayer() {
        List<Point> grid = gridGeneratorService.generateGrid();

        List<Point> coords = socialRepo.findAll().stream()
                .map(e -> new Point(e.getY(), e.getX()))
                .toList();

        return generateSimpleCountLayer(grid, coords);
    }

    public List<WeightedPoint> getCultureLayer() {
        List<Point> grid = gridGeneratorService.generateGrid();

        List<Point> coords = cultureRepo.findAll().stream()
                .map(e -> new Point(e.getY(), e.getX()))
                .toList();

        return generateSimpleCountLayer(grid, coords);
    }

    public List<WeightedPoint> getUserAcceptanceLayer() {

        List<Point> grid = gridGeneratorService.generateGrid();

        // ===== Preload all datasets once =====
        List<WeightedPoint> populationGrid = getPopulationLayerGridded();
        List<TransportEntity> transportStops = transportationRepository.getAllStops();
        List<Point> schools = schoolsRepo.findAll().stream().map(e -> new Point(e.getX(), e.getY())).toList();
        List<Point> socials = socialRepo.findAll().stream().map(e -> new Point(e.getX(), e.getY())).toList();
        List<Point> culture = cultureRepo.findAll().stream().map(e -> new Point(e.getX(), e.getY())).toList();

        List<WeightedPoint> result = new ArrayList<>();

        for (int i = 0; i < grid.size(); i++) {

            Point gp = grid.get(i);
            float totalScore = 0;
            int activeFilters = 0;

            // ==========================================================
            // 1) POPULATION — ONLY IF ENABLED
            // ==========================================================
            if (userParametersService.isUsePopulationFilter()) {

                float pop = populationGrid.get(i).getWeight();  // 0–1 normalized already
                float min = userParametersService.getMinPopulation();
                float max = userParametersService.getMaxPopulation();

                activeFilters++;

                if (pop >= min && pop <= max) {
                    totalScore += 1f;                                   // ideal fit
                } else {
                    float delta = (pop < min) ? min - pop : pop - max;
                    float range = Math.max(0.1f, max - min);
                    totalScore += Math.max(0f, 1f - delta / range);     // smooth penalty
                }
            }

            // ==========================================================
            // 2) TRANSPORT DISTANCE — ONLY IF ENABLED
            // ==========================================================
            if (userParametersService.isUseTransportFilter()) {

                float radius = userParametersService.getMaxTransportDistanceMeters();
                activeFilters++;

                double nearest = nearestDistance(gp, transportStops, radius);
                if (nearest >= 0)
                    totalScore += (float) (1 - nearest / radius);
            }

            // ==========================================================
            // 3) SCHOOLS — ONLY IF ENABLED
            // ==========================================================
            if (userParametersService.isUseSchoolFilter()) {

                float min = userParametersService.getMinSchoolsNearby();
                float radius = userParametersService.getSchoolSearchRadiusMeters();
                activeFilters++;

                int count = countNearby(gp, schools, radius);
                totalScore += Math.min(1f, count / min);
            }

            // ==========================================================
            // 4) SOCIAL SERVICES — ONLY IF ENABLED
            // ==========================================================
            if (userParametersService.isUseSocialFilter()) {

                float min = userParametersService.getMinSocialNearby();
                float radius = userParametersService.getSocialSearchRadiusMeters();
                activeFilters++;

                int count = countNearby(gp, socials, radius);
                totalScore += Math.min(1f, count / min);
            }

            // ==========================================================
            // 5) CULTURE — ONLY IF ENABLED
            // ==========================================================
            if (userParametersService.isUseCultureFilter()) {

                float min = userParametersService.getMinCultureNearby();
                float radius = userParametersService.getCultureSearchRadiusMeters();
                activeFilters++;

                int count = countNearby(gp, culture, radius);
                totalScore += Math.min(1f, count / min);
            }


            // Normalize by number of active criteria
            float finalScore = activeFilters == 0 ? 0 : (totalScore / activeFilters);
            result.add(new WeightedPoint(gp, finalScore));
        }

        return result;
    }

    private double nearestDistance(Point gp, List<TransportEntity> stops, double maxDist) {
        double best = Double.MAX_VALUE;

        double mLat = 111_320.0;
        double mLon = 111_320.0 * Math.cos(Math.toRadians(gp.lat()));

        for (TransportEntity t : stops) {
            double dy = (t.getY() - gp.lat()) * mLat;
            double dx = (t.getX() - gp.lon()) * mLon;
            double d = Math.sqrt(dx*dx + dy*dy);
            best = Math.min(best, d);
        }
        return best <= maxDist ? best : -1;
    }

    private int countNearby(Point gp, List<Point> coords, double r) {
        double mLat = 111_320.0;
        double mLon = 111_320.0 * Math.cos(Math.toRadians(gp.lat()));

        double dLat = r / mLat;
        double dLon = r / mLon;

        int count = 0;
        for (Point p : coords)
            if (Math.abs(p.lat() - gp.lat()) <= dLat && Math.abs(p.lon() - gp.lon()) <= dLon)
                count++;

        return count;
    }
}
