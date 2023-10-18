<template>
  <div class="w-full h-72">
    <canvas id="chart"></canvas>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { onMounted } from 'vue'

const props = defineProps({
  chartData: {
    type: Array,
    required: true
  }
})
const chartLabels = props.chartData.map((item) => item.timeValue)
const chartItems = props.chartData.map((item) => Math.round(item.temp))
onMounted(() => {
  const ctx = document.getElementById('chart').getContext('2d')
  const weatherChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: '°C',
          data: chartItems,
          backgroundColor: '#EAB308'
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  })
  weatherChart
})
</script>
