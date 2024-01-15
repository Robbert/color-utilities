import {
  CMYK,
  HCG,
  HCL,
  HSB,
  HSL,
  HSLA,
  HSV,
  HSVA,
  HWB,
  LAB,
  LCH,
  RGB,
  RGBA,
  XYZ,
} from "../interfaces/color-spaces.interface";

export type ColorSpaceUnion =
  | RGB
  | RGBA
  | HSL
  | HSLA
  | HSV
  | HSVA
  | HSB
  | HWB
  | HCG
  | HCL
  | LAB
  | LCH
  | CMYK
  | XYZ
  | string;

export type Spaces =
  | "adobeRgb"
  | "ansi16"
  | "ansi256"
  | "cmyk"
  | "hcg"
  | "hex"
  | "hsl"
  | "hsv"
  | "hwb"
  | "lab"
  | "lch"
  | "rgb_0_1"
  | "rgb_0_255"
  | "xyz"
  | "webSafe";

export type initialSpaces =
  | "cmyk"
  | "hex"
  | "hsl"
  | "hsv"
  | "hwb"
  | "rgb"
  | "xyz";

export type ColorArray = [number, number, number];
