<script>
    import {PlaceMarkService} from "../services/placemark-service.js";
    import {setContext} from "svelte";
    import {getContext} from "svelte";
    import {userStore} from "../stores/user.js";
    import {wrap} from 'svelte-spa-router/wrap'

    import EditPlace from "./pages/EditPlace.svelte";
    import About from "./pages/About.svelte";
    import Dashboard from "./pages/Dashboard.svelte";
    import Admin from "./pages/Admin.svelte";
    import Category from "./pages/Category.svelte";
    const title = "PlaceMark v2!";
    import Index from "./pages/Index.svelte";
    import SignUp from "./pages/SignUp.svelte";
    import Login from "./pages/Login.svelte";
    import EditUser from "./pages/EditUser.svelte";
    import CreatePlace from "./pages/CreatePlace.svelte";
    setContext("PlaceMarkService", new PlaceMarkService("http://localhost:4000"));

    import Router from "svelte-spa-router";

    const placeMarkService = getContext("PlaceMarkService");

    let routes = {
        "/": Index,
        "/signup": SignUp,
        "/login": Login,
        "/editAccount": EditUser,
        "/addPlace": CreatePlace,
        "/editPlace/:id": EditPlace,
        "/about": About,
        "/dashboard": Dashboard,
        '/admin': wrap({
            asyncComponent: () => import('./pages/Admin.svelte'),
            conditions: [
                async () => {
                    const response = await placeMarkService.getUser($userStore._id)
                    console.log(response)
                    if (response.isAdmin === true) {
                        return true
                    } else {
                        return false
                    }
                }
            ]
        }),
    "/category/:id": Category,

    }


</script>

<div class="container">
    <Router {routes}/>
</div>