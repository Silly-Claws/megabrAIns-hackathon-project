package sk.sillyclaws.megabrainshackathonproject.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "institute_points")
@Data
public class CultureEntity {

    @Id
    private Long id;

    @Column
    private double x;

    @Column
    private double y;
}

