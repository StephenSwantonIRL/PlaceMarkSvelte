<script>
  import CreatePlace from "./pages/CreatePlace.svelte";

  const title = "PlaceMark v2!";
  import Index from "./pages/Index.svelte";
  import SignUp from "./pages/SignUp.svelte";
  import Login from "./pages/Login.svelte";
  import EditUser from "./pages/EditUser.svelte";
  import Router from "svelte-spa-router";

  let routes = {
      /* Place holder route structure */
     "/": Index,
     "/signup": SignUp,
     "/login": Login,
      "/editAccount": EditUser,
      "/addPlace": CreatePlace,
      /* "/editPlace/:id": EditPlace, */
      "/about": About,
      "/dashboard": Dashboard,
      "/admin": Admin,
      "/category/:id": Category,

  }


  import {PlaceMarkService} from "../services/placemark-service.js";
  import {setContext} from "svelte";
  import {getContext} from "svelte"
  // import EditPlace from "./pages/EditPlace.svelte";
  import About from "./pages/About.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import Admin from "./pages/Admin.svelte";
  import Category from "./pages/Category.svelte";

  setContext("PlaceMarkService", new PlaceMarkService("http://localhost:4000"));



</script>

<div class="container">
    <Router {routes}/>
</div>