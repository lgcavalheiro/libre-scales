<script setup lang="ts">
import FI from "../assets/feather-sprite.svg";
import { THEMES } from "../shared/constants";
import { useI18n } from "../shared/plugins/i18n";
import { appWindow } from "@tauri-apps/api/window";

const LANGS: Record<string, string> = {
  en: "English",
  ptBr: "Português",
};

const i18n = useI18n();

const onClick = () => window.location.assign("/#");

const onClose = async () => await appWindow.close();

const switchLang = (lang: string) => {
  i18n.locale.value = lang;
};

const switchTheme = (theme: string) => {
  document.querySelector("html")?.setAttribute("data-theme", theme);
};

const getLang = (lang: string) => LANGS[lang] || "";
</script>

<template>
  <div class="navbar bg-base-100 container mx-auto px-8 z-50 relative">
    <div class="navbar-start">
      <ul class="menu menu-horizontal px-1">
        <li tabindex="0">
          <a>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <use :href="`${FI}#aperture`" />
            </svg>
          </a>
          <ul class="p-2 bg-base-100">
            <li v-for="theme in THEMES">
              <button @click="switchTheme(theme)">{{ theme }}</button>
            </li>
          </ul>
        </li>
        <li tabindex="1">
          <a>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <use :href="`${FI}#globe`" />
            </svg>
          </a>
          <ul class="p-2 bg-base-100">
            <li v-for="lang in Object.keys(i18n.messages)">
              <button @click="switchLang(lang)">{{ getLang(lang) }}</button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="navbar-center">
      <a class="text-xl">Libre Scales</a>
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost normal-case text-xl" @click="onClick">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <use :href="`${FI}#home`" />
        </svg>
      </button>
      <button class="btn btn-ghost normal-case text-xl" @click="onClose">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <use :href="`${FI}#x`" />
        </svg>
      </button>
    </div>
  </div>
</template>
