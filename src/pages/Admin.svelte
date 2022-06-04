<script>
    import _ from "lodash";
    import {userStore} from "../../stores/user.js";
    import {PlaceMarkService} from "../../services/placemark-service.js";
    import {getContext} from "svelte";
    import Chart from "../../components/Chart.svelte"
    import Menu from "../../components/Menu.svelte";
    import Analytics from "../../components/Analytics.svelte";
    import CreateCategory from "../../components/CreateCategory.svelte";
    import CategoryList from "../../components/CategoryList.svelte";
    import UserList from "../../components/UserList.svelte";

    const placeMarkService = getContext("PlaceMarkService");

    async function checkAdmin() {
        const response = await placeMarkService.getUser($userStore._id);
        return Boolean(response.isAdmin);
    }

    let isAdmin;
    let adminCheck = checkAdmin().then((x) => {
        isAdmin = x;
        return x;
    });
    let adminValue
    $: adminValue = {isAdmin}['isAdmin']

    async function getAllUsers() {
        users = await placeMarkService.getAllUsers();
        return users;
    }

    async function getAllPlaces() {
        places = await placeMarkService.getAllPlaces();
        return places;
    }

    async function getAllCategories() {
        categories = await placeMarkService.getAllCategories();
        return categories;
    }

    let users = getAllUsers();
    let places = getAllPlaces()
        .then((places) => {
            places.forEach(place => {
                placeArray.push(place);
            })
            placeArray = placeArray;
            for (let i = 0; i < users.length; i += 1) {
                placeCount = placeArray.filter((place) => place.createdBy == users[i]._id.toString())
                userCounts.push({firstName: users[i].firstName, lastName: users[i].lastName, count: placeCount.length});
            }
            topCounts = _.orderBy(userCounts, "count", "desc").slice(0, 5)
            return places;
        });

    let placeArray = [];
    let categories = getAllCategories();
    let uncategorisedPlaces = 0;
    let categorisedPlaces = 0;

    let avgPlacesPerUser = 1;
    let avgPlacesPerCategory = 1;
    $: avgPlacesPerUser = ({places} && {users}) ? (places.length / users.length).toFixed(2) : avgPlacesPerUser;
    $: avgPlacesPerCategory = ({places} && {categories}) ? (places.length / categories.length).toFixed(2) : avgPlacesPerCategory;

    $: if (placeArray.length > 0 && categories.length > 0) {
        uncategorisedPlaces = 0
        placeArray.forEach(place => {
            let found = categories.filter((category) => category.places.includes(place._id.toString()));
            console.log(found.length > 0);
            if (found.length > 0) {
                uncategorisedPlaces = uncategorisedPlaces;
            } else {
                uncategorisedPlaces = uncategorisedPlaces + 1
            }
        })
    } else {
        uncategorisedPlaces;
    }


    let userCounts = []
    let topCounts = []
    let placeCount;
    let totalCategories = 0;
    let totalUsers = 0;
    let totalPlaces = 0;
    let categoryData = [];
    $: totalCategories = categories.length;
    $: totalUsers = users.length;
    $: totalPlaces = places.length;
    $: categorisedPlaces = totalPlaces - uncategorisedPlaces;

    $: if (categorisedPlaces && uncategorisedPlaces) {
        categoryData = [];
        categoryData.push({label: "Not Categorised", value: uncategorisedPlaces});
        categoryData.push({label: "Categorised", value: categorisedPlaces});
        console.log(categoryData);
    }

</script>

<Menu isAdmin={adminValue}/>
<section class="section header">
    <h1 class="title is-3">Admin Dashboard</h1>
</section>
<Chart chartTitle="Top Contributors" chartLabel="firstName" chartValue="count" bind:chartData={topCounts} type="bar"/>
<Chart chartTitle="Categorised Places" chartLabel="label" chartValue="value" bind:chartData={categoryData} type="pie"/>
<Analytics bind:totalCategories bind:totalUsers bind:totalPlaces bind:avgPlacesPerUser bind:avgPlacesPerCategory
           bind:topCounts/>
<CreateCategory/>
<CategoryList bind:categories/>
<UserList bind:users/>
