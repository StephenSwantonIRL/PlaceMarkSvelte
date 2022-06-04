<script>
    import WelcomeMenu from "../../components/WelcomeMenu.svelte";
    import {push} from "svelte-spa-router";
    import {PlaceMarkService} from "../../services/placemark-service.js";
    import {getContext} from "svelte";
    import github from "../../assets/GitHub_Logo.png";

    const placeMarkService = getContext("PlaceMarkService")
    let email = ""
    let password = ""
    let errorMessage = "";

    async function login() {
        let success = await placeMarkService.authenticate({email: email, password: password})
        console.log("login function")
        console.log(success)
        if (success) {
            console.log("success")
            push("/dashboard");
        } else {
            email = "";
            password = "";
            errorMessage = "Invalid Credentials";
        }
    }

</script>

<WelcomeMenu/>
<section class="section">
    <h1 class="title">Log in</h1>
    <form on:submit|preventDefault={login}>
        <div class="field">
            <label class="label">Email</label> <input class="input" bind:value={email} type="text"
                                                      placeholder="Enter email" name="email">
        </div>
        <div class="field">
            <label class="label">Password</label> <input class="input" bind:value={password} type="password"
                                                         placeholder="Enter Password" name="password">
        </div>
        <div class="field is-grouped">
            <button id="submit" class="button is-link">Submit</button> <a href="{placeMarkService.placeMarkUrl}/auth" id="github" class="button is-inverted is-link">Log in with <img alt="Github" src={github} style="width:60px" class="is-small"></a>

        </div>
    </form>
</section>
{#if errorMessage}
    <div class="section">
        {errorMessage}
    </div>
{/if}