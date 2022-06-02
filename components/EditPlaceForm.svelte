<script>
    import {onMount} from "svelte";
    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";
    import PlaceMarkImages from "./PlaceMarkImages.svelte";
    import DescriptionField from "./DescriptionField.svelte";
    import CategoryTags from "./CategoryTags.svelte";

    const placeMarkService = getContext("PlaceMarkService");
    export let place;
    export let imagesInput;
    export let categories;
    let images = "";
    let tag ="";
    let tags = [];
    let flag = false;
    if(place.categories) {
        console.log(place.categories)
        if(place.categories.length === 0) {
            flag= true;
        }
        for (let i = 0; i < place.categories.length; i += 1) {
            console.log(place.categories[i].name);
            tags.push(place.categories[i].name);
            if (i == place.categories.length - 1) {
                flag = true;
            }
        }
    }
    console.log("categories" + place.categories);
    let render = "nothing"
    $: imagesInput = imagesInput

    async function updatePlace() {
        let categoryValue;
        if(typeof(tag)==="string") {
            categoryValue = tags.join(",");
        } else {
            categoryValue = tag.join(",");
        }
        console.log(categoryValue)
        let updatedPlace = {
            _id: place._id,
            name: place.name,
            location: place.location,
            latitude: place.latitude,
            longitude: place.longitude,
            description: document.getElementById('ck-description').value,
            categories: categoryValue,
            images: imagesInput,
        }
        console.log(updatedPlace)
        let success = await placeMarkService.updatePlace(updatedPlace)
        console.log(success)
        if (success) {
            console.log("success")
            push("/dashboard");
        } else {
            errorMessage = "Error, please check required fields.";
        }
    }


</script>

<section class="section">
    <form on:submit|preventDefault={updatePlace}>
        <div class="field">
            <label class="label">Name</label> <input class="input" type="text" placeholder="Enter PlaceMark Name"
                                                     name="name" bind:value={place.name}>
        </div>
        <div class="field">
            <label class="label">Location</label> <input class="input" type="text" placeholder="Enter Address"
                                                         name="location" bind:value={place.location}>
        </div>
        <div class="field is-horizontal">
            <div class="field-body">
                <div class="field">
                    <input class="input" type="text" placeholder="Enter latitude" name="latitude"
                           bind:value={place.latitude}>
                </div>
                <div class="field">
                    <input class="input" type="text" placeholder="Enter longitude" name="longitude"
                           bind:value={place.longitude}>
                </div>
            </div>
        </div>
        {#if place.description }
        <DescriptionField description={place.description}/>
        {/if}
        <PlaceMarkImages bind:images={place.images} bind:imagesInput={imagesInput}/>
        <div class="field"><label class="label">Categories</label>
            {#if categories.length >0}
            <CategoryTags bind:categories bind:tags bind:tag/>
            {/if}
        <div class="field" id="categories"></div>
        <div class="field is-grouped">
            <button class="button is-link">Save Changes</button>
        </div>
    </form>
</section>
