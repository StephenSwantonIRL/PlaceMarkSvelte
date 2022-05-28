<script>
  export let categories = []
</script>

<section class="section">
  <h2 class="title is-4">View by Category</h2>
  <div class="buttons">
    {#each categories as category }
      <a class="button" id="login" href="/category/{category._id}"> {category.name} </a>
    {/each}
  </div>
</section>