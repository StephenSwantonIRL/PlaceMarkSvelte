
<script>
    import 'leaflet/dist/leaflet.css';
    import {LeafletMap} from "../../services/leaflet-map.js";
    import {onMount} from "svelte";
    import {getContext} from "svelte";

    export let id;

    const placeMarkService = getContext("PlaceMarkService")


    onMount(async () => {
        const mapConfig = {
            location: {lat: 0, lng: 50},
            zoom: 3,
            minZoom: 1,
        };
        const map = new LeafletMap("place-map", mapConfig);
        function addPlaceMarker(place) {
            const label = `${place.name}`;
            map.addMarker({lat: place.latitude, lng: place.longitude}, label);
        }
        const places = await placeMarkService.getAllPlaces()
            .then((places) => {
                console.log(places);
                map.showZoomControl();
                map.showLayerControl();

                places.forEach(place => {
                    addPlaceMarker(place);
                });
            });
    });


</script>

<div class="box" id="place-map" style="height:800px">
</div>