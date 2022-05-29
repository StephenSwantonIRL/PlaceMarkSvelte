<script>
    import Chart from "svelte-frappe-charts"
    import {onMount} from "svelte";

    export let topCounts;
    $: console.log({topCounts});
    let labels = [];
    let values = [];

    function updateChart(topCounts) {
        let labels = [];
        let values = [];
        topCounts.forEach((record) => (labels.push(record.firstName)));
        topCounts.forEach((record) => (values.push(record.count)));
        data = {
            labels: labels,
            datasets: [
                {
                    values: values,
                }
            ]
        }
    }

    $: if({topCounts}) {updateChart(topCounts)};

    let data = {
        labels: labels,
        datasets: [
            {
                values: values,
            }
        ]
    }

</script>

<Chart bind:data type="bar" />
