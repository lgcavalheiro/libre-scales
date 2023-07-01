<script setup lang="ts">
import { Stat } from "../../shared/common";
import InfoState from "./InfoState.vue";

defineProps<{
  title: string;
  stats: Stat[];
  columns: string[];
  tableData: {
    title: string;
    percentage: number;
    mass: string;
  }[];
}>();
</script>

<template>
  <div class="divider">{{ title }}</div>
  <div class="grid gap-4 mx-auto">
    <InfoState :stats="stats" />
  </div>
  <br />
  <div class="overflow-x-auto shadow">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th></th>
          <th v-for="column in columns">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in tableData">
          <th>{{ data.title }}</th>
          <td>{{ data.percentage }} %</td>
          <td>{{ data.mass }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
