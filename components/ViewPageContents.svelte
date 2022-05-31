<script>
    export let placeMark;
</script>

<section class="section header">
    <h2 class="title is-2" id="placeMarkName">{placeMark.name}</h2>
</section>

<section>
    <div class="container">
        <div class="label">Location</div>
        <div><h4 id="placeMarkLocation"></h4>{placeMark.location}</div>
    </div>
    <div class="container">
        <div class="label">Latitude</div>
        <div><p id="placeMarkLatitude">{placeMark.latitude}</p></div>
        <div>
            <div>
                <div class="label">Longitude</div>
                <div><p id="placeMarkLongitude">{placeMark.longitude}</p></div>
            </div>
        </div>
    </div>
    <div class="container"><h4 class="title is-4" style="padding-top:10px">About this PlaceMark</h4></div>
    <div class="container" id="placeMarkDescription">{@html placeMark.description}</div>
    <div class="container" id="placeMarkCategories">{placeMark.categories}</div>
    <div class="container" id="placeMarkImages" style="padding-top:10px;">
        {#if placeMark.images }
            {#if placeMark.images.length > 0 }
                {#each placeMark.images as image}
                    <img src={image} id={image} max-width="50%"
                         style="padding-left:10px; max-height:350px; border:solid 1px #B1A727"/>
                {/each}
            {/if}
        {/if}

    </div>
</section>
