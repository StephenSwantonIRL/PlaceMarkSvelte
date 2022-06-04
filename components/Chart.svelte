<script>
    import Chart from "svelte-frappe-charts"

    export let chartLabel;
    export let chartValue;
    export let chartData;
    export let type;
    export let chartTitle;
    let labels = [];
    let values = [];

    function updateChart(chartData) {
        let labels = [];
        let values = [];
        chartData.forEach((record) => (labels.push(record[chartLabel])));
        chartData.forEach((record) => (values.push(record[chartValue])));
        data = {
            labels: labels,
            datasets: [
                {
                    values: values,
                }
            ]
        }
    }

    $: if({chartData}) {updateChart(chartData)};

    let data = {
        labels: labels,
        datasets: [
            {
                values: values,
            }
        ]
    }

</script>

<h3 class="is-3 is-title">{chartTitle} </h3>
<Chart bind:data type={type} />
