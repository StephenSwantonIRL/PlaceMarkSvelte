<script>
    import {onMount} from "svelte";

    export let description;
    onMount(() => {
            ClassicEditor
                .create(document.querySelector('#ck-editor'))
                .then((editor) => {
                    let c = document.querySelector(".ck-editor__main");
                    c.setAttribute('onfocusout', 'storeDescription()')
                    editor.setData(description);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    )


</script>


<div class="field">
    <label class="label">Description</label>
    <textarea id="ck-editor" placeholder="Tell us about this PlaceMark"> {description} </textarea>
    <input id="ck-description" name="description" type="hidden" bind:value="{description}"/>
</div>