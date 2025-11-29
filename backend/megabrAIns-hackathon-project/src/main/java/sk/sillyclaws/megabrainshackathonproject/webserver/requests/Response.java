package sk.sillyclaws.megabrainshackathonproject.webserver.requests;

import dev.langchain4j.data.message.AiMessage;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Response {
    String response;

    public static Response aiMessageToResponse (AiMessage message) {
        return new Response(message.text());
    }
}
