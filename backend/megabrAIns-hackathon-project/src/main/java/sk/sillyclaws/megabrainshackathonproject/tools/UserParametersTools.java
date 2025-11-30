package sk.sillyclaws.megabrainshackathonproject.tools;

import dev.langchain4j.agent.tool.Tool;
import sk.sillyclaws.megabrainshackathonproject.services.UserParametersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserParametersTools {

    private final UserParametersService userParametersService;

    @Autowired
    public UserParametersTools(UserParametersService userParametersService) {
        this.userParametersService = userParametersService;
    }

    @Tool("Set the population searching parameters. The number of people leaves in nearby rectangle 400x400 meters")
    public void setPopulationPreferences(boolean usePopulationFilter, float minPopulation, float maxPopulation) {
        userParametersService.setUsePopulationFilter(usePopulationFilter);
        userParametersService.setMinPopulation(minPopulation);
        userParametersService.setMaxPopulation(maxPopulation);
    }

    @Tool("Set the maximum distance in meters to public transport for user preferences.")
    public void setMaxTransportDistanceMeters(boolean useTransportFilter, float maxTransportDistanceMeters) {
        userParametersService.setUseTransportFilter(useTransportFilter);
        userParametersService.setMaxTransportDistanceMeters(maxTransportDistanceMeters);
    }

    @Tool("Set the parameters about schools nearby.")
    public void setMaxSchoolDistanceMeters(boolean useSchoolFilter, float maxSchoolDistanceMeters, float minSchoolsNearby, float schoolSearchRadiusMeters) {
        userParametersService.setUseSchoolFilter(useSchoolFilter);
        userParametersService.setMaxSchoolDistanceMeters(maxSchoolDistanceMeters);
        userParametersService.setMinSchoolsNearby(minSchoolsNearby);
        userParametersService.setSchoolSearchRadiusMeters(schoolSearchRadiusMeters);
    }

    @Tool("Set searching parameters for cultural institutions.")
    public void setMaxCultureDistanceMeters(boolean useCultureFilter, float maxCultureDistanceMeters,  float minCultureNearby, float cultureSearchRadiusMeters) {
        userParametersService.setUseCultureFilter(useCultureFilter);
        userParametersService.setMaxCultureDistanceMeters(maxCultureDistanceMeters);
        userParametersService.setMinCultureNearby(minCultureNearby);
        userParametersService.setCultureSearchRadiusMeters(cultureSearchRadiusMeters);
    }

    @Tool("Set searching parameters for social services nearby.")
    public void setMaxSocialDistanceMeters(boolean useSocialFilter, float maxSocialDistanceMeters, float minSocialNearby, float socialSearchRadiusMeters) {
        userParametersService.setUseSocialFilter(useSocialFilter);
        userParametersService.setMaxSocialDistanceMeters(maxSocialDistanceMeters);
        userParametersService.setMinSocialNearby(minSocialNearby);
        userParametersService.setSocialSearchRadiusMeters(socialSearchRadiusMeters);
    }

    @Tool("Get summary of currently active filters with their parameters.")
    public String getActiveFiltersSummary() {
        return """
        Population filter: %s
        ↳ min: %s | max: %s at nearest 400x400 meters square

        Transport filter: %s
        ↳ max distance: %s m

        Schools filter: %s
        ↳ max distance: %s m | min nearby: %s | radius: %s m

        Culture filter: %s
        ↳ max distance: %s m | min nearby: %s | radius: %s m

        Social filter: %s
        ↳ max distance: %s m | min nearby: %s | radius: %s m
        """.formatted(
                userParametersService.isUsePopulationFilter(),
                userParametersService.getMinPopulation(),
                userParametersService.getMaxPopulation(),

                userParametersService.isUseTransportFilter(),
                userParametersService.getMaxTransportDistanceMeters(),

                userParametersService.isUseSchoolFilter(),
                userParametersService.getMaxSchoolDistanceMeters(),
                userParametersService.getMinSchoolsNearby(),
                userParametersService.getSchoolSearchRadiusMeters(),

                userParametersService.isUseCultureFilter(),
                userParametersService.getMaxCultureDistanceMeters(),
                userParametersService.getMinCultureNearby(),
                userParametersService.getCultureSearchRadiusMeters(),

                userParametersService.isUseSocialFilter(),
                userParametersService.getMaxSocialDistanceMeters(),
                userParametersService.getMinSocialNearby(),
                userParametersService.getSocialSearchRadiusMeters()
        );
    }
}