package sk.sillyclaws.megabrainshackathonproject.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PopulationEntityWithoutId {
    private double x;
    private double y;
    private double residents;
}
