<script setup lang="ts">
import { Stat } from "../../shared/common";
import { useI18n } from "../../shared/plugins/i18n";

defineProps<{ stats: Stat[] }>();

const i18n = useI18n();
</script>

<template>
  <div class="stats shadow">
    <div
      class="stat"
      :class="{ indicator: stat.indicator }"
      v-for="(stat, i) in stats"
    >
      <span
        v-if="stat.indicator"
        class="indicator-item indicator-middle indicator-center badge"
        :class="{
          'badge-error': stat.indicator === 1,
          'badge-info': stat.indicator === -1,
        }"
      >
        <span v-if="stat.indicator === 1">{{ i18n.t("info-state.high") }}</span>
        <span v-if="stat.indicator === -1">{{ i18n.t("info-state.low") }}</span>
      </span>
      <div class="stat-title">{{ stat.title }}</div>
      <div
        class="stat-value"
        :class="{ 'text-primary': i === 0, 'text-secondary': i === 1 }"
      >
        {{ stat.value }}
      </div>
      <div class="stat-desc" v-if="stat.desc">{{ stat.desc }}</div>
    </div>
  </div>
</template>
