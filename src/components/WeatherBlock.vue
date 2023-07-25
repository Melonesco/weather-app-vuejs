<script setup>
import {getWeekday, getMonth, getTime} from "../constants/index";


const props = defineProps({
  weatherInfo: {
    type: [Object, null],
    required: true
  },
})
</script>

<template>
  <div class="container">
    <div class="container-inner">
      <h2 class="container-title">{{ getWeekday(weatherInfo.dt_txt) }}</h2>
      <p class="container-date">{{ getMonth(weatherInfo.dt_txt) }}</p>
      <img class="container-img" src="./icons/sun.png" alt="img" />
      <p class="container-degree">{{ Math.round(weatherInfo.main.temp) + ' &deg;' + 'C' }}</p>
      <p class="container-time">{{ getTime(weatherInfo.dt_txt) }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 160px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 10px;
}

.container-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container-title {
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.container-date {
  font-size: 14px;
  color: #ffffff;
}

.container-degree {
  color: #ffffff;
  font-size: 20px;
  margin: 6px 0;
  font-weight: bold;
}

.container-time {
  color: #ffffff;
  font-size: 14px;
  letter-spacing: 1px;
}

.container-img {
  width: 80px;
  height: auto;
  object-fit: cover;
}
</style>
