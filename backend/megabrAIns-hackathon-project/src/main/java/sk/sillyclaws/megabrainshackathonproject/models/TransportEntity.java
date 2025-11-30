package sk.sillyclaws.megabrainshackathonproject.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="public_transport_points")
public class TransportEntity {
    @Id
    private Long id;

    @Column
    private double x;   // lon
    @Column
    private double y;   // lat

    @Column(name = "autobus")
    private boolean isBus;
    @Column(name = "trolejbus")
    private boolean isTrolley;
    @Column(name = "elektricka")
    private boolean isTram;
}

