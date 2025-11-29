package sk.sillyclaws.megabrainshackathonproject.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "institute_points")
public class CultureEntity {

    @Id
    private Long id;

    @Column
    private double x;

    @Column
    private double y;
}

