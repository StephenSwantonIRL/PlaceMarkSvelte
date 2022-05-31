<script>
    import {onMount} from "svelte";
    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";
    import PlaceMarkImages from "./PlaceMarkImages.svelte";

    const placeMarkService = getContext("PlaceMarkService");
    export let place;
    export let imagesInput;
    let images = "";


    let render = "nothing"
    $: imagesInput = imagesInput

    async function updatePlace() {
        let updatedPlace = {
            _id: place._id,
            name: place.name,
            location: place.location,
            latitude: place.latitude,
            longitude: place.longitude,
            description: document.getElementById('ck-description').value,
            categories: place.categories.toString(),
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

    onMount(() => {
            ClassicEditor
                .create(document.querySelector('#ck-editor'))
                .then(() => {
                    let c = document.querySelector(".ck-editor__main");
                    c.setAttribute('onfocusout', 'storeDescription()')

                })
                .catch(error => {
                    console.error(error);
                });
        }
    )

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
        <div class="field">
            <label class="label">Description</label>
            <textarea id="ck-editor" placeholder="Tell us about this PlaceMark"> {place.description} </textarea>
            <input id="ck-description" name="description" type="hidden" bind:value="{place.description}"/>
        </div>
        <PlaceMarkImages bind:images={place.images} bind:imagesInput={imagesInput}/>
        <div class="field"><label class="label">Categories</label>
            <input id="input-custom-dropdown" name="categories" type="text" class="input" placeholder="Enter Categories"
                   bind:value={place.categories}></div>
        <div class="field" id="categories"></div>
        <div class="field is-grouped">
            <button class="button is-link">Save Changes</button>
        </div>
    </form>
</section>
