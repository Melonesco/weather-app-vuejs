<script setup>
import { ref } from 'vue'
import Card from './Card.vue'

const cities = ref(JSON.parse(localStorage.getItem('favorites')) || [])

const removeFromFavorites = (id, name) => {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || []

  const indexToRemove = favorites.findIndex((favorite) => favorite.city.id === id)

  if (indexToRemove !== -1) {
    const shouldDelete = confirm(`Are you sure you want to delete the city of ${name}?`)
    if (shouldDelete) {
      favorites.splice(indexToRemove, 1)
      cities.value.splice(indexToRemove, 1)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      localStorage.setItem('cities', JSON.stringify(cities))
    }
  } else {
    alert('City not found in favorites')
  }
}
</script>

<template>
  <h2 class="title">Favorites: {{ cities.length }}</h2>
  <div class="container" v-for="(city, index) in cities" v-if="cities.length > 0">
    <Card :weatherInfo="city" />
    <h2 class="number">{{ index + 1 }}</h2>
    <img
      class="close"
      src="./icons/close.png"
      alt=""
      @click="() => removeFromFavorites(city.city.id, city.city.name)"
    />
  </div>
  <h2 class="empty" v-else>Empty</h2>
</template>

<style scoped>
.container {
  background-color: darkslateblue;
  border-radius: 4px;
  width: 100%;
  margin: 30px 0;
  padding: 10px;
  position: relative;
}

.title {
  color: #ffffff;
  font-weight: bold;
  text-transform: uppercase;
}

.number {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #ffffff;
}

.close {
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

.close:hover {
  background-color: red;
}

.empty {
  color: #ffffff;
  width: 100%;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
}
</style>
