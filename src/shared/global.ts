import { reactive } from "vue";
import scaleQuestion from "../assets/scale-question.webp";
import bc601 from "../assets/model-bc-601.jpg";

interface Global {
  selectedScale: string;
  scaleOptions: string[];
  file: string | string[] | null;
}

export const DEFAULT_SCALE_IMAGE = scaleQuestion;

export const scaleImages: Record<string, string> = {
  "TANITA BC-601": bc601,
};

const global: Global = reactive({
  selectedScale: "",
  scaleOptions: Object.keys(scaleImages),
  file: null,
});

export default global;
