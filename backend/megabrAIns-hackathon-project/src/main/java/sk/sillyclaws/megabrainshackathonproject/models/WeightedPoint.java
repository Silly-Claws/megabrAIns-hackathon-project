package sk.sillyclaws.megabrainshackathonproject.models;

import lombok.Data;

@Data
public class WeightedPoint {
    private Point coordinate;
    private float weight; // 0-1
}
