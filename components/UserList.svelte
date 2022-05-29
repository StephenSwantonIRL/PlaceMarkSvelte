<script>
    export let users;
</script>

<section class="section">
    <h2 class="title is-4">User Management</h2>
    <form id="category" method="POST">
        <table class="table" style="width: 100%">
            <thead>
            <th>Name</th>
            <th></th>
            </thead>
            <tbody>
            {#if users.length > 0}
                {#each users as user}
                    <tr>
                        <td id="{user._id}">{user.firstName} {user.lastName}</td>
                        <td>
                            {#if user.isAdmin }<a id="button-{user._id}" class="button is-small"
                                                  href="/revokeAdmin/{user._id}">
                                Revoke Admin
                            </a> {:else}
                                <a id="button-{user._id}" class="button is-small" href="/makeAdmin/{user._id}">
                                    Make Admin
                                </a>
                            {/if}
                            <a class="button is-small" href="/deleteUser/{user._id}">
                                Delete
                            </a></td>
                    </tr>
                {/each}
            {/if}
            </tbody>
        </table>
    </form>
</section>