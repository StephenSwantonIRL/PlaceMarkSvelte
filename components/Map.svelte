
<script>
    import 'leaflet/dist/leaflet.css';
    import {LeafletMap} from '../services/leaflet-map';
    import {onMount} from "svelte";
    import {getContext} from "svelte";

    export let id;

    const placeMarkService = getContext("PlaceMarkService")

    onMount(async () => {
        const place = await placeMarkService.getPlace(id)
            .then((place) => {
                const mapConfig = {
                    location: {lat: place.latitude, lng: place.longitude},
                    zoom: 8,
                    minZoom: 1,
                };
                const map = new LeafletMap("place-map", mapConfig);
                map.showZoomControl();
                map.showLayerControl();
                map.addMarker({lat: place.latitude, lng: place.longitude});
        });
    });
</script>

<div class="box" id="place-map" style="height:250px">
</div>