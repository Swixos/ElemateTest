<template>
  <div>
    <h1 class="mt-5 mb-4">Liste de {{ animals.filtred.length > 0 ? animals.filtred.length : animals.data.length }} {{ animals.filtred.length > 1 || (animals.filtred.length === 0 && animals.data.length > 1) ? 'animaux' : 'animal' }}</h1>
    <div class="mb-4 d-flex align-items-center justify-content-center">
      <div class="w-75 d-flex align-items-center justify-content-center gap-2">
        <input v-if="searchType === 'type'" type="text" @keydown="filteredAnimals(searchType)" @keyup="filteredAnimals(searchType)" v-model="searchQuery" class="form-control w-50" placeholder="Rechercher par type... (Ex. Dog / Cat)">
        <input v-else type="text" @keydown="filteredAnimals(searchType)" @keyup="filteredAnimals(searchType)" v-model="searchQuery" class="form-control w-50" placeholder="Rechercher par nom... (Ex. Simba / Kiwi / etc...)">
        <select class="form-select w-25" v-model="searchType" v-on:change="filteredAnimals(searchType)">
          <option selected value="type">Type</option>
          <option value="name">Nom</option>
        </select>
      </div>
    </div>
    <div v-if="animals.data.length > 0" class="d-flex align-items-center justify-content-center flex-wrap w-100 gap-3 mb-3">
      <div v-for="animal in animals.filtred.length > 0 ? animals.filtred : animals.data" :key="animal.id">
        <div class="card" style="width: 600px; height: 270px;">
          <div class="card-body d-flex align-items-center justify-content-center flex-column w-100 gap-2">
            <div class="d-flex align-items-center justify-content-center flex-column w-100">
              <div class="animal-content-image">
                <img :src="animal.photo.length > 0 ? animal.photo : require('../assets/images/animals/animal-default.svg')" class="img-fluid rounded-circle" alt="Animal Photo">
              </div>
              <p class="fs-4 fw-bold text-truncate w-75" :title="animal.name">{{ animal.name }}</p>
            </div>
            <p class="fs-5">{{ animal.type }}</p>
            <p class="animal-content-description">{{ animal.description ? animal.description : 'Aucune description...' }}</p>
            <a :href="animal.url" target="_blank" class="w-100 btn btn-primary">Voir plus</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="errors">{{ errors }}<br><i>Il est possible que leur API ne réponde pas à ce moment là, j'ai eu plusieurs fois ce bug.<br>Il faut recharger jusqu'à ce que les datas s'affichent</i><br><a v-on:click="getAnimals" class="btn btn-primary">Recharger</a></div>
    <div v-else>
      <p class="mt-4">Chargement des données...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AnimalService } from '../plugins/services/AnimalService';
import { AnimalModel } from '../plugins/models/AnimalModel';

const animalService = new AnimalService(process.env.VUE_APP_API_KEY, process.env.VUE_APP_API_SECRET);

export default defineComponent({
  name: 'ElemateAnimals',
  data() {
    return {
      searchQuery: '',
      searchType: 'type',
      errors: null as Error | null,
      animals: {
        data: [] as AnimalModel[],
        filtred: [] as AnimalModel[],
      },
    };
  },
  methods: {
    async getAnimals(): Promise<void> {
      try {
        this.errors = null;
        this.animals.data = await animalService.getAnimals();
      } catch (error) {
        this.errors = error as Error;
        console.error('Une erreur est survenue:', (error as Error).message);
      }
    },
    filteredAnimals(searchType: string) {
      if(this.searchQuery.length > 0 && searchType === 'type') {
        this.animals.filtred = this.animals.data.filter((animal) =>
          animal.type.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else if(this.searchQuery.length > 0 && searchType === 'name') {
        this.animals.filtred = this.animals.data.filter((animal) =>
          animal.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.animals.filtred = [];
      }
    },
  },
  mounted() {
    this.getAnimals();
  },
});
</script>

<style lang="scss" scoped>
@import '../assets/styles/pages/animals.scss'
</style>
