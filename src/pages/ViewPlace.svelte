<script>
    import {getContext} from "svelte";
    import ViewPageContents from "../../components/ViewPageContents.svelte";
    import Menu from "../../components/Menu.svelte";
    import Map from "../../components/Map.svelte"
    const placeMarkService = getContext("PlaceMarkService");


    export let params;
    let _id = params.id || "";

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

</script>
<Menu />
<Map bind:id={_id} />
<ViewPageContents bind:placeMark={placeMark} />