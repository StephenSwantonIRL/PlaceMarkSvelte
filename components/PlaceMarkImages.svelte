<script>
    import {getContext} from "svelte";

    export let images;
    export let imagesInput;
    const placeMarkService = getContext("PlaceMarkService");

    function uploadImage() {
        const formData = new FormData();
        const fileInput = document.querySelector(".file-input");
        formData.append('imagefile', fileInput.files[0]);

        placeMarkService.uploadImage(formData)
            .then((data) => {
                var container = document.getElementById("image-container");
                var img1 = document.createElement("img");
                img1.setAttribute("src", data.url)
                img1.setAttribute("id", data.url)
                img1.setAttribute("width", "30%")
                img1.setAttribute("onclick", "removeImage('" + data.url + "')")
                img1.setAttribute("style", "padding-left:10px")
                container.append(img1)

                imagesInput = imagesInput + data.url + ","
                console.log(document.getElementById('images').value)
                imagesInput = imagesInput;
            })
            .catch(error => console.log(error));

    }

    async function removeImage(url) {
        console.log(url);
        imagesInput = imagesInput.replace(url + ',', '');
        let cloudinaryId = url.match(/\/([a-zA-Z0-9]*)\.(?:jpeg|jpg|png)/)[1]
        const remove = await placeMarkService.deleteImage(cloudinaryId)
        console.log(remove)
        document.getElementById(url).remove();
    }

</script>

<div class="field">
    <div>
        <div>
            <label class="label">Add Images</label>
            <div id="image-container">
                {#if images}
                    {#each images as image}
                        <img id="{image}" src="{image}" on:click={removeImage.bind(this, image)} width="30%"
                             style="padding-left:10px"/>
                    {/each}
                {/if}
            </div>
        </div>
        <div class="card-content">
            <div id="file-select" class="file has-name is-fullwidth">
                <label class="file-label"> <input class="file-input" type="file" accept="image/png, image/jpeg">
                    <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
           </span>
                    <span class="file-name"></span>
                </label>
                <a style="margin-left:10px;" on:click={uploadImage} class="button is-primary ">Upload</a>
            </div>
        </div>
    </div>
</div>
<div class="field"><input type="hidden" id="images" name="images" bind:value={imagesInput}></div>
