import {
  rgbConverters,
  toRgbConverters,
  toXyzConverters,
} from "./convertor-map";
import { RGB, XYZ } from "../interfaces/color-spaces.interface";

import {
  ColorCheckers,
  ColorConverters,
  ToRGBConverters,
  ToXyzConverters,
} from "../interfaces/converters.interface";
import { ColorExtendedData } from "../interfaces/color-data.interface";
import { ColorSpaceUnion, Spaces } from "../types"
import { colorCheckerMap } from "./color-checker-map";
import { sRgbToXyz } from "../converters/rgb-converter";
import { xyzToSrgb } from "../converters/xyz-converter";

export class ColorResolver {
  xyz!: XYZ;
  rgb!: RGB;

  constructor(
    space: Spaces,
    color: ColorSpaceUnion,
    resolv: (Spaces | 'web_safe')[] = [
      "adobe_98_rgb",
      "apple_rgb",
      "ansi16",
      "ansi256",
      "best_rgb",
      "beta_rgb",
      "bruce_rgb",
      "cie_rgb",
      "color_match_rgb",
      "cmyk",
      "don_rgb_4",
      "eci_rgb_v2",
      "etka_space_ps5",
      "hcg",
      "hex",
      "hsl",
      "hsv",
      "hwb",
      "lab",
      "lch_ab",
      "lch_uv",
      "luv",
      "ntsc_rgb",
      "pal_secam_rgb",
      "pro_photo_rgb",
      "rgb_0_1",
      "rgb",
      "ryb",
      "smpte_c_rgb",
      "web_safe",
      "wide_gamut_rgb",
      "xyz",
      "xyy"
    ]
  ) {
    color = this.checkAndFormat(space, color);
    this[space as keyof this] = color as any;

    if (!this.rgb && !!(new RegExp(/hex|cmyk|hsl|hsv|hwb|xyz/g)).exec(space)) {
      this.rgb = toRgbConverters[space as keyof ToRGBConverters](color);
      if(this.xyz) this.xyz = sRgbToXyz(this.rgb);
    }

    if (!this.xyz && !!(new RegExp(/rgb|lab|luv|ps5/g)).exec(space)) {
      this.xyz = toXyzConverters[space as keyof ToXyzConverters](color);
      if(!this.rgb) this.rgb = xyzToSrgb(this.xyz);
    }
    else this.xyz = toXyzConverters.rgb(this.rgb);

    for (let resolution of resolv) {
      if (!this[resolution as keyof this]) {
        const fun = rgbConverters[resolution as keyof ColorConverters]?.fun as Function;
        const param = rgbConverters[resolution as keyof ColorConverters]?.from as string;
        this[resolution as keyof this] = fun(this[param as keyof this]);
      }
    }
  }

  checkAndFormat(space: Spaces, color: ColorSpaceUnion): ColorSpaceUnion {
    const rgbCheck = new RegExp(/rgb|ps5/g);
    if (rgbCheck.exec(space)) return colorCheckerMap.rgb(color);
    const lchCheck = new RegExp(/lch/g);
    if (lchCheck.exec(space)) return colorCheckerMap.lch(color);
    else return colorCheckerMap[space as keyof ColorCheckers](color);
  }

  data(): Partial<ColorExtendedData> {
    return { ...this };
  }
}
