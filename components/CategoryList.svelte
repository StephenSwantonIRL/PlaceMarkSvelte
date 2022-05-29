<script>
  export let categories;
</script>

<section class="section">
  <h2 class="title is-5">All Categories</h2>
  <form id="category" method="POST" >
  <table class="table" style="width: 100%">
    <thead>
    <th>Name</th>
    <th></th>
    </thead>
    <tbody>
    {#if categories.length > 0}
    {#each categories as category}
      <tr>
        <td id="{category._id}">{category.name}</td>
        <td>
          <a class="button is-small" href="/category/{category._id}"> View </a>
          <a id="button-{category._id}" class="button is-small" onclick="editCategory('{category._id}')">
          Edit
        </a> <a class="button is-small" href="/deleteCategory/{category._id}">
          Delete
        </a></td>
      </tr>
    {/each}
      {/if}
    </tbody>
  </table>
  </form>
</section>


