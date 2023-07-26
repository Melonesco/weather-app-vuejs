<script>
import axios from 'axios'
import { API_KEY, BASE_URL, getMonth } from '../constants'
import { ref, onMounted, reactive } from 'vue'
import Card from '../components/Card.vue'
import Test from './Chart.vue'
import WeatherBlock from './WeatherBlock.vue'
import CardButtons from './CardButtons.vue'
import Loader from './Loader.vue'

export default {
  components: {
    CardButtons,
    WeatherBlock,
    Card,
    Test,
    Loader
  },
  setup() {
    const cards = reactive([{ weatherInfo: null }])
    const maxCards = 5
    const activeIndex = ref(0)
    const city = ref('')
    const weatherInfo = ref(null)
    const highestTemperatures = ref(null)

    let searchInput = 'search_input'
    let selectedPlace = ''

    const location = ref(null)
    const home = ref('')

    const highestTemperaturesByDate = []
    const fiveDaysButtonStatus = ref(false)
    const loading = ref(false)

    onMounted(() => {
      let autocomplete
      autocomplete = new google.maps.places.Autocomplete(document.getElementById(searchInput), {
        types: ['geocode']
      })

      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        selectedPlace = autocomplete.getPlace()
      })
    })

    const getWeather = async () => {
      loading.value = true
      city.value = selectedPlace ? selectedPlace.name : city.value

      const lan = selectedPlace ? selectedPlace.geometry?.location.lat() : location.value?.latitude
      const lon = selectedPlace ? selectedPlace.geometry?.location.lng() : location.value?.longitude

      if (city.value) {
        try {
          const res = await axios.get(
            `${BASE_URL}?lat=${lan}&lon=${lon}&units=metric&appid=${API_KEY}`
          )

          const cityExists = cards.some((card) => card.weatherInfo?.city.id === res.data.city.id)

          if (cityExists) {
            alert('Such a city already exists in your block!')
            return null
          } else {
            cards[activeIndex.value].weatherInfo = res.data
            highestTemperatures.value = findHighestTemperatureByDate(res.data)
          }
        } catch (error) {
          console.error('Error in the weather-icons request: ', error)
        } finally {
          loading.value = false
        }
      }
    }

    const addCard = () => cards.length < maxCards && cards.push({ weatherInfo: null })
    const setActiveIndex = (index) => (activeIndex.value = index)
    const isActive = (index) => activeIndex.value === index

    const updateActiveCard = () => {
      if (activeIndex.value !== -1) {
        cards[activeIndex.value].weatherInfo = weatherInfo
      }
    }

    const removeCard = (index) => {
      const confirmDelete = confirm('Are you sure you want to delete this card?')
      if (confirmDelete) {
        cards.splice(index, 1)
        if (index === activeIndex.value) {
          activeIndex.value = 0
        }
      }
    }

    const askForLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError)
      } else {
        alert('Geolocation is not supported by your browser.')
      }
    }

    const locationSuccess = (position) => {
      location.value = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      reverseGeocode()
    }

    const locationError = (error) => console.log('Помилка отримання геолокації: ' + error.message)

    const setDefaultCity = () => {
      if (
        !city.value &&
        home.value !== 'City not found' &&
        home.value !== 'City data retrieval error'
      ) {
        city.value = home.value
        getWeather()
      }
    }

    const reverseGeocode = () => {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.value.latitude}&lon=${location.value.longitude}`
      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data
          if (data && data.address && data.address.city) {
            home.value = data.address.city
            setDefaultCity()
          } else {
            home.value = 'City not found'
          }
        })
        .catch((error) => {
          home.value = 'City data retrieval error'
          console.error(error)
        })
    }

    const findHighestTemperatureByDate = (weatherInfo) => {
      ;(weatherInfo?.list || []).forEach((day) => {
        const date = getMonth(day.dt_txt)
        const existingDayIndex = highestTemperaturesByDate.findIndex(
          (item) => getMonth(item.dt_txt) === date
        )
        if (
          existingDayIndex !== -1 &&
          day.main.temp <= highestTemperaturesByDate[existingDayIndex].main.temp
        )
          return
        if (existingDayIndex !== -1) highestTemperaturesByDate.splice(existingDayIndex, 1)
        highestTemperaturesByDate.push(day)
      })

      return highestTemperaturesByDate.slice(0, 5)
    }

    const changeStatus = (status) => (fiveDaysButtonStatus.value = status)

    onMounted(() => {
      askForLocation()
      setDefaultCity()
      getWeather()
    })

    return {
      fiveDaysButtonStatus,
      changeStatus,
      highestTemperatures,
      location,
      home,
      cards,
      maxCards,
      setActiveIndex,
      isActive,
      updateActiveCard,
      removeCard,
      activeIndex,
      city,
      weatherInfo,
      getWeather,
      addCard,
      getMonth,
      loading
    }
  }
}
</script>

<template>
  <h2 class="title">Location:</h2>
  <div class="container">
    <div>
      <input
        type="text"
        id="search_input"
        placeholder="Search City..."
        class="input"
        @keyup.enter="getWeather"
      />
      <button class="button-submit" @click="getWeather">Accept</button>
    </div>
    <img class="button-plus" src="./icons/plus.png" alt="img" @click="addCard" />
  </div>
  <div
    class="cards"
    v-for="(card, index) in cards"
    :key="card.id"
    :style="{
      border: isActive(index) ? '2px solid silver' : '2px solid darkslateblue',
      display: fiveDaysButtonStatus ? 'flex' : 'block',
      justifyContent: fiveDaysButtonStatus ? 'space-between' : 'center',
      alignItems: fiveDaysButtonStatus ? 'center' : 'left'
    }"
    @click="setActiveIndex(index)"
  >
    <CardButtons
      v-if="card.weatherInfo"
      :weatherInfo="card.weatherInfo"
      :changeStatus="changeStatus"
    />
    <div
      v-if="fiveDaysButtonStatus && card.weatherInfo"
      v-for="date in highestTemperatures"
      :key="date.id"
      class="card-blocks"
    >
      <WeatherBlock :weather-info="date" />
    </div>
    <Card v-else-if="card.weatherInfo" :weatherInfo="card.weatherInfo" :loading="loading" />
    <div v-else class="card-empty">
      <h2 class="card-empty-text">Add a city to see the weather</h2>
    </div>
    <input :style="{ display: 'none' }" v-if="isActive(index)" v-model="card.weatherInfo" />
    <h2 class="card-number">{{ index + 1 }}</h2>
    <img class="card-close" src="./icons/close.png" alt="" @click="() => removeCard(index)" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
  text-transform: uppercase;
  display: block;
  padding: 4px 0;
  margin-bottom: 4px;
}

.input {
  outline: none;
  height: 36px;
  width: 300px;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 1);
  color: #000000;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0 10px;
}

.button-submit {
  outline: none;
  height: 36px;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 1);
  color: #000000;
  font-weight: bold;
  padding: 0 30px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 20px;
  text-transform: uppercase;
}

.button-submit:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

.button-plus {
  border-radius: 50%;
}

.button-plus {
  background-color: #ffffff;
  width: 32px;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
}

.button-plus:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

.cards {
  min-height: 300px;
  background-color: darkslateblue;
  border-radius: 4px;
  width: 100%;
  margin: 30px 0;
  padding: 10px;
  position: relative;
}

.card-number {
  color: #ffffff;
  position: absolute;
  top: 10px;
  left: 10px;
}

.card-close {
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: #ffffff;
  width: 32px;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.card-close:hover {
  background-color: red;
}

.card-blocks {
}

.card-empty {
  width: 100%;
  display: flex;
  height: 300px;
  justify-content: center;
  align-items: center;
}

.card-empty-text {
  font-size: 40px;
  font-weight: bold;
  color: #ffffff;
  padding: 6px;
  border-bottom: 2px solid #ffffff;
}

@media (max-width: 920px) {
  .input {
    height: 30px;
    font-size: 12px;
  }

  .button-submit {
    height: 30px;
    padding: 0 20px;
    font-size: 12px;
  }

  .card-empty {
    height: 200px;
    text-align: center;
  }

  .card-empty-text {
    font-size: 28px;
  }
}

@media (max-width: 600px) {
  .container {
    flex-direction: column;
    gap: 20px;
    align-items: start;
  }

  .title {
    font-size: 18px;
  }

  .input {
    width: 240px;
  }

  .cards {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    min-height: 160px;
  }

  .card-empty {
    height: 160px;
    text-align: center;
  }

  .card-empty-text {
    max-width: 340px;
    font-size: 20px;
  }
}

@media (max-width: 420px) {
  .container {
    gap: 10px;
  }

  .title {
    font-size: 16px;
  }

  .input {
    width: 200px;
  }

  .button-submit {
    padding: 0 10px;
    font-size: 12px;
  }
}
</style>
