<script setup>
import { getWeekday, getMonth, getTime } from '../constants/index'
import Chart from './Chart.vue'
import Loader from './Loader.vue'

const props = defineProps({
  weatherInfo: {
    type: [Object, null],
    required: true
  },
  chartStatus: {
    type: Boolean,
    required: false
  },
  loading: {
    type: Boolean
  }
})

const formatTimestampWithoutSeconds = (timestamp) => {
  const date = new Date(timestamp * 1000)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
}
</script>

<template>
  <div v-if="loading" class="loader-container">
    <Loader />
  </div>
  <div v-else class="card">
    <div class="card__container">
      <h2 class="card__container-title">{{ getWeekday(weatherInfo?.list[0].dt_txt) }}</h2>
      <p class="card__container-date">{{ getMonth(weatherInfo?.list[0].dt_txt) }}</p>
      <img class="card__container-img" src="./icons/sun.png" alt="img" />
      <p class="card__container-time">Weather at {{ getTime(weatherInfo?.list[0].dt_txt) }}</p>
    </div>
    <div class="card__blocks">
      <h2 class="card-text">{{ weatherInfo?.city.name }}, {{ weatherInfo?.city.country }}</h2>
      <hr />
      <h2 class="card-text">
        {{ Math.round(weatherInfo?.list[0].main.temp) + ' &deg;' + 'C' }}
      </h2>
      <hr />
      <h2 class="card-text">{{ weatherInfo?.list[0].weather[0].main }}</h2>
    </div>
    <div class="card__blocks">
      <div class="card__block">
        <img class="card-icon" src="./icons/high-temperature.png" alt="img" />
        <p class="card-text text">
          feels like: {{ Math.round(weatherInfo?.list[0].main.feels_like) + ' &deg;' + 'C' }}
        </p>
      </div>
      <div class="card__block">
        <img class="card-icon" src="./icons/wind.png" alt="img" />
        <p class="card-text text">wind: {{ weatherInfo?.list[0].wind.speed }} m/sec</p>
      </div>
      <div class="card__block">
        <img class="card-icon" src="./icons/cloud.png" alt="img" />
        <p class="card-text text">{{ weatherInfo?.list[0].weather[0].description }}</p>
      </div>
      <div class="card__block">
        <img class="card-icon" src="./icons/sunrise.png" alt="img" />
        <p class="card-text text">
          sunrise: {{ formatTimestampWithoutSeconds(weatherInfo?.city.sunrise) }} sunset:
          {{ formatTimestampWithoutSeconds(weatherInfo?.city.sunset) }}
        </p>
      </div>
    </div>
  </div>
  <!--  <div class="card-chart">-->
  <!--    <Chart-->
  <!--      :weatherInfo="weatherInfo"-->
  <!--      :formatTimestampWithoutSeconds="formatTimestampWithoutSeconds"-->
  <!--    />-->
  <!--  </div>-->
</template>

<style scoped>
.card {
  position: relative;
  background-color: darkslateblue;
  display: flex;
  gap: 40px;
  margin: 40px 20px 20px 20px;
  border-radius: 4px;
}

.card__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card__container-title {
  color: #ffffff;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 6px;
}

.card__container-date {
  font-size: 18px;
  color: #ffffff;
}

.card__container-time {
  color: #ffffff;
  font-size: 16px;
  letter-spacing: 1px;
}

.card__container-img {
  width: 200px;
  height: auto;
  object-fit: cover;
}

.card__blocks {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  padding: 10px 20px;
  width: 500px;
}

.card__blocks:last-child {
  width: 100%;
  text-align: left;
}

.card__block {
  display: flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-icon {
  width: 24px;
}

.card-text {
  color: #ffffff;
  font-weight: bold;
}

.card-chart {
  z-index: -1;
  background-color: rgba(255, 255, 255, 0.8);
}

.loader-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

@media (max-width: 1020px) {
  .card {
    gap: 40px;
  }

  .card__container-title {
    font-size: 24px;
    margin-bottom: 6px;
  }

  .card__container-date {
    font-size: 16px;
  }

  .card__container-time {
    font-size: 14px;
  }

  .card__container-img {
    width: 160px;
  }

  .card__blocks {
    padding: 10px;
    width: 400px;
  }

  .card-icon {
    width: 20px;
  }
}

@media (max-width: 920px) {
  .card {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    text-align: center;
    margin: 60px 20px 20px 20px;
  }

  .card__container-title {
    font-size: 32px;
  }

  .card__container-date {
    font-size: 18px;
  }

  .card__container-time {
    font-size: 18px;
  }

  .card__container-img {
    width: 240px;
  }

  .card__blocks {
    gap: 10px;
    width: 300px;
  }

  .card__blocks:last-child {
    text-align: center;
  }

  .card__block {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .card-icon {
    width: 24px;
  }
}

@media (max-width: 600px) {
  .card {
    gap: 20px;
    margin: 60px 20px 10px 20px;
  }

  .card__container-title {
    font-size: 24px;
  }

  .card__container-date {
    font-size: 16px;
  }

  .card__container-time {
    font-size: 14px;
  }

  .card-icon {
    width: 20px;
  }

  .card-text {
    font-size: 20px;
  }

  .text {
    font-size: 12px;
  }
}

@media (max-width: 420px) {
  .card {
    gap: 10px;
    margin: 40px 10px 10px 10px;
  }

  .card__container-img {
    width: 120px;
  }

  .text {
    font-size: 11px;
  }
}
</style>
