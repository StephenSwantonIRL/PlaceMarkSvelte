<script>
    import {getContext} from "svelte";
    import ViewPageContents from "../../components/ViewPageContents.svelte";
    import Menu from "../../components/Menu.svelte";
    import Map from "../../components/Map.svelte"
    const placeMarkService = getContext("PlaceMarkService");


    export let params;
    let _id = params.id || "";
    let satellite = null;
    let transport = null;
    async function getPlace(id) {
        placeMark = await placeMarkService.getPlace(id);
        return placeMark;

    }

    let description ="";
    let placeMark = getPlace(_id)
        .then((x) => {
            return x;
        });
    $: console.log(placeMark)
    let errorMessage = "";

    function handleZoom(event){
        console.log(event.detail.latlng)
        if(event.detail.origin === "satelliteMap"){
            transport.moveTo(event.detail.text, event.detail.latlng);

        }
        if(event.detail.target === "transportMap"){
            satellite.moveTo(event.detail.text, event.detail.latlng);
        }
    }
    let zoomLevel = 8

</script>
<Menu />
<Map bind:id={_id} bind:this={satellite} on:zoom={handleZoom} bind:zoomLevel={zoomLevel} mapId="satelliteMap" mapType="Satellite" />
<Map bind:id={_id} bind:this={transport} on:zoom={handleZoom} bind:zoomLevel={zoomLevel} mapId="transportMap" mapType="Transport"/>
<ViewPageContents  bind:placeMark={placeMark} />