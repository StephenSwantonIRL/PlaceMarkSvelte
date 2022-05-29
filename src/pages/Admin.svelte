<script>
  import {userStore} from "../../stores/user.js";
  import {PlaceMarkService} from "../../services/placemark-service.js";
  import {getContext} from "svelte";
  import Menu from "../../components/Menu.svelte";
  import Analytics from "../../components/Analytics.svelte";
  import CreateCategory from "../../components/CreateCategory.svelte";
  import CategoryList from "../../components/CategoryList.svelte";
  import UserList from "../../components/UserList.svelte";

  const placeMarkService = getContext("PlaceMarkService");

  async function checkAdmin(){
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
  $: console.log(adminValue);


  async function getAllUsers(){
    users = await placeMarkService.getAllUsers();
    return users;
  }
  let users = getAllUsers();

  async function getAllCategories(){
    categories = await placeMarkService.getAllCategories();
    return categories;
  }
  let categories = getAllCategories()


</script>

<Menu isAdmin={adminValue} />
<section class="section header">
  <h1 class="title is-3">Admin Dashboard</h1>
</section>
<Analytics />
<CreateCategory/>
<CategoryList bind:categories={categories} />
<UserList bind:users={users} />
