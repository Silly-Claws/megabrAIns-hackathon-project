package sk.sillyclaws.megabrainshackathonproject.webserver;

import dev.langchain4j.data.message.AiMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.sillyclaws.megabrainshackathonproject.webserver.models.MapRequest;

import java.util.HashMap;
import java.util.Map;

@org.springframework.web.bind.annotation.RestController
@CrossOrigin(origins = "http://localhost:5173")
public class RestController {

    @GetMapping("/map/{layer}")
    public String userPrompt(@PathVariable String layerName) {

    }

    @GetMapping("/map")
    public ResponseEntity<?> getMapLayers(
            @RequestParam(defaultValue = "false") boolean population,
            @RequestParam(defaultValue = "false") boolean transportation,
            @RequestParam(defaultValue = "false") boolean education,
            @RequestParam(defaultValue = "false") boolean socialServices,
            @RequestParam(defaultValue = "false") boolean culture
    ) {
        Map<String, Object> enabledLayers = new HashMap<>();

        if (population) {

        }
        if (transportation) {

        }
        if (education) {

        }
        if (socialServices) {

        }
        if (culture) {

        }

        return ResponseEntity.ok(enabledLayers);
    }


    @GetMapping("/ping")
    public String ping() {
        return "Backend is working!";
    }
}
