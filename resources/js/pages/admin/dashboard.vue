<template>
  <VRow>
    <VCol cols="12" md="12">
      <AnalyticsCongratulations />
    </VCol>
    <VCol cols="6" md="6">
      <canvas ref="chartRef"></canvas>
    </VCol>
  </VRow>
</template>

<script>
import AnalyticsCongratulations from "@/views/dashboard/AnalyticsCongratulations.vue";
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { onMounted, ref } from 'vue';

Chart.register(...registerables);

export default {
  components: {
    AnalyticsCongratulations,
  },
  setup() {
    const chartRef = ref(null);

    const fetchDataAndCreateChart = async () => {
      try {
        const response = await axios.get('https://disease.sh/v3/covid-19/continents');
        const data = response.data;

        const labels = data.map(item => item.continent);
        const cases = data.map(item => item.cases);

        const ctx = chartRef.value.getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              data: cases,
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'COVID-19 Cases by Continent'
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed !== null) {
                      label += context.parsed.toLocaleString();
                    }
                    return label;
                  }
                }
              }
            },
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    onMounted(() => {
      fetchDataAndCreateChart();
    });

    return {
      chartRef,
    };
  }
};
</script>
