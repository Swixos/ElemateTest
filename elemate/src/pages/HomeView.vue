<template>
  <div class="home">
    <div>
      <h1>Test pour le stage chez Elemate</h1>
      <p>Voici le test d'aptitude pour le stage respectant le cahier des charges demandé (cf. <router-link to="/animals">Animaux</router-link>)</p>
      <p>AVI Timéo - 2ème année SUP DE VINCI</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
});
</script>

<style lang="scss" scoped>
.home {
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;
  text-align: center;
}

.home > div {
  animation: fade 3s ease-in-out;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(-50);
  }
}
</style>