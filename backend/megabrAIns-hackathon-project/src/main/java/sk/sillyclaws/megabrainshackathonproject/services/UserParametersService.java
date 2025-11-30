package sk.sillyclaws.megabrainshackathonproject.services;

import lombok.Data;
import org.springframework.stereotype.Service;

@Data
@Service
public class UserParametersService {
    private boolean usePopulationFilter;
    private float minPopulation;
    private float maxPopulation;

    private boolean useTransportFilter;
    private float maxTransportDistanceMeters;

    private boolean useSchoolFilter;
    private float maxSchoolDistanceMeters;
    private float minSchoolsNearby;
    private float schoolSearchRadiusMeters;

    private boolean useCultureFilter;
    private float maxCultureDistanceMeters;
    private float minCultureNearby;
    private float cultureSearchRadiusMeters;

    private boolean useSocialFilter;
    private float maxSocialDistanceMeters;
    private float minSocialNearby;
    private float socialSearchRadiusMeters;
}
