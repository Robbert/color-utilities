import { ycCbcCrcToSrgb } from './../conversions/yccbccrc-conversions';
/**
 * @license
 * Copyright Slavko Mihajlovic All Rights Reserved.
 *
 * Use of this source code is governed by an ISC-style license that can be
 * found at https://opensource.org/license/isc-license-txt/
 */

import {
  CMY,
  CMYK,
  CMYK_M,
  CMY_M,
  HCL,
  HCL_M,
  HCY,
  HCY_M,
  HSI,
  HSL,
  HSL_M,
  HSV,
  HSV_M,
  HWB,
  HWB_M,
  LAB,
  LAB_M,
  LCH,
  LCH_M,
  LMS,
  LUV,
  RGB,
  RGB_M,
  RYB,
  RYB_M,
  TSL,
  UVW,
  XYY,
  XYZ,
  YCbCr,
  YCoCg,
  YDbDr,
  YIQ,
  YPbPr,
  YUV,
  YcCbcCrc,
  xvYCC,
} from "../interfaces/color-spaces.interface";
import { ColorCheckers } from "../interfaces/converters.interface";
import { FULL_HEX, HEX } from "../regex";
import { ColorSpaceUnion } from "../types/colors";
import { gamutCheck } from "./formats-and-checks";

/**
 * Checks color values and converts the color from
 * shorthand naming to full naming ({r, b, g} -> {red, green, blue})
 * @param {string} space color type / space
 * @param {ColorSpaceUnion} color - color data
 * @returns {ColorSpaceUnion} returns back the same color
 * @throws Color data is incorrect
 */
export const checkAndFormat = (
  space: string,
  color: ColorSpaceUnion
): ColorSpaceUnion => {
  const rgbCheck = new RegExp(/rgb|ps5/g);
  if (rgbCheck.exec(space)) return rgbColorCheck(color as RGB | RGB_M);
  const lchCheck = new RegExp(/lch/g);
  if (lchCheck.exec(space)) return lchColorCheck(color as LCH | LCH_M);
  else return colorCheckerMap[space as keyof ColorCheckers](color);
};

/**
 * Checks if all color values are numeric
 * @param {ColorSpaceUnion} color - color data
 * @returns {ColorSpaceUnion} returns back the same color
 * @throws Color data is incorrect
 */
export const colorCheck = (color: ColorSpaceUnion): ColorSpaceUnion => {
  const entries = Object.entries(color);
  entries.forEach((entry) => {
    if (isNaN(entry[1])) {
      throw new Error(`Color data is incorrect: ${entry[0]} is not a number.`);
    }
  });
  return color;
};

/**
 * Checks if all CMY values are numeric
 * converts from CMY_M to CMY if needed
 * @param {CMY | CMY_M} color - color data
 * @returns {CMY} returns back the same color
 * @throws Color data is incorrect
 */
const cmyColorCheck = (color: CMY | CMY_M): CMY => {
  const values = Object.values(colorCheck(color));
  return {
    cyan: values[0],
    magenta: values[1],
    yellow: values[2],
  };
};

/**
 * Checks if all CMYK values are numeric
 * converts from CMYK_M to CMYK if needed
 * @param {CMYK | CMYK_M} color - color data
 * @returns {CMYK} returns back the same color
 * @throws Color data is incorrect
 */
const cmykColorCheck = (color: CMYK | CMYK_M): CMYK => {
  const values = Object.values(colorCheck(color));
  return {
    cyan: values[0],
    magenta: values[1],
    yellow: values[2],
    key: values[3],
  };
};

/**
 * Checks if all HCL values are numeric
 * converts from HCL_M to HCL if needed
 * @param {HCL | HCL_M} color - color data
 * @returns {HCL} returns back the same color
 * @throws Color data is incorrect
 */
const hclColorCheck = (color: HCL | HCL_M): HCL => {
  const values = Object.values(colorCheck(color));
  return { hue: values[0], chroma: values[1], luminance: values[2] };
};

/**
 * Checks if all HCY values are numeric
 * converts from HCY_M to HCY if needed
 * @param {HCY | HCY_M} color - color data
 * @returns {HCY} returns back the same color
 * @throws Color data is incorrect
 */
const hcyColorCheck = (color: HCY | HCY_M): HCY => {
  const values = Object.values(colorCheck(color));
  return { hue: values[0], chroma: values[1], Yluminance: values[2] };
};

/**
 * Checks if hex value is in a proper format
 * @param {string} color - color hex string
 * @returns {strings} returns back the same color
 * @throws Color data is incorrect
 */
const hexColorCheck = (color: string): string => {
  if (new RegExp(FULL_HEX).exec(color)) return color.slice(1).toUpperCase();
  else if (new RegExp(HEX).exec(color)) return color.toUpperCase();
  else
    throw new Error(
      "Color data is incorrect: color is not a proper hex value."
    );
};

/**
 * Checks if all HSI values are numeric
 * converts from HSI_M to HSI if needed
 * @param {HSI} color - color data
 * @returns {HSI} returns back the same color
 * @throws Color data is incorrect
 */
const hsiColorCheck = (color: HSI): HSI => {
  const values = Object.values(colorCheck(color));
  return { hue: values[0], saturation: values[1], intensity: values[2] };
};

/**
 * Checks if all HSL values are numeric
 * converts from HSL_M to HSL if needed
 * @param {HSL | HSL_M} color - color data
 * @returns {HSL} returns back the same color
 * @throws Color data is incorrect
 */
const hslColorCheck = (color: HSL | HSL_M): HSL => {
  const values = Object.values(colorCheck(color));
  return { hue: values[0], saturation: values[1], lightness: values[2] };
};

/**
 * Checks if all HSV values are numeric
 * converts from HSV_M to HSV if needed
 * @param {HSV | HSV_M} color - color data
 * @returns {HSV} returns back the same color
 * @throws Color data is incorrect
 */
const hsvColorCheck = (color: HSV | HSV_M): HSV => {
  const values = Object.values(colorCheck(color));
  return { hue: values[0], saturation: values[1], value: values[2] };
};

/**
 * Checks if all HWB values are numeric
 * converts from HWB_M to HWB if needed
 * @param {HWB | HWB_M} color - color data
 * @returns {HWB} returns back the same color
 * @throws Color data is incorrect
 */
const hwbColorCheck = (color: HWB | HWB_M): HWB => {
  const values = Object.values(colorCheck(color));
  return { hue: values[0], whiteness: values[1], blackness: values[2] };
};

/**
 * Checks if all LAB values are numeric
 * converts from LAB_M to LAB if needed
 * @param {LAB | LAB_M} color - color data
 * @returns {LAB} returns back the same color
 * @throws Color data is incorrect
 */
const labColorCheck = (color: LAB | LAB_M): LAB => {
  const values = Object.values(colorCheck(color));
  return { luminance: values[0], a: values[1], b: values[2] };
};

/**
 * Checks if all LCH values are numeric
 * converts from LCH_M to LCH if needed
 * @param {LCH | LCH_M} color - color data
 * @returns {LCH} returns back the same color
 * @throws Color data is incorrect
 */
const lchColorCheck = (color: LCH | LCH_M): LCH => {
  const values = Object.values(colorCheck(color));
  return { lightness: values[0], chroma: values[1], hue: values[2] };
};

/**
 * Checks if all LMS values are numeric
 * @param {LMS} color - color data
 * @returns {LMS} returns back the same color
 * @throws Color data is incorrect
 */
const lmsColorCheck = (color: LMS): LMS => {
  const values = Object.values(colorCheck(color));
  return { long: values[0], medium: values[1], short: values[2] };
};

/**
 * Checks if all LUV values are numeric
 * @param {LUV} color - color data
 * @returns {LUV} returns back the same color
 * @throws Color data is incorrect
 */
const luvColorCheck = (color: LUV): LUV => {
  const values = Object.values(colorCheck(color));
  return { L: values[0], u: values[1], v: values[2] };
};

/**
 * Checks if all RGB values are numeric as well as if the color is in Gamut
 * converts from RGB_M to RGB if needed
 * @param {RGB | RGB_M} color - color data
 * @returns {RGB} returns back the same color
 * @throws Color data is incorrect
 */
const rgbColorCheck = (color: RGB | RGB_M): RGB => {
  const values = Object.values(colorCheck(color));
  return {
    red: values[0],
    green: values[1],
    blue: values[2],
    inGamut:
      gamutCheck(values[0]) && gamutCheck(values[1]) && gamutCheck(values[2]),
  };
};

/**
 * Checks if all RYB values are numeric
 * converts from RYB_M to RYB if needed
 * @param {RYB | RYB_M} color - color data
 * @returns {RYB} returns back the same color
 * @throws Color data is incorrect
 */
const rybColorCheck = (color: RYB | RYB_M): RYB => {
  const values = Object.values(colorCheck(color));
  return { red: values[0], yellow: values[1], blue: values[2] };
};

/**
 * Checks if all TSL values are numeric
 * @param {TSL} color - color data
 * @returns {TSL} returns back the same color
 * @throws Color data is incorrect
 */
const tslColorCheck = (color: TSL): TSL => {
  const values = Object.values(colorCheck(color));
  return { tint: values[0], saturation: values[1], lightness: values[2] };
};

/**
 * Checks if all UVW values are numeric
 * @param {UVW} color - color data
 * @returns {UVW} returns back the same color
 * @throws Color data is incorrect
 */
const uvwColorCheck = (color: UVW): UVW => {
  const values = Object.values(colorCheck(color));
  return { u: values[0], v: values[1], w: values[2] };
};

/**
 * Checks if all xvYCC values are numeric
 * @param {xvYCC} color - color data
 * @returns {xvYCC} returns back the same color
 * @throws Color data is incorrect
 */
const xvYccColorCheck = (color: xvYCC): xvYCC => {
  const values = Object.values(color);
  return { Y: values[0], Cb: values[1], Cr: values[2] };
};

/**
 * Checks if all XYY values are numeric
 * @param {XYY} color - color data
 * @returns {XYY} returns back the same color
 * @throws Color data is incorrect
 */
const xyYColorCheck = (color: XYY): XYY => {
  const values = Object.values(color);
  return { x: values[0], y: values[1], Y: values[2] };
};

/**
 * Checks if all XYZ values are numeric
 * @param {XYZ} color - color data
 * @returns {XYZ} returns back the same color
 * @throws Color data is incorrect
 */
const xyzColorCheck = (color: XYZ): XYZ => {
  const values = Object.values(color);
  return { x: values[0], y: values[1], z: values[2] };
};

/**
 * Checks if all YCbCr values are numeric
 * @param {YCbCr} color - color data
 * @returns {YCbCr} returns back the same color
 * @throws Color data is incorrect
 */
const yCbCrColorCheck = (color: YCbCr): YCbCr => {
  const values = Object.values(color);
  return { Y: values[0], Cb: values[1], Cr: values[2] };
};

/**
 * Checks if all YcCbcCrc values are numeric
 * @param {YcCbcCrc} color - color data
 * @returns {YcCbcCrc} returns back the same color
 * @throws Color data is incorrect
 */
const ycCbcCrcColorCheck = (color: YcCbcCrc): YcCbcCrc => {
  const values = Object.values(color);
  return { Yc: values[0], Cbc: values[1], Crc: values[2] };
};

/**
 * Checks if all YCoCg values are numeric
 * @param {YCoCg} color - color data
 * @returns {YCoCg} returns back the same color
 * @throws Color data is incorrect
 */
const yCoCgColorCheck = (color: YCoCg): YCoCg => {
  const values = Object.values(color);
  return { Y: values[0], Co: values[1], Cg: values[2] };
};

/**
 * Checks if all YDbDr values are numeric
 * @param {YDbDr} color - color data
 * @returns {YDbDr} returns back the same color
 * @throws Color data is incorrect
 */
const yDbDrColorCheck = (color: YDbDr): YDbDr => {
  const values = Object.values(color);
  return { Y: values[0], Db: values[1], Dr: values[2] };
};

/**
 * Checks if all YIQ values are numeric
 * @param {YIQ} color - color data
 * @returns {YIQ} returns back the same color
 * @throws Color data is incorrect
 */
const yiqColorCheck = (color: YIQ ): YIQ  => {
  const values = Object.values(color);
  return { Y: values[0], I: values[1], Q: values[2] };
};

/**
 * Checks if all YPbPr values are numeric
 * @param {YPbPr} color - color data
 * @returns {YPbPr} returns back the same color
 * @throws Color data is incorrect
 */
const yPbPrColorCheck = (color: YPbPr): YPbPr => {
  const values = Object.values(color);
  return { Y: values[0], Pb: values[1], Pr: values[2] };
};

/**
 * Checks if all YUV values are numeric
 * @param {YUV} color - color data
 * @returns {YUV} returns back the same color
 * @throws Color data is incorrect
 */
const yuvColorCheck = (color: YUV ): YUV  => {
  const values = Object.values(color);
  return { y: values[0], u: values[1], v: values[2] };
};

/**
 * Color checker function map
 */
const colorCheckerMap: ColorCheckers = {
  cmy: cmyColorCheck,
  cmyk: cmykColorCheck,
  hcl: hclColorCheck,
  hcy: hcyColorCheck,
  hex: hexColorCheck,
  hsi: hsiColorCheck,
  hsl: hslColorCheck,
  hsv: hsvColorCheck,
  hwb: hwbColorCheck,
  lab: labColorCheck,
  lch: lchColorCheck,
  lms: lmsColorCheck,
  luv: luvColorCheck,
  rgb: rgbColorCheck,
  ryb: rybColorCheck,
  tsl: tslColorCheck,
  uvw: uvwColorCheck,
  xvycc: xvYccColorCheck,
  xyy: xyYColorCheck,
  xyz: xyzColorCheck,
  ycbcr: yCbCrColorCheck,
  yccbccrc: ycCbcCrcToSrgb,
  ycocg: yCoCgColorCheck,
  ydbdr: yDbDrColorCheck,
  yiq: yiqColorCheck,
  ypbpr: yPbPrColorCheck,
  yuv: yuvColorCheck
};
