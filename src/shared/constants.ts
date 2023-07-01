export const IDEAL_FAT: { [key: string]: number[] } = {
  male: [18, 24],
  female: [25, 31],
};

export const IDEAL_BODY_WATER: { [key: string]: number[] } = {
  male: [50, 65],
  female: [45, 60],
};

export const IDEAL_BONE_MASS: { [key: string]: Function } = {
  male: (weight: number) => {
    if (weight <= 65) {
      return 2.65;
    } else if (weight > 65 && weight <= 95) {
      return 3.29;
    } else {
      return 3.69;
    }
  },
  female: (weight: number) => {
    if (weight <= 50) {
      return 1.95;
    } else if (weight > 50 && weight <= 75) {
      return 2.4;
    } else {
      return 2.9;
    }
  },
};

export const IDEAL_DAILY_CALORIE_INTAKE: { [key: string]: number } = {
  male: 2500,
  female: 2000,
};

export const IDEAL_BMI: number[] = [18.5, 24.9];

export const IDEAL_VISCERAL_FAT: number[] = [1, 12];

export const THEMES = [
  "dark",
  "light",
  "synthwave",
  "retro",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "pastel",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "autumn",
  "business",
  "night",
  "coffee",
  "winter",
];
