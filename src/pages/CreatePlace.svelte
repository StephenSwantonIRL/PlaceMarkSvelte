<script>
    import {onMount} from "svelte";

    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";
    import PlaceMarkImages from "../../components/PlaceMarkImages.svelte";
    import Menu from "../../components/Menu.svelte";
    import CategoryTags from "../../components/CategoryTags.svelte";

    const placeMarkService = getContext("PlaceMarkService");

    let name = "";
    let location = "";
    let latitude = "";
    let longitude = "";
    let images = "";
    let errorMessage = "";
    let imagesInput = "";
    let tag;
    let tags =[];
    $: imagesInput = imagesInput


    async function createPlace() {
        let place = {
            name: name,
            location: location,
            latitude: latitude,
            longitude: longitude,
            description: document.getElementById('ck-description').value,
            categories: tag.join(","),
            images: imagesInput,
        }
        console.log(place)
        let success = await placeMarkService.createPlace(place)
        console.log(success)
        if (success) {
            console.log("success")
            push("/dashboard");
        } else {
            errorMessage = "Error, please check required fields.";
        }
    }

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
            categories= categories;
            return x;
        })

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

<Menu/>
<section class="section header">
    <h1 class="title">Add a PlaceMark</h1>
</section>
<section class="section">
    <form on:submit|preventDefault={createPlace}>
        <div class="field">
            <label class="label">Name</label> <input class="input" bind:value={name} type="text"
                                                     placeholder="Enter PlaceMark Name" name="name">
        </div>
        <div class="field">
            <label class="label">Location</label> <input class="input" bind:value={location} type="text"
                                                         placeholder="Enter Address" name="location">
        </div>
        <div class="field is-horizontal">
            <div class="field-body">
                <div class="field">
                    <input class="input" bind:value={latitude} type="text" placeholder="Enter latitude" name="latitude">
                </div>
                <div class="field">
                    <input class="input" bind:value={longitude} type="text" placeholder="Enter longitude"
                           name="longitude">
                </div>
            </div>
        </div>
        <div class="field">
            <label class="label">Description</label>
            <textarea id="ck-editor" placeholder="Tell us about this PlaceMark"></textarea>
            <div id="editor"></div>
            <input id="ck-description" name="description" type="hidden" value=""/>
        </div>
        <PlaceMarkImages bind:images={images} bind:imagesInput={imagesInput}/>
        <div class="field"><label class="label">Categories</label>
            {#if categories.length}
                <CategoryTags bind:categories bind:tags bind:tag/>
            {/if}
        <div class="field" id="categories"></div>
        <div class="field is-grouped">
            <button id="submit" class="button is-link">Add PlaceMark</button>
        </div>
    </form>
</section>
<section>

</section>
{#if errorMessage}
    <div class="section">
        {errorMessage}
    </div>
{/if}