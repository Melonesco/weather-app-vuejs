<script setup></script>

<template>
  <header class="header">
    <img src="./icons/earth.png" class="header__logo" alt="img" />
    <div class="header__nav">
      <router-link to="/" class="header__button">Home</router-link>
      <router-link to="/favorites" class="header__button">Favorites</router-link>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: rgb(26, 0, 70);
  background: linear-gradient(90deg, rgba(26, 0, 70, 0.8) 0%, rgba(23, 0, 77, 0.8) 100%);
  border-radius: 6px 6px 0 0;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__logo {
  width: 80px;
  height: 80px;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 30px;
}

.header__button {
  outline: none;
  font-size: 14px;
  font-weight: bold;
  background-color: #ffffff;
  color: #000000;
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
}

.header__button:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

@media (max-width: 1020px) {
  .header__nav {
    gap: 20px;
  }

  .header__button {
    font-size: 12px;
    padding: 10px 24px;
  }
}

@media (max-width: 420px) {
  .header {
    border-radius: 0;
  }

  .header__logo {
    width: 60px;
    height: 60px;
  }

  .header__nav {
    gap: 20px;
  }

  .header__button {
    font-size: 12px;
    padding: 8px 16px;
  }
}
</style>
