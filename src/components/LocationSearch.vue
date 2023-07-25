<!--<script>-->
<!--import axios from 'axios'-->
<!--import { API_KEY, BASE_URL } from '../constants'-->
<!--import { ref, onMounted, reactive } from 'vue'-->
<!--import Card from '../components/Card.vue'-->
<!--import Test from './Chart.vue'-->
<!--import WeatherBlock from './WeatherBlock.vue'-->
<!--import CardButtons from './CardButtons.vue'-->

<!--export default {-->
<!--  components: {-->
<!--    CardButtons,-->
<!--    WeatherBlock,-->
<!--    Card,-->
<!--    Test-->
<!--  },-->
<!--  props: {-->
<!--    cards: {-->
<!--      type: Array-->
<!--    },-->
<!--    maxCards: {-->
<!--      type: Number-->
<!--    }-->
<!--  } ,-->
<!--  setup() {-->

<!--    let searchInput = 'search_input'-->
<!--    let selectedPlace = ''-->

<!--    const city = ref('')-->
<!--    const location = ref(null)-->
<!--    const home = ref('')-->

<!--    onMounted(() => {-->
<!--      let autocomplete-->
<!--      autocomplete = new google.maps.places.Autocomplete(document.getElementById(searchInput), {-->
<!--        types: ['geocode']-->
<!--      })-->

<!--      google.maps.event.addListener(autocomplete, 'place_changed', function () {-->
<!--        selectedPlace = autocomplete.getPlace()-->
<!--      })-->
<!--    })-->

<!--    const getWeather = async () => {-->
<!--      city.value = selectedPlace ? selectedPlace.name : city.value-->

<!--      const lan = selectedPlace ? selectedPlace.geometry?.location.lat() : location.value?.latitude-->
<!--      const lon = selectedPlace ? selectedPlace.geometry?.location.lng() : location.value?.longitude-->

<!--      if (city.value) {-->
<!--        try {-->
<!--          const res = await axios.get(-->
<!--              `${BASE_URL}?lat=${lan}&lon=${lon}&lang=uk&units=metric&appid=${API_KEY}`-->
<!--          )-->

<!--          console.log(res.data)-->

<!--          const cityExists = cards.some((card) => card.weatherInfo?.id === res.data.city.id)-->

<!--          if (cityExists) {-->
<!--            alert('Such a city already exists in your block!')-->
<!--            return null-->
<!--          } else {-->
<!--            cards[activeIndex.value].weatherInfo = res.data-->
<!--            highestTemperatures.value = findHighestTemperatureByDate(res.data)-->
<!--          }-->
<!--        } catch (error) {-->
<!--          console.error('Error in the weather-icons request: ', error)-->
<!--        }-->
<!--      }-->
<!--    }-->

<!--    const addCard = () => {-->
<!--      if (props.cards.length < props.maxCards) {-->
<!--        props.cards.push({ weatherInfo: null })-->
<!--      }-->
<!--    }-->

<!--    const removeCard = (index) => {-->
<!--      const confirmDelete = confirm('Are you sure you want to delete this card?')-->
<!--      if (confirmDelete) {-->
<!--        cards.splice(index, 1)-->
<!--        if (index === activeIndex.value) {-->
<!--          activeIndex.value = 0-->
<!--        }-->
<!--      }-->
<!--    }-->

<!--    const askForLocation = () => {-->
<!--      if (navigator.geolocation) {-->
<!--        navigator.geolocation.getCurrentPosition(locationSuccess, locationError)-->
<!--      } else {-->
<!--        alert('Geolocation is not supported by your browser.')-->
<!--      }-->
<!--    }-->

<!--    const locationSuccess = (position) => {-->
<!--      location.value = {-->
<!--        latitude: position.coords.latitude,-->
<!--        longitude: position.coords.longitude-->
<!--      }-->
<!--      reverseGeocode()-->
<!--    }-->

<!--    const locationError = (error) => console.log('Помилка отримання геолокації: ' + error.message)-->

<!--    const setDefaultCity = () => {-->
<!--      if (-->
<!--          !city.value &&-->
<!--          home.value !== 'City not found' &&-->
<!--          home.value !== 'City data retrieval error'-->
<!--      ) {-->
<!--        city.value = home.value-->
<!--        getWeather()-->
<!--      }-->
<!--    }-->

<!--    const reverseGeocode = () => {-->
<!--      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.value.latitude}&lon=${location.value.longitude}`-->
<!--      axios-->
<!--          .get(apiUrl)-->
<!--          .then((response) => {-->
<!--            const data = response.data-->
<!--            if (data && data.address && data.address.city) {-->
<!--              home.value = data.address.city-->
<!--              setDefaultCity()-->
<!--            } else {-->
<!--              home.value = 'City not found'-->
<!--            }-->
<!--          })-->
<!--          .catch((error) => {-->
<!--            home.value = 'City data retrieval error'-->
<!--            console.error(error)-->
<!--          })-->
<!--    }-->

<!--    onMounted(() => {-->
<!--      askForLocation()-->
<!--      setDefaultCity()-->
<!--      getWeather()-->
<!--    })-->

<!--    return {-->
<!--      location,-->
<!--      home,-->
<!--      city,-->
<!--      getWeather,-->
<!--      addCard,-->
<!--      removeCard-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div class="main__container">-->
<!--    <div>-->
<!--      <label class="main__label">Location:</label>-->
<!--      <input-->
<!--          type="text"-->
<!--          id="search_input"-->
<!--          placeholder="Search City..."-->
<!--          class="main__input"-->
<!--          @keyup.enter="getWeather"-->
<!--      />-->
<!--      <button class="main__button-submit" @click="getWeather">Accept</button>-->
<!--    </div>-->
<!--    <img class="main__button-plus" src="./icons/plus.png" alt="img" @click="addCard" />-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.main__container {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--}-->

<!--.main__label {-->
<!--  color: #ffffff;-->
<!--  font-weight: bold;-->
<!--  text-transform: uppercase;-->
<!--  display: block;-->
<!--  padding: 4px 0;-->
<!--}-->

<!--.main__input {-->
<!--  outline: none;-->
<!--  height: 36px;-->
<!--  width: 300px;-->
<!--  border: none;-->
<!--  border-radius: 4px;-->
<!--  background-color: rgba(255, 255, 255, 1);-->
<!--  color: #000000;-->
<!--  font-weight: bold;-->
<!--  text-transform: uppercase;-->
<!--  padding: 0 10px;-->
<!--}-->

<!--.main__button-submit {-->
<!--  outline: none;-->
<!--  height: 36px;-->
<!--  border: none;-->
<!--  border-radius: 4px;-->
<!--  background-color: rgba(255, 255, 255, 1);-->
<!--  color: #000000;-->
<!--  font-weight: bold;-->
<!--  padding: 0 30px;-->
<!--  cursor: pointer;-->
<!--  transition: all 0.2s ease;-->
<!--  margin: 0 20px;-->
<!--  text-transform: uppercase;-->
<!--}-->

<!--.main__button-submit:hover {-->
<!--  background-color: rgba(255, 255, 255, 0.9);-->
<!--}-->

<!--.main__button-plus {-->
<!--  border-radius: 50%;-->
<!--}-->

<!--.main__button-plus {-->
<!--  background-color: #ffffff;-->
<!--  width: 32px;-->
<!--  padding: 6px;-->
<!--  border-radius: 50%;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.main__button-plus:hover {-->
<!--  background-color: rgba(255, 255, 255, 0.9);-->
<!--}-->
<!--</style>-->
