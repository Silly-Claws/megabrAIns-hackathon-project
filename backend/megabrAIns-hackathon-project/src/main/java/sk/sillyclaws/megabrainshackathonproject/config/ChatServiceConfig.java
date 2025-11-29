package sk.sillyclaws.megabrainshackathonproject.config;

import dev.langchain4j.model.chat.ChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import dev.langchain4j.model.openai.OpenAiChatModel;

@Configuration
public class ChatServiceConfig {

    @Value("${openai.api.key}")
    private String apiKey;

    @Bean
    public ChatModel openAIChatModel(){
        return OpenAiChatModel.builder()
                .apiKey(apiKey)
                .modelName("gpt-4o-mini")
                .build();
    }

}
