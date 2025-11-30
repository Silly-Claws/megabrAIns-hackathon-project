package sk.sillyclaws.megabrainshackathonproject.services;

import dev.langchain4j.data.message.AiMessage;
import org.springframework.stereotype.Component;
import sk.sillyclaws.megabrainshackathonproject.agent.MyAgent;

@Component
public class ChatBot {

    private final MyAgent agent;

    public ChatBot(MyAgent agent) {
        this.agent = agent;
    }

    public AiMessage processRequest(String prompt) {
        return new AiMessage(agent.chat(prompt));
    }
}