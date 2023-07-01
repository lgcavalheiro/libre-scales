<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import global from "../../shared/global";
import { readTextFile } from "@tauri-apps/api/fs";
import parseBc601, { BC601Result } from "../../shared/parsers/bc601";
import {
  IDEAL_FAT,
  IDEAL_BODY_WATER,
  IDEAL_BONE_MASS,
  IDEAL_DAILY_CALORIE_INTAKE,
  IDEAL_BMI,
  IDEAL_VISCERAL_FAT,
} from "../../shared/constants";
import InfoTable from "./InfoTable.vue";
import InfoState from "./InfoState.vue";
import { getRangeIndicator } from "../../shared/common";
import { useI18n } from "../../shared/plugins/i18n";

const i18n = useI18n();

const contents = ref<BC601Result>();
const globalMasses = reactive<{ fat: number; muscle: number }>({
  fat: 0,
  muscle: 0,
});

const testString =
  '{0,16,~0,2,~1,2,~2,3,~3,4,MO,"BC-601",DT,"02/05/2023",Ti,"11:59:02",Bt,0,GE,1,AG,30,Hm,171.0,AL,1,Wk,104.7,MI,35.8,FW,34.3,Fr,32.2,Fl,35.4,FR,31.8,FL,32.6,FT,35.9,mW,65.4,mr,4.0,ml,3.8,mR,11.9,mL,11.8,mT,33.9,bW,3.4,IF,15,rD,3245,rA,45,ww,46.0,CS,73';

onMounted(async () => {
  if (!global.file) return;
  contents.value = parseBc601(await readTextFile(global.file as string));

  // contents.value = parseBc601(testString);

  globalMasses.fat = Number(
    ((contents.value.Wk * contents.value.FW) / 100).toFixed(2)
  );

  globalMasses.muscle = Number(
    ((contents.value.Wk * contents.value.mW) / 100).toFixed(2)
  );
});

const onClick = () => window.location.assign("#/");
</script>

<template>
  <div v-if="contents">
    <article class="prose max-w-none">
      <div class="navbar mx-auto items-baseline">
        <h1 class="flex-1">{{ i18n.t("BC601.report") }}</h1>
        <span class="flex-none">
          {{ i18n.t("BC601.date") }} {{ `${contents.DT} ${contents.Ti}` }}
        </span>
      </div>
    </article>

    <div class="grid gap-4 mx-auto">
      <InfoState
        :stats="[
          {
            title: i18n.t('BC601.age'),
            value: contents.AG.toString(),
          },
          {
            title: i18n.t('BC601.gender'),
            value: i18n.t(`common.${contents.GE}`),
          },
          {
            title: i18n.t('BC601.type'),
            value: i18n.t(`common.${contents.Bt}`),
          },
        ]"
      />
      <InfoState
        :stats="[
          {
            title: i18n.t('BC601.height'),
            value: `${contents.Hm} ${contents['~0']}`,
          },
          {
            title: i18n.t('BC601.weight'),
            value: `${contents.Wk} ${contents['~1']}`,
          },
          {
            title: i18n.t('BC601.activity-level'),
            value: contents.AL.toString(),
          },
        ]"
      />
    </div>

    <InfoTable
      :title="i18n.t('BC601.fat-information')"
      :columns="[i18n.t('BC601.percentage'), i18n.t('BC601.mass')]"
      :stats="[
        {
          title: i18n.t('BC601.global-fat-p'),
          value: `${contents.FW} %`,
          desc: `${i18n.t('BC601.ideal-between')} ${IDEAL_FAT[contents.GE].join(
            i18n.t('BC601.and')
          )} %`,
          indicator: getRangeIndicator(IDEAL_FAT[contents.GE], contents.FW),
        },
        {
          title: i18n.t('BC601.global-fat-m'),
          value: `${globalMasses.fat} ${contents['~1']}`,
        },
      ]"
      :table-data="[
        {
          title: i18n.t('BC601.right-arm'),
          percentage: contents.Fr,
          mass: `${((globalMasses.fat * contents.Fr) / 100).toFixed(2)} ${
            contents['~1']
          }`,
        },
        {
          title: i18n.t('BC601.left-arm'),
          percentage: contents.Fl,
          mass: `${((globalMasses.fat * contents.Fl) / 100).toFixed(2)} ${
            contents['~1']
          }`,
        },
        {
          title: i18n.t('BC601.right-leg'),
          percentage: contents.FR,
          mass: `${((globalMasses.fat * contents.FR) / 100).toFixed(2)} ${
            contents['~1']
          }`,
        },
        {
          title: i18n.t('BC601.left-leg'),
          percentage: contents.FL,
          mass: `${((globalMasses.fat * contents.FL) / 100).toFixed(2)} ${
            contents['~1']
          }`,
        },
        {
          title: i18n.t('BC601.torso'),
          percentage: contents.FT,
          mass: `${((globalMasses.fat * contents.FT) / 100).toFixed(2)} ${
            contents['~1']
          }`,
        },
      ]"
    />

    <InfoTable
      :title="i18n.t('BC601.muscle-information')"
      :columns="[i18n.t('BC601.percentage'), i18n.t('BC601.mass')]"
      :stats="[
        {
          title: i18n.t('BC601.global-muscle-p'),
          value: `${contents.mW} %`,
        },
        {
          title: i18n.t('BC601.global-muscle-m'),
          value: `${globalMasses.muscle} ${contents['~1']}`,
        },
      ]"
      :table-data="[
        {
          title: i18n.t('BC601.right-arm'),
          percentage: contents.mr,
          mass: `${((globalMasses.muscle * contents.mr) / 100).toFixed(2)} ${
            contents['~1']
          }`,
        },
        {
          title: i18n.t('BC601.left-arm'),
          percentage: contents.ml,
          mass: `${((globalMasses.muscle * contents.ml) / 100).toFixed(2)} ${
            contents['~1']
          }`,
        },
        {
          title: i18n.t('BC601.right-leg'),
          percentage: contents.mR,
          mass: `${((globalMasses.muscle * contents.mR) / 100).toFixed(2)} ${
            contents['~1']
          }`,
        },
        {
          title: i18n.t('BC601.left-leg'),
          percentage: contents.mL,
          mass: `${((globalMasses.muscle * contents.mL) / 100).toFixed(2)} ${
            contents['~1']
          }`,
        },
        {
          title: i18n.t('BC601.torso'),
          percentage: contents.mT,
          mass: `${((globalMasses.muscle * contents.mT) / 100).toFixed(2)} ${
            contents['~1']
          }`,
        },
      ]"
    />

    <div class="divider">{{ i18n.t("BC601.other-information") }}</div>
    <div class="grid gap-4 mx-auto">
      <div class="stats shadow w-full">
        <InfoState
          :stats="[
            {
              title: i18n.t('BC601.bmi'),
              value: contents.MI.toString(),
              desc: `${i18n.t('BC601.healthy-range')} ${IDEAL_BMI.join(
                i18n.t('BC601.to')
              )}`,
              indicator: getRangeIndicator(IDEAL_BMI, contents.MI),
            },
            {
              title: i18n.t('BC601.visceral-fat'),
              value: contents.IF.toString(),
              desc: `${i18n.t('BC601.healthy-range')} ${IDEAL_VISCERAL_FAT.join(
                i18n.t('BC601.to')
              )}`,
              indicator: getRangeIndicator(IDEAL_VISCERAL_FAT, contents.IF),
            },
            {
              title: i18n.t('BC601.metabolic-age'),
              value: contents.rA.toString(),
              desc: `${i18n.t('BC601.ideal-below')} ${contents.AG}`,
              indicator: getRangeIndicator(contents.AG, contents.rA),
            },
          ]"
        />
      </div>

      <div class="stats shadow w-full">
        <InfoState
          :stats="[
            {
              title: i18n.t('BC601.body-water'),
              value: `${contents.ww} %`,
              desc: `${i18n.t('BC601.ideal-between')} ${IDEAL_BODY_WATER[
                contents.GE
              ].join(i18n.t('BC601.and'))} %`,
              indicator: getRangeIndicator(
                IDEAL_BODY_WATER[contents.GE],
                contents.ww
              ),
            },
            {
              title: i18n.t('BC601.bone-mass'),
              value: `${contents.bW} ${contents['~1']}`,
              desc: `${i18n.t('BC601.ideal-is')} ${IDEAL_BONE_MASS[contents.GE](
                contents.Wk
              )} ${contents['~1']}`,
              indicator: getRangeIndicator(
                IDEAL_BONE_MASS[contents.GE](contents.Wk),
                contents.bW
              ),
            },
            {
              title: i18n.t('BC601.calorie-intake'),
              value: `${contents.rD} kcal`,
              desc: `${i18n.t('BC601.ideal-is')} ${
                IDEAL_DAILY_CALORIE_INTAKE[contents.GE]
              } kcal`,
              indicator: getRangeIndicator(
                IDEAL_DAILY_CALORIE_INTAKE[contents.GE],
                contents.rD
              ),
            },
          ]"
        />
      </div>
    </div>
  </div>
  <div v-else>
    {{ i18n.t("BC601.went-wrong") }}
    <button class="link" @click="onClick">
      {{ i18n.t("BC601.click-here") }}
    </button>
    {{ i18n.t("BC601.go-back") }}
  </div>
</template>
