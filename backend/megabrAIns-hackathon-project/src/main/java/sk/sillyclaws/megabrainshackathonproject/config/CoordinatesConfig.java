package sk.sillyclaws.megabrainshackathonproject.config;

import org.springframework.context.annotation.Configuration;
import sk.sillyclaws.megabrainshackathonproject.models.Point;

@Configuration
public class CoordinatesConfig {

    public static final Point TOP_LEFT     = new Point(48.759358, 21.187071);
    public static final Point BOTTOM_RIGHT = new Point(48.678284, 21.316946);

    public static final double DISTANCE = 100;
}
