<script setup>
const props = defineProps({
  weatherInfo: {
    type: [Object, null],
    required: false
  },
  changeStatus: {
    type: Function,
    required: false
  }
})

const addToFavorites = (weatherInfo) => {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || []

  const isDuplicate = favorites.some((favorite) => favorite?.city.id === weatherInfo.id)

  if (favorites.length < 5 && !isDuplicate) {
    favorites.push(weatherInfo)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    alert('Added to favorites!')
  } else if (favorites.length >= 5) {
    alert('Favorites is full')
  } else {
    alert('This city is already in favorites')
  }
}
</script>

<template>
  <div class="buttons">
    <button class="button" @click="() => changeStatus(false)">1 day</button>
    <button class="button" @click="() => changeStatus(true)">5 days</button>
    <button class="button" @click="() => addToFavorites(weatherInfo)">
      Add to favorites
    </button>
  </div>
</template>

<style scoped>
.buttons {
  position: absolute;
  top: 10px;
  right: 100px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 5;
}

.button {
  outline: none;
  background-color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

@media (max-width: 1020px) {
  .buttons {
    right: 80px;
  }

  .button {
    padding: 8px 12px;
    font-size: 12px;
  }
}

@media (max-width: 600px) {
  .buttons {
    right: 60px;
  }

  .button {
    padding: 6px 10px;
    font-size: 12px;
  }
}

@media (max-width: 420px) {
  .buttons {
    position: relative;
    display: flex;
    flex-direction: column;
    right: 0;
  }

  .button {
    width: 160px;
    padding: 10px 0;
    font-size: 12px;
  }
}
</style>
