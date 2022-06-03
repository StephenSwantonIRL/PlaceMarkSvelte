<script>
    import 'leaflet/dist/leaflet.css';
    import {LeafletMap} from "../services/leaflet-map.js";
    import {onMount} from "svelte";
    import {getContext} from "svelte";

    const placeMarkService = getContext("PlaceMarkService");
    export let data;
    onMount(async () => {

        const mapConfig = {
            location: {lat: 0, lng: 50},
            zoom: 3,
            minZoom: 1,
        };

        const map = new LeafletMap("place-map", mapConfig);
        console.log(data.categoryNames);
        data.categoryNames.forEach(layer => map.addLayerGroup(layer));
        map.showZoomControl();
        map.showLayerControl();

        function addPlaceMarkerExtended(place, layer) {
            const label = `${place.name}`;
            map.addMarker({lat: place.latitude, lng: place.longitude}, label, layer);
        }

        data.placesWithCategory.forEach(placeDetails => {
            let request = placeMarkService.getPlace(placeDetails.place)
                .then((place) => {
                    addPlaceMarkerExtended(place, placeDetails.name);
                })
        });
    });

</script>

<div class="box" id="place-map" style="height:800px">
</div>