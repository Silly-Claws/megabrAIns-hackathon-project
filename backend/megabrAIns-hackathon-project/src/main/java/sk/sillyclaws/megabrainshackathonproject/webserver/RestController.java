package sk.sillyclaws.megabrainshackathonproject.webserver;

import dev.langchain4j.data.message.AiMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.sillyclaws.megabrainshackathonproject.services.LayersService;
import sk.sillyclaws.megabrainshackathonproject.webserver.models.Layer;
import sk.sillyclaws.megabrainshackathonproject.webserver.models.MapRequest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@org.springframework.web.bind.annotation.RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class RestController {

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
            layers.add(new Layer("population", "Population Density", layersService.getPopulationLayerPoints()));
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
}
