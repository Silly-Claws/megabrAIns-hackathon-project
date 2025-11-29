package sk.sillyclaws.megabrainshackathonproject.tools;

import dev.langchain4j.agent.tool.Tool;

public class ParametersSettingTools {


    @Tool("Based on user input set specified search parameters for population density")
    public void setPopulationDensityParameters(int densityRadiusMeters, int densityMin, int densityMax, float parameterWeight) {

    }

}
