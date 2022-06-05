<script>
    import {LeafletMap} from "../../services/leaflet-map.js";
    import {onMount} from "svelte";
    import {getContext} from "svelte";
    import Menu from "../../components/Menu.svelte";
    import CategoryLayeredMap from "../../components/CategoryLayeredMap.svelte";

    const placeMarkService = getContext("PlaceMarkService")

    async function assignCategoryNameToPlaces() {

        let data = await placeMarkService.getAllCategories()
            .then((categories) => {
                let categoryNames = [];
                let placesWithCategory = [];
                categories.forEach(category => {
                    categoryNames.push(category.name);
                    category.places.forEach(place => {
                        name = category.name
                        placesWithCategory.push({place, name})
                    })
                });
                console.log("CategoryNames " + categoryNames)
                console.log(placesWithCategory)
                return {categoryNames, placesWithCategory}
            })
        return data
    }

    let data = assignCategoryNameToPlaces();

    let mapdata = {};
    $: mapdata = data;

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
{#await data then data}
<CategoryLayeredMap data={data} />
{/await}