<script>
    import {getContext} from "svelte";
    import Menu from "../../components/Menu.svelte";
    import CategoryPlaceTable from "../../components/CategoryPlaceTable.svelte";
    import CategoryMap from "../../components/CategoryMap.svelte";

    export let params;
    let id = params.id || "";
    const placeMarkService = getContext("PlaceMarkService");
    let category = {}
    let places = []
    category.name = "";
    let request = placeMarkService.getCategory(id)
        .then((returnedCategory) => {
            category = returnedCategory
        })

    $: category = category
    $: places = retrievePlaces(category);
    $: console.log(places);


    async function retrievePlaces(category) {
        let placesArray = []
        if (category._id) {
            for (let i = 0; i < category.places.length; i += 1) {
                let place = await placeMarkService.getPlace(category.places[i])
                console.log(place);
                placesArray.push(place);
            }
            console.log(placesArray)
            return placesArray;
        }
        return [];
    }

</script>
<Menu/>

<section class="section header">
    <h1 class="title is-3">{category.name}</h1>
</section>

{#await places then places}
    <CategoryMap layer={category.name} places={places}/>
    <CategoryPlaceTable places={places}/>
{/await}

