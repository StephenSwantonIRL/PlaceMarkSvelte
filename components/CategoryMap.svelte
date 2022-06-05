<script>
    import {LeafletMap} from "../services/leaflet-map.js";
    import {onMount} from "svelte";

    export let layer;
    export let places;

    onMount(async () => {
        const mapConfig = {
            location: {lat: 0, lng: 50},
            zoom: 3,
            minZoom: 1,
        };
        const map = new LeafletMap("place-map", mapConfig);
        map.addLayerGroup(layer);
        map.showLayerControl();
        map.showZoomControl();

        function addPlaceMarker(place) {
            const label = `${place.name}`;
            map.addMarker({lat: place.latitude, lng: place.longitude}, label, layer);
        }

        places.forEach(place => {
            addPlaceMarker(place);
        });
    });

</script>

<div class="box" id="place-map" style="height:800px">
</div>