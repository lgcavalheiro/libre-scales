<script setup lang="ts">
import { computed, ref } from "vue";
import ScaleSelector from "./components/ScaleSelector.vue";
import TBC601 from "./components/TBC601/TBC601.vue";
import { provideI18n } from "./shared/plugins/i18n";
import en from "./assets/locale/en.json";
import ptBr from "./assets/locale/pt-br.json";
import Navbar from "./components/Navbar.vue";

provideI18n({
  locale: "en",
  messages: { en, ptBr },
});

const routes: Record<string, any> = {
  "/": ScaleSelector,
  "/TANITA-BC-601": TBC601,
};

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || ScaleSelector;
});
</script>

<template>
  <Navbar />
  <div class="container mx-auto px-8 py-8">
    <component :is="currentView" />
  </div>
</template>
