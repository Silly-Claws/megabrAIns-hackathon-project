package sk.sillyclaws.megabrainshackathonproject.config;

import dev.langchain4j.service.AiServices;
import dev.langchain4j.model.chat.ChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sk.sillyclaws.megabrainshackathonproject.agent.MyAgent;
import sk.sillyclaws.megabrainshackathonproject.tools.UserParametersTools;

@Configuration
public class AgentConfig {

    @Bean
    public MyAgent myAgent(ChatModel chatModel, UserParametersTools tools) {
        return AiServices.builder(MyAgent.class)
                .chatModel(chatModel)
                .tools(tools)
                .build();
    }
}
