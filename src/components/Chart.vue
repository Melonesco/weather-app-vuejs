<script setup>
import { Chart, registerables } from 'chart.js'
import { onMounted, ref } from 'vue'
import moment from 'moment'

const props = defineProps({
  weatherInfo: {
    type: Object,
    required: true
  },
  formatTimestampWithoutSeconds: {
    type: Function,
    required: true
  }
})

const labels = ref([])
const data = ref(null)

onMounted(() => {
  const formatTimestampWithoutSeconds = (timestamp) =>
    moment(timestamp, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')

  const temperatures = props.weatherInfo.list.slice(0, 8).map((item) => item.main.temp)
  const labelsData = props.weatherInfo.list
    .slice(0, 8)
    .map((item) => formatTimestampWithoutSeconds(item.dt_txt))

  labels.value = labelsData
  data.value = {
    labels: labelsData,
    datasets: [
      {
        label: 'Temperature',
        data: temperatures,
        backgroundColor: 'white',
        borderColor: 'green',
        borderWidth: 3
      }
    ]
  }

  const ctx = document.getElementById('myChart')
  Chart.register(...registerables)
  new Chart(ctx, {
    type: 'line',
    data: data.value,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Temperature diagram',
          font: {
            size: 32
          }
        },
        customCanvasBackgroundColor: {
          color: 'red'
        },
        legend: {
          display: false
        }
      }
    }
  })
})
</script>

<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<style></style>
