package sk.sillyclaws.megabrainshackathonproject.webserver;

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
import java.util.List;

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
            @RequestParam(defaultValue = "false") boolean social,
            @RequestParam(defaultValue = "false") boolean culture
    ) {
        List<Layer> layers = new ArrayList<>();

        if (population) {
            layers.add(new Layer("population", "Population density", layersService.getPopulationLayerGridded()));
        }
        if (transportation) {
            layers.add(new Layer("transportation", "Transport accessibility", layersService.getTransportAccessibilityLayer()));
        }
        if (education) {
            layers.add(new Layer("education", "Schools", layersService.getSchoolsLayer()));
        }
        if (social) {
            layers.add(new Layer("social", "Social Services", layersService.getSocialLayer()));
        }
        if (culture) {
            layers.add(new Layer("culture", "Culture", layersService.getCultureLayer()));
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
