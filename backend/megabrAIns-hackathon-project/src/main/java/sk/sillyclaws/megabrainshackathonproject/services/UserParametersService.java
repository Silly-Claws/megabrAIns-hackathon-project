package sk.sillyclaws.megabrainshackathonproject.services;

import lombok.Data;
import org.springframework.stereotype.Service;

@Data
@Service
public class UserParametersService {
    private float minPopulation;
    private float maxPopulation;

    private float maxTransportDistanceMeters;

    private float maxSchoolDistanceMeters;
    private float minSchoolsNearby;
    private float schoolSearchRadiusMeters;

    private float maxCultureDistanceMeters;
    private float minCultureDistanceMeters;
    private float cultureSearchRadiusMeters;

    private float maxSocialDistanceMeters;
    private float minSocialDistanceMeters;
    private float socialSearchRadiusMeters;
}
