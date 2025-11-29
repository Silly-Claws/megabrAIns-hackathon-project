package sk.sillyclaws.megabrainshackathonproject.webserver.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import sk.sillyclaws.megabrainshackathonproject.models.WeightedPoint;

import java.util.List;

@Data
@AllArgsConstructor
public class Layer {
    private String name;
    private String title;
    private List<WeightedPoint> points;
}
