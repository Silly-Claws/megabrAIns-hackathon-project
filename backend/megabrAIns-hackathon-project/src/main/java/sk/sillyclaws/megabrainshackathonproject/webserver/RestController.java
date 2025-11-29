package sk.sillyclaws.megabrainshackathonproject.webserver;

import dev.langchain4j.data.message.AiMessage;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import sk.sillyclaws.megabrainshackathonproject.webserver.models.MapRequest;

@org.springframework.web.bind.annotation.RestController
@CrossOrigin(origins = "http://localhost:5173")
public class RestController {

    @GetMapping("/map")
    public String userPrompt(@RequestBody MapRequest request) {

    }

    @GetMapping("/ping")
    public String ping() {
        return "Backend is working!";
    }
}
