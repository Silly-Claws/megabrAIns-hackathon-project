package sk.sillyclaws.megabrainshackathonproject.webserver;

import dev.langchain4j.data.message.AiMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.sillyclaws.megabrainshackathonproject.services.ChatBot;
import sk.sillyclaws.megabrainshackathonproject.services.LayersService;
import sk.sillyclaws.megabrainshackathonproject.webserver.models.Layer;
import sk.sillyclaws.megabrainshackathonproject.webserver.models.MapRequest;
import sk.sillyclaws.megabrainshackathonproject.webserver.requests.PromptRequest;
import sk.sillyclaws.megabrainshackathonproject.webserver.requests.Response;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@org.springframework.web.bind.annotation.RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class RestController {

    @Autowired
    private ChatBot chatBot;

    private final LayersService layersService;

//    @GetMapping("/map/{layer}")
//    public String userPrompt(@PathVariable String layerName) {
//
//    }

    @GetMapping("/map")
    public ResponseEntity<?> getMapLayers(
            @RequestParam(defaultValue = "false") boolean population,
            @RequestParam(defaultValue = "false") boolean transportation,
            @RequestParam(defaultValue = "false") boolean education,
            @RequestParam(defaultValue = "false") boolean socialServices,
            @RequestParam(defaultValue = "false") boolean culture
    ) {
        List<Layer> layers = new ArrayList<>();

        if (population) {
            layers.add(new Layer("population", "Population Density", layersService.getPopulationLayerGridded()));
        }
        if (transportation) {

        }
        if (education) {

        }
        if (socialServices) {

        }
        if (culture) {

        }

        return ResponseEntity.ok(layers);
    }


    @GetMapping("/ping")
    public String ping() {
        return "Backend is working!";
    }


    @PostMapping("/prompt")
    public Response userPrompt(@RequestBody PromptRequest prompt) {
        return Response.aiMessageToResponse(chatBot.processRequest(prompt.getPrompt()));
    }
}
