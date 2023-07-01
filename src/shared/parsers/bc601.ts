type Literal = { [key: string]: string };

const GENDERS: Literal = {
  "2": "female",
  "1": "male",
};

const LENGTH_UNITS: Literal = {
  "2": "cm",
};

const MASS_UNITS: Literal = {
  "2": "kg",
};

const BODY_TYPES: Literal = {
  "0": "standard",
  "1": "athlete", //assuming, could be 2 
};

export interface BC601Result {
  AG: number;
  AL: number;
  Bt: string;
  CS: string;
  DT: string;
  FL: number;
  FR: number;
  FT: number;
  FW: number;
  Fl: number;
  Fr: number;
  GE: string;
  Hm: number;
  IF: number;
  MI: number;
  MO: string;
  Ti: string;
  Wk: number;
  bW: number;
  mL: number;
  mR: number;
  mT: number;
  mW: number;
  ml: number;
  mr: number;
  rA: number;
  rD: number;
  ww: number;
  "{0": number;
  "~0": string;
  "~1": string;
  "~2": number;
  "~3": number;
}

const parseBc601 = (value: string): BC601Result => {
  value = value.split("\n")[0];

  let partial: Record<string, string> = {};

  const splitted = value.split(",");
  splitted.forEach((v, i) => {
    if (i % 2 == 0) {
      partial[v] = splitted[i + 1];
    }
  });

  const parsed: BC601Result = {
    "{0": Number(partial["{0"]),
    "~0": LENGTH_UNITS[Number(partial["~0"])],
    "~1": MASS_UNITS[Number(partial["~1"])],
    "~2": Number(partial["~2"]),
    "~3": Number(partial["~3"]),
    AG: Number(partial["AG"]),
    AL: Number(partial["AL"]),
    Bt: BODY_TYPES[Number(partial["Bt"])],
    CS: partial["CS"],
    DT: partial["DT"].replaceAll('"', ""),
    FL: Number(partial["FL"]),
    FR: Number(partial["FR"]),
    FT: Number(partial["FT"]),
    FW: Number(partial["FW"]),
    Fl: Number(partial["Fl"]),
    Fr: Number(partial["Fr"]),
    GE: GENDERS[partial["GE"]],
    Hm: Number(partial["Hm"]),
    IF: Number(partial["IF"]),
    MI: Number(partial["MI"]),
    MO: partial["MO"].replaceAll('"', ""),
    Ti: partial["Ti"].replaceAll('"', ""),
    Wk: Number(partial["Wk"]),
    bW: Number(partial["bW"]),
    mL: Number(partial["mL"]),
    mR: Number(partial["mR"]),
    mT: Number(partial["mT"]),
    mW: Number(partial["mW"]),
    ml: Number(partial["ml"]),
    mr: Number(partial["mr"]),
    rA: Number(partial["rA"]),
    rD: Number(partial["rD"]),
    ww: Number(partial["ww"]),
  };

  return parsed;
};

export default parseBc601;
