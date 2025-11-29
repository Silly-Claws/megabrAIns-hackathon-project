package sk.sillyclaws.megabrainshackathonproject.services;

import org.springframework.stereotype.Service;
import sk.sillyclaws.megabrainshackathonproject.config.CoordinatesConfig;
import sk.sillyclaws.megabrainshackathonproject.models.Point;

import java.util.ArrayList;
import java.util.List;

@Service
public class GridGeneratorService {

    public List<Point> generateGrid() {

        List<Point> points = new ArrayList<>();

        double topLat = Math.max(CoordinatesConfig.TOP_LEFT.lat(), CoordinatesConfig.BOTTOM_RIGHT.lat());
        double bottomLat = Math.min(CoordinatesConfig.TOP_LEFT.lat(), CoordinatesConfig.BOTTOM_RIGHT.lat());
        double leftLon = Math.min(CoordinatesConfig.TOP_LEFT.lon(), CoordinatesConfig.BOTTOM_RIGHT.lon());
        double rightLon = Math.max(CoordinatesConfig.TOP_LEFT.lon(), CoordinatesConfig.BOTTOM_RIGHT.lon());

        double avgLat = (topLat + bottomLat) / 2;

        double metersPerDegLat = 111_320.0;
        double metersPerDegLon = 111_320.0 * Math.cos(Math.toRadians(avgLat));

        double dLat = CoordinatesConfig.DISTANCE / metersPerDegLat;
        double dLon = CoordinatesConfig.DISTANCE / metersPerDegLon;

        for (double lat = bottomLat; lat <= topLat; lat += dLat) {
            for (double lon = leftLon; lon <= rightLon; lon += dLon) {
                points.add(new Point(lat, lon));
            }
        }

        return points;
    }
}
