import {
  cmykColorCheck,
  hclColorCheck,
  hexColorCheck,
  hslColorCheck,
  hsvColorCheck,
  hwbColorCheck,
  labColorCheck,
  lchColorCheck,
  luvColorCheck,
  rgbColorCheck,
  rybColorCheck,
  xyYColorCheck,
  xyzColorCheck,
} from "../../helpers/color-checks";
import { ColorCheckers } from "../../interfaces/converters.interface";

export const colorCheckerMap: ColorCheckers = {
  hex: hexColorCheck,
  rgb: rgbColorCheck,
  hsl: hslColorCheck,
  hsv: hsvColorCheck,
  hwb: hwbColorCheck,
  hcl: hclColorCheck,
  lab: labColorCheck,
  lch: lchColorCheck,
  luv: luvColorCheck,
  cmyk: cmykColorCheck,
  ryb: rybColorCheck,
  xyz: xyzColorCheck,
  xyy: xyYColorCheck,
};
