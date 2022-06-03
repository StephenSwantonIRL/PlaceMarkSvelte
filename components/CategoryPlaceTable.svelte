<script>
    export let places;

</script>
<section class="section">
    <table class="table" style="width: 100%">
        <thead>
        <th>Name</th>
        <th>Location</th>
        <th>Lat</th>
        <th>Long</th>
        <th></th>
        </thead>
        <tbody>
        {#each places as place}
            <tr>
                <td>{place.name}</td>
                <td>{place.location}</td>
                <td>{place.latitude}</td>
                <td>{place.longitude}</td>
                <td><a class="button is-small" href="/#/viewPlace/{place._id}">
                    View
                </a>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</section>