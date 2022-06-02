<script>
    import Tags from 'svelte-tags-input'

    export let tag;
    export let tags;
    function handleTags(event) {
        tag = event.detail.tags;
    }
    export let categories;
</script>

<Tags
        on:tags={handleTags}
        tags={tags}
        addKeys={[9]}
        maxTags={5}
        allowPaste={true}
        allowDrop={true}
        splitWith={","}
        onlyUnique={true}
        removeKeys={[8]}
        placeholder={"Categories"}
        autoComplete={categories}
        name={"custom-name"}
        id={"custom-id"}
        allowBlur={true}
        disable={false}
        minChars={3}
        onlyAutocomplete
/>
