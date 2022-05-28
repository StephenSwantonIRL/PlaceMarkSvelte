<script>
    import CategoryButtons from "../../components/CategoryButtons.svelte";
    import Menu from "../../components/Menu.svelte";
    import {getContext} from "svelte";
    import {userStore} from "../../stores/user.js";

    const placeMarkService = getContext("PlaceMarkService");

    async function getAllPlaces() {
        places = await placeMarkService.getAllPlaces();
        return places;
    }

    async function getAllCategories() {
        let allCategories = await placeMarkService.getAllCategories();
        return allCategories;
    }

    let myPlaceMarks = [];
    let othersPlaceMarks = []
    let categories = []

    getAllCategories()
        .then((x) => {
            for (let i = 0; i < x.length; i += 1) {
                categories.push(x[i]);
            }
            return x;
        })

    let places = getAllPlaces()
        .then((x) => {
            let placeMarks = sortPlaces();
            myPlaceMarks = placeMarks[0];
            othersPlaceMarks = placeMarks[1];
            return x;
        })

    function sortPlaces() {
        myPlaceMarks = []
        if (places) {
            for (let i = 0; i < places.length; i += 1) {
                if (places[i].createdBy === $userStore._id) {
                    myPlaceMarks.push(places[i]);
                } else {
                    othersPlaceMarks.push(places[i]);
                }
            }
        }
        return [myPlaceMarks, othersPlaceMarks];
    }

   async function checkAdmin(){
        const response = await placeMarkService.getUser($userStore._id);
        return Boolean(response.isAdmin);
    }

    let isAdmin;
    let adminCheck = checkAdmin().then((x) => {
        isAdmin = x;
        return x;
    });

    $: console.log({isAdmin})
</script>

<Menu isAdmin=true />

<section class="section header">
    <h1 class="title is-3">Dashboard</h1>
</section>
{#if categories.length > 0}
    <CategoryButtons bind:categories={categories}/>
{/if}
<section class="section">
    <h2 class="title is-4">My PlaceMarks</h2>
    <table class="table" style="width: 100%">
        <thead>
        <th>Name</th>
        <th>Location</th>
        <th>Lat</th>
        <th>Long</th>
        <th></th>
        </thead>
        <tbody>
        {#each myPlaceMarks as placeMark}
            <tr>
                <td>{placeMark.name}</td>
                <td>{placeMark.location}</td>
                <td>{placeMark.latitude}</td>
                <td>{placeMark.longitude}</td>
                <td>
                    <button class="button is-small" onclick="openModal('{placeMark._id}')">
                        View
                    </button>
                    <a class="button is-small" href="/editPlace/{placeMark._id}">
                        Edit
                    </a> <a class="button is-small" href="/deletePlace/{placeMark._id}">
                    Delete
                </a>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</section>
<section class="section">
    <h2 class="title is-4">All PlaceMarks</h2>
    <table class="table" style="width: 100%">
        <thead>
        <th>Name</th>
        <th>Location</th>
        <th>Lat</th>
        <th>Long</th>
        <th></th>
        </thead>
        <tbody>
        {#each othersPlaceMarks as placeMark}
            <tr>
                <td>{placeMark.name}</td>
                <td>{placeMark.location}</td>
                <td>{placeMark.latitude}</td>
                <td>{placeMark.longitude}</td>
                <td>
                    <button class="button is-small" onclick="openModal('{placeMark._id}')">
                        View
                    </button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</section>
<dialog id="modal-dialog">
    <section class="section header"><h2 class="title is-2" id="placeMarkName"></h2></section>
    <div class="container">
        <div class="label">Location</div>
        <div><h4 id="placeMarkLocation"></h4></div>
    </div>
    <div class="container">
        <div class="label">Latitude</div>
        <div><p id="placeMarkLatitude"></p></div>
        <div>
            <div>
                <div class="label">Longitude</div>
                <div><p id="placeMarkLongitude"></p></div>
            </div>
        </div>
    </div>
    <div class="container"><h4 class="title is-4" style="padding-top:10px">About this PlaceMark</h4></div>
    <div class="container" id="placeMarkDescription"></div>
    <div class="container" id="placeMarkCategories"></div>
    <div class="container" id="placeMarkImages" style="padding-top:10px;"></div>
    <p><a onclick="closeModal()">Close</a></p>
</dialog>

