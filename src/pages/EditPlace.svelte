<script>
    import {onMount} from "svelte";
    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";
    import PlaceMarkImgHandler from "../../components/PlaceMarkImgHandler.svelte";
    import EditPlaceForm from "../../components/EditPlaceForm.svelte";
    import Menu from "../../components/Menu.svelte";


    export let params;
    let _id = params.id || "";
    let name = "";
    let location = "";
    let latitude = "";
    let longitude = "";
    let categories = "";
    let images = "";

    const placeMarkService = getContext("PlaceMarkService");

    async function getPlace(id) {
        place = await placeMarkService.getPlace(id);
        return place;

    }
    let description ="";
    let place = getPlace(_id)
        .then((x) => {
            return x;
        });
    $: console.log(place)
    let errorMessage = "";




</script>
<Menu />
<section class="section header">
    <h1 class="title">Edit PlaceMark</h1>
</section>
<EditPlaceForm bind:place={place} />

<PlaceMarkImgHandler/>
