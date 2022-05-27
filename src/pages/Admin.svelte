<script>
  import Menu from "../../components/Menu.svelte";
  import Analytics from "../../components/Analytics.svelte";
  import CreateCategory from "../../components/CreateCategory.svelte";
  import CategoryList from "../../components/CategoryList.svelte";
  import UserList from "../../components/UserList.svelte";
</script>

<Menu />
<section class="section header">
  <h1 class="title is-3">Admin Dashboard</h1>
</section>
<Analytics />
<CreateCategory/>
<CategoryList />
<UserList />
