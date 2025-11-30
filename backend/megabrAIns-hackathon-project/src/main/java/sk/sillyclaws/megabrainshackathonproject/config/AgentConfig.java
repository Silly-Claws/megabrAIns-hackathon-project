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
                .systemMessageProvider(memory -> """
                    You are an AI assistant who helps with choosing accommodation by determining which places/districts would be comfort for user based on his preferences..
                    Your task is to set up search parameters according to user preferences he describes, using tools you have.
                    After you change these parameters, user sees an updated heatmap of places which he would like or not.
                    Do not enable filters so that if not mentioned by user, there should be as much possibilities as possible.
                """)
                .build();
    }
}
