<script>
    import {onMount} from "svelte";
    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";
    import EditPlaceForm from "../../components/EditPlaceForm.svelte";
    import Menu from "../../components/Menu.svelte";


    export let params;
    let _id = params.id || "";
    let name = "";
    let location = "";
    let latitude = "";
    let longitude = "";
    let images = "";
    let imagesInput;
    const placeMarkService = getContext("PlaceMarkService");

    async function getPlace(id) {
        place = await placeMarkService.getPlace(id);
        return place;

    }

    let description = "";
    let place = getPlace(_id)
        .then((x) => {
            if (place.images) {
                imagesInput = place.images.join(',') + ','
                return x;
            }
        });
    $: console.log(place)
    let errorMessage = "";

    async function getAllCategories() {
        let allCategories = await placeMarkService.getAllCategories();
        return allCategories;
    }

    let categories = []

    getAllCategories()
        .then((x) => {
            for (let i = 0; i < x.length; i += 1) {
                categories.push(x[i].name);
            }
            categories = categories;
            return x;
        })
</script>
<Menu/>
<section class="section header">
    <h1 class="title">Edit PlaceMark</h1>
</section>
{#if categories.length>0}

<EditPlaceForm bind:place={place} bind:imagesInput bind:categories />
{/if}
