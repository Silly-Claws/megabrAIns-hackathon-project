package sk.sillyclaws.megabrainshackathonproject.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "population_points")
public class PopulationEntity {
    @Id
    private Long id;

    @Column(name = "x")
    private double x;

    @Column(name = "y")
    private double y;

    @Column(name = "pocet_obyvatelov")
    private float residents;
}
