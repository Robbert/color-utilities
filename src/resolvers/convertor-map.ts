import { hwbToRgb } from './../converters/hcg-converter';
import { ColorConverters, ToRGBConverters, ToXyzConverters } from "../interfaces/converters.interface";
import {
  adobeRgbToXyz,
  appleRgbToXyz,
  bestRgbToXyz,
  betaRgbToXyz,
  bruceRgbToXyz,
  cieRgbToXyz,
  colorMatchRgbToXyz,
  donRgb4ToXyz,
  etkaSpacePs5ToXyz,
  ntscRgbToXyz,
  palSecamRgbToXyz,
  proPhotoRgbToXyz,
  rgbTo1_0rgb,
  rgbToAnsi16,
  rgbToAnsi256,
  rgbToCmyk,
  rgbToHcg,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
  rgbToHwb,
  rgbToLch_ab,
  rgbToLch_uv,
  rgbToXyz,
  smpteCRgbToXyz,
  wideGamutRgbToXyz,
} from "../converters/rgb-converter";
import { isWebSafeRGB } from "../helpers";
import { hexToRgb } from "../converters/hex-converter";
import { cmykToRgb } from "../converters/cmyk-converter";
import { hslToRgb } from "../converters/hsl-converter";
import { hsvToRgb } from "../converters/hsv-converter";
import { xyzToAdobeRgb, xyzToAppleRgb, xyzToBestRgb, xyzToBetaRgb, xyzToBruceRgb, xyzToCieRgb, xyzToColorMatchRgb, xyzToDonRgb4, xyzToEtkaSpacePs5, xyzToLab, xyzToLuv, xyzToNtscRgb, xyzToPalSecamRgb, xyzToProPhotoRgb, xyzToRgb, xyzToSmpteCRgb, xyzToWideGamutRgb } from '../converters/xyz-converter';
import { labToXyz } from '../converters/lab-converter';
import { luvToXyz } from '../converters/luv-converter';

export const rgbConverters: ColorConverters = {
  adobe_98_rgb: { fun: xyzToAdobeRgb, from: 'xyz' },
  apple_rgb: { fun: xyzToAppleRgb, from: 'xyz' },
  ansi16: { fun: rgbToAnsi16, from: 'rgb' },
  ansi256: { fun: rgbToAnsi256, from: 'rgb' },
  best_rgb: { fun: xyzToBestRgb, from: 'xyz' },
  beta_rgb: { fun: xyzToBetaRgb, from: 'xyz' },
  bruce_rgb: { fun: xyzToBruceRgb, from: 'xyz' },
  cie_rgb: { fun: xyzToCieRgb, from: 'xyz' },
  color_match_rgb: { fun: xyzToColorMatchRgb, from: 'xyz' },
  cmyk: { fun: rgbToCmyk, from: 'rgb' },
  don_rgb_4: { fun: xyzToDonRgb4, from: 'xyz' },
  etka_space_ps5: { fun: xyzToEtkaSpacePs5, from: 'xyz' },
  hcg: { fun: rgbToHcg, from: 'rgb' },
  hex: { fun: rgbToHex, from: 'rgb' },
  hsl: { fun: rgbToHsl, from: 'rgb' },
  hsv: { fun: rgbToHsv, from: 'rgb' },
  hwb: { fun: rgbToHwb, from: 'rgb' },
  lab: { fun: xyzToLab, from: 'xyz' },
  lch_ab: { fun: rgbToLch_ab, from: 'rgb' },
  lch_uv: { fun: rgbToLch_uv, from: 'rgb' },
  luv: { fun: xyzToLuv, from: 'xyz' },
  ntsc_rgb: { fun: xyzToNtscRgb, from: 'xyz' },
  pal_secam_rgb: { fun: xyzToPalSecamRgb, from: 'xyz' },
  pro_photo_rgb: { fun: xyzToProPhotoRgb, from: 'xyz' },
  rgb_0_1: { fun: rgbTo1_0rgb, from: 'rgb' },
  rgb: { fun: xyzToRgb, from: 'xyz' },
  smpte_c_rgb: { fun: xyzToSmpteCRgb, from: 'xyz' },
  xyz: { fun: rgbToXyz, from: 'rgb' },
  web_safe: { fun: isWebSafeRGB, from: 'rgb' },
  wide_gamut_rgb: { fun: xyzToWideGamutRgb, from: 'xyz' },
};

export const toRgbConverters: ToRGBConverters = {
  hex: hexToRgb,
  cmyk: cmykToRgb,
  hsl: hslToRgb,
  hsv: hsvToRgb,
  hwb: hwbToRgb,
  xyz:  xyzToRgb,
}

export const toXyzConverters: ToXyzConverters = {
  adobe_98_rgb: adobeRgbToXyz,
  apple_rgb: appleRgbToXyz,
  best_rgb: bestRgbToXyz,
  beta_rgb: betaRgbToXyz,
  bruce_rgb: bruceRgbToXyz,
  cie_rgb: cieRgbToXyz,
  color_match_rgb: colorMatchRgbToXyz,
  don_rgb_4: donRgb4ToXyz,
  etka_space_ps5: etkaSpacePs5ToXyz,
  lab: labToXyz,
  luv: luvToXyz,
  ntsc_rgb: ntscRgbToXyz,
  pal_secam_rgb: palSecamRgbToXyz,
  pro_photo_rgb: proPhotoRgbToXyz,
  rgb: rgbToXyz,
  smpte_c_rgb: smpteCRgbToXyz,
  wide_gamut_rgb: wideGamutRgbToXyz
}
