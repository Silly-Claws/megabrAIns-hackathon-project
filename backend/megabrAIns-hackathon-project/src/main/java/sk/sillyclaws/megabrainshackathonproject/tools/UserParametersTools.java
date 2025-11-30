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

    @Tool("Set the minimum population threshold for user preferences in the accommodation search.")
    public void setMinPopulation(float minPopulation) {
        userParametersService.setMinPopulation(minPopulation);
    }

    @Tool("Get the current minimum population threshold for user preferences.")
    public float getMinPopulation() {
        return userParametersService.getMinPopulation();
    }

    @Tool("Set the maximum population threshold for user preferences in the accommodation search.")
    public void setMaxPopulation(float maxPopulation) {
        userParametersService.setMaxPopulation(maxPopulation);
    }

    @Tool("Get the current maximum population threshold for user preferences.")
    public float getMaxPopulation() {
        return userParametersService.getMaxPopulation();
    }

    @Tool("Set the maximum distance in meters to public transport for user preferences.")
    public void setMaxTransportDistanceMeters(float maxTransportDistanceMeters) {
        userParametersService.setMaxTransportDistanceMeters(maxTransportDistanceMeters);
    }

    @Tool("Get the current maximum distance in meters to public transport.")
    public float getMaxTransportDistanceMeters() {
        return userParametersService.getMaxTransportDistanceMeters();
    }

    @Tool("Set the maximum distance in meters to schools for user preferences.")
    public void setMaxSchoolDistanceMeters(float maxSchoolDistanceMeters) {
        userParametersService.setMaxSchoolDistanceMeters(maxSchoolDistanceMeters);
    }

    @Tool("Get the current maximum distance in meters to schools.")
    public float getMaxSchoolDistanceMeters() {
        return userParametersService.getMaxSchoolDistanceMeters();
    }

    @Tool("Set the minimum number of schools nearby for user preferences.")
    public void setMinSchoolsNearby(float minSchoolsNearby) {
        userParametersService.setMinSchoolsNearby(minSchoolsNearby);
    }

    @Tool("Get the current minimum number of schools nearby.")
    public float getMinSchoolsNearby() {
        return userParametersService.getMinSchoolsNearby();
    }

    @Tool("Set the search radius in meters for schools in user preferences.")
    public void setSchoolSearchRadiusMeters(float schoolSearchRadiusMeters) {
        userParametersService.setSchoolSearchRadiusMeters(schoolSearchRadiusMeters);
    }

    @Tool("Get the current search radius in meters for schools.")
    public float getSchoolSearchRadiusMeters() {
        return userParametersService.getSchoolSearchRadiusMeters();
    }

    @Tool("Set the maximum distance in meters to cultural institutes for user preferences.")
    public void setMaxCultureDistanceMeters(float maxCultureDistanceMeters) {
        userParametersService.setMaxCultureDistanceMeters(maxCultureDistanceMeters);
    }

    @Tool("Get the current maximum distance in meters to cultural institutes.")
    public float getMaxCultureDistanceMeters() {
        return userParametersService.getMaxCultureDistanceMeters();
    }

    @Tool("Set the minimum number of cultural institutes in user preferences.")
    public void setMinCultureDistanceMeters(float minCultureDistanceMeters) {
        userParametersService.setMinCultureNearby(minCultureDistanceMeters);
    }

    @Tool("Get the current minimum number in meters of cultural institutes nearby.")
    public float getMinCultureDistanceMeters() {
        return userParametersService.getMinCultureNearby();
    }

    @Tool("Set the search radius in meters for cultural institutes in user preferences.")
    public void setCultureSearchRadiusMeters(float cultureSearchRadiusMeters) {
        userParametersService.setCultureSearchRadiusMeters(cultureSearchRadiusMeters);
    }

    @Tool("Get the current search radius in meters for cultural institutes.")
    public float getCultureSearchRadiusMeters() {
        return userParametersService.getCultureSearchRadiusMeters();
    }

    @Tool("Set the maximum distance in meters to social services for user preferences.")
    public void setMaxSocialDistanceMeters(float maxSocialDistanceMeters) {
        userParametersService.setMaxSocialDistanceMeters(maxSocialDistanceMeters);
    }

    @Tool("Get the current maximum distance in meters to social services.")
    public float getMaxSocialDistanceMeters() {
        return userParametersService.getMaxSocialDistanceMeters();
    }

    @Tool("Set the minimum number of social services in user preferences.")
    public void setMinSocialDistanceMeters(float minSocialDistanceMeters) {
        userParametersService.setMinSocialNearby(minSocialDistanceMeters);
    }

    @Tool("Get the current minimum number of social services nearby.")
    public float getMinSocialDistanceMeters() {
        return userParametersService.getMinSocialNearby();
    }

    @Tool("Set the search radius in meters for social services in user preferences.")
    public void setSocialSearchRadiusMeters(float socialSearchRadiusMeters) {
        userParametersService.setSocialSearchRadiusMeters(socialSearchRadiusMeters);
    }

    @Tool("Get the current search radius in meters for social services.")
    public float getSocialSearchRadiusMeters() {
        return userParametersService.getSocialSearchRadiusMeters();
    }
}