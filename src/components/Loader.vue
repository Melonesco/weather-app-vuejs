<template>
  <div class="center-body">
    <div class="loader-circle-25"></div>
  </div>
</template>

<script></script>

<style>
.center-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
body {
  background-color: #202628;
}
.loader-circle-25 {
  height: 70px;
  width: 70px;
  position: relative;
  display: inline-block;
}
.loader-circle-25:after,
.loader-circle-25:before {
  content: '';
  display: inline-block;
  position: relative;
  border-radius: 50%;
  border: 5px solid #0000;
  border-left: 5px solid #bbb;
  border-right: 5px solid #bbb;
}
.loader-circle-25:before {
  height: 70px;
  width: 70px;
  animation: spin1 2s infinite;
}
.loader-circle-25:after {
  height: 40px;
  width: 40px;
  top: 15px;
  left: 15px;
  animation: spin2 2s infinite;
  position: absolute;
}
@keyframes spin1 {
  50% {
    transform: rotate(360deg);
  }
}
@keyframes spin2 {
  50% {
    transform: rotate(-360deg);
  }
}
</style>
