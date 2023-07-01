<script setup lang="ts">
import global, { DEFAULT_SCALE_IMAGE, scaleImages } from "../shared/global";
import { open } from "@tauri-apps/api/dialog";
import { useI18n } from "../shared/plugins/i18n";

const i18n = useI18n();

const onClick = () => {
  window.location.assign(`#/${global.selectedScale.replace(" ", "-")}`);
};

const openFile = async () => {
  global.file = await open({
    multiple: false,
    title: i18n.t("select-file"),
  });
};
</script>

<template>
  <div class="card card-side bg-neutral shadow-lg">
    <figure>
      <img
        class="object-fill h-96 w-96"
        :src="scaleImages[global.selectedScale] || DEFAULT_SCALE_IMAGE"
        alt="Scale"
      />
    </figure>

    <div class="card-body grid">
      <h1 class="card-title">{{ i18n.t("lets-start") }}</h1>

      <div class="form-control w-full max-w-xs self-end">
        <label class="label">
          <span class="label-text">{{ i18n.t("select-scale") }}</span>
        </label>
        <select class="select w-full max-w-xs" v-model="global.selectedScale">
          <option v-for="opt in global.scaleOptions" :value="opt">
            {{ opt }}
          </option>
        </select>

        <label class="label">
          <span v-if="!global.file" class="label-text">
            {{ i18n.t("scale-file") }}
          </span>
          <span v-else class="label-text">{{ global.file }}</span>
        </label>
        <button class="btn btn-primary" @click="openFile">
          {{ i18n.t("select-file") }}
        </button>
      </div>

      <div class="card-actions justify-end self-end">
        <button
          :disabled="
            !global.scaleOptions.includes(global.selectedScale) || !global.file
          "
          class="btn btn-primary"
          v-on:click="onClick"
        >
          {{ i18n.t("use-scale") }}
        </button>
      </div>
    </div>
  </div>
</template>
