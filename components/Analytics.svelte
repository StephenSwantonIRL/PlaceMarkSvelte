<script>
  export let totalCategories;
  export let totalUsers;
  export let totalPlaces;
  export let avgPlacesPerCategory;
  export let avgPlacesPerUser;
  export let topCounts;
</script>

<section class="section">
  <h4 class="is-4 title">Site Statistics</h4>
  <div class="columns">
    <div class="column">
      <h5 class="title is-5">Totals</h5>
        <ul>
          <li>Categories: {totalCategories}</li>
          <li>Users: {totalUsers}</li>
          <li>Places: {totalPlaces}</li>
        </ul>
    </div>
    <div class="column">
      <h5 class="title is-5">Averages</h5>
      <ul>
      <li>Places per Category: {avgPlacesPerCategory}</li>
      <li>Places per User: {avgPlacesPerUser}</li>
      </ul>
    </div>
    <div class="column">
      <h5 class="title is-5">Top Contributors</h5>
      <ul>
      {#each topCounts as topCount}
        <li>{topCount.firstName} {topCount.lastName}: {topCount.count} places</li>
      {/each}
      </ul>
    </div>
  </div>
</section>