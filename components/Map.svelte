<script>
    import {LeafletMap} from '../services/leaflet-map';
    import {onMount, afterUpdate} from "svelte";
    import {getContext} from "svelte";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let id;
    export let mapType;
    export let mapId;
    export let zoomLevel;
    export let center;

    let mapObject;

    const initialZoom = zoomLevel;

    const placeMarkService = getContext("PlaceMarkService")

    function announceZoom(zoomLevel, center) {
        console.log(zoomLevel);
        dispatch("zoom", {
            text: zoomLevel,
            latlng: center,
            origin: mapId,
        })
    }

    export function moveTo(level,location){
        mapObject.moveTo(level,location);
    }

    onMount(async () => {
        const place = await placeMarkService.getPlace(id)
            .then((place) => {
                const mapConfig = {
                    location: {lat: place.latitude, lng: place.longitude},
                    zoom: initialZoom,
                    minZoom: 1,
                };
                const map = new LeafletMap(mapId, mapConfig, mapType);
                map.showZoomControl();
                map.showLayerControl();
                map.addMarker({lat: place.latitude, lng: place.longitude});
                map.on("zoomend", (e) => {announceZoom(map.getZoom(), map.getCenter())})
                mapObject = map;
            });
    });

</script>

<div class="box" id={mapId} style="height:250px">
</div>
