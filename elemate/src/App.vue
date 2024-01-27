<template>
  <nav>
    <router-link to="/"><img style="height: 25px;" src="./assets/images/logo.png"></router-link> |
    <router-link to="/">Accueil</router-link> |
    <router-link to="/animals">Animaux</router-link>
  </nav>
  <router-view/>
</template>

<script lang="ts">
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,900');

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  z-index: 99;
  width: 100%;
  background-color: rgb(31, 31, 31);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-bottom: 2px solid rgb(124, 122, 255);
}

nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: underline;
}

p {
  margin: 0;
}
</style>
