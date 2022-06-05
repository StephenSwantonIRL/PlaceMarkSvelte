<script>
    import {PlaceMarkService} from "../services/placemark-service.js";
    import {setContext} from "svelte";
    import {getContext} from "svelte";
    import {userStore} from "../stores/user.js";
    import {wrap} from 'svelte-spa-router/wrap'

    import EditPlace from "./pages/EditPlace.svelte";
    import Dashboard from "./pages/Dashboard.svelte";
    import Admin from "./pages/Admin.svelte";
    import Category from "./pages/Category.svelte";
    import ViewPlace from "./pages/ViewPlace.svelte";
    import Map from "./pages/Map.svelte";

    const title = "PlaceMark v2!";
    import Index from "./pages/Index.svelte";
    import SignUp from "./pages/SignUp.svelte";
    import Login from "./pages/Login.svelte";
    import CreatePlace from "./pages/CreatePlace.svelte";

    setContext("PlaceMarkService", new PlaceMarkService("http://localhost:4000"));

    import Router, {replace} from "svelte-spa-router";
    import OAuth from "./pages/OAuth.svelte";
    import EditUser from "./pages/EditUser.svelte";

    const placeMarkService = getContext("PlaceMarkService");

    let routes = {
        "/": Index,
        "/signup": SignUp,
        "/login": Login,
        "/addPlace": wrap({
            component: CreatePlace,
            conditions: [
                async () => {
                    return await placeMarkService.checkToken();
                }]
        }),
        "/editPlace/:id": wrap({
            component: EditPlace,
            conditions: [
                async () => {
                    return await placeMarkService.checkToken();
                }]
        }),
        "/viewPlace/:id": wrap({
            component: ViewPlace,
            conditions: [
                async () => {
                    return await placeMarkService.checkToken();
                }]
        }),
        "/map": wrap({
            component: Map,
            conditions: [
                async () => {
                    return await placeMarkService.checkToken();
                }]
        }),
        "/dashboard": wrap({
            component: Dashboard,
            conditions: [
                async () => {
                    return await placeMarkService.checkToken();
                }]
        }),
        '/admin': wrap({
            asyncComponent: () => import('./pages/Admin.svelte'),
            conditions: [
                async () => {
                    return await placeMarkService.checkToken();
                },
                async () => {
                    const response = await placeMarkService.getUser($userStore._id)
                    if (response.isAdmin === true) {
                        return true
                    } else {
                        return false
                    }
                }
            ]
        }),
        "/category/:id": wrap({
            component: Category,
            conditions: [
                async () => {
                    return await placeMarkService.checkToken();
                }]
        }),
        "/auth/:id/:token": OAuth,
        "/github/:data": EditUser,

    }


    function conditionsFailed(event) {
        console.error('conditionsFailed event', event.detail)
        replace('/login')
    }


</script>

<div class="container">
    <Router {routes} on:conditionsFailed={conditionsFailed}/>
</div>