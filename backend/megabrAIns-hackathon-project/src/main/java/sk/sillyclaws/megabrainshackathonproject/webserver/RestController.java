package sk.sillyclaws.megabrainshackathonproject.webserver;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.sillyclaws.megabrainshackathonproject.services.LayersService;
import sk.sillyclaws.megabrainshackathonproject.webserver.models.Layer;

import java.util.ArrayList;
import java.util.List;

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
            @RequestParam(defaultValue = "false") boolean social,
            @RequestParam(defaultValue = "false") boolean culture,
            @RequestParam(defaultValue = "false") boolean acceptance
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
        if (acceptance) {
            layers.add(new Layer("acceptance", "User Based Score", layersService.getUserAcceptanceLayer()));
        }

        return ResponseEntity.ok(layers);
    }


    @GetMapping("/ping")
    public String ping() {
        return "Backend is working!";
    }
}
