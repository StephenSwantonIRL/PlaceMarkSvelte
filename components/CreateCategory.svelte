<script>
  import {push} from "svelte-spa-router";
  import {getContext} from "svelte";

  const placeMarkService = getContext("PlaceMarkService");

  async function createCategory() {
    let category = {
      name: name,
    }
    let success = await placeMarkService.createCategory(category)
    console.log(success)
    if (success) {
      console.log("success")
      push("/admin");
    } else {
      console.log("Error, please check required fields.");
    }
  }
  let name ="";
</script>
<section class="section">
  <h2 class="title is-4">Category Management</h2>
  <h1 class="title is-5">Add a Category</h1>
  <form on:submit|preventDefault={createCategory}>
    <div class="field">
      <label class="label">Name</label> <input class="input" type="text" bind:value={name} placeholder="Enter Category Name" name="name">
    </div>
    <div class="field is-grouped">
      <button id="submit" class="button is-link">Add Category</button>
    </div>
  </form>
</section>
