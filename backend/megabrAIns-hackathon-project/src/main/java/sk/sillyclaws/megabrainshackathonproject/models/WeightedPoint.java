package sk.sillyclaws.megabrainshackathonproject.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeightedPoint {
    private Point coordinate;
    private float weight; // 0-1
}
