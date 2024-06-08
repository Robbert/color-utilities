/**
 * @license
 * Copyright Slavko Mihajlovic All Rights Reserved.
 * 
 * Use of this source code is governed by an ISC-style license that can be
 * found at https://opensource.org/license/isc-license-txt/
*/

import { Matrix3x3 } from "../types/math-types";

export interface AdaptiveMatrices {
  A_B: Matrix3x3;
  A_C: Matrix3x3;
  A_D50: Matrix3x3;
  A_D55: Matrix3x3;
  A_D65: Matrix3x3;
  A_D75: Matrix3x3;
  A_E: Matrix3x3;
  A_F2: Matrix3x3;
  A_F7: Matrix3x3;
  A_F11: Matrix3x3;
  B_A: Matrix3x3;
  B_C: Matrix3x3;
  B_D50: Matrix3x3;
  B_D55: Matrix3x3;
  B_D65: Matrix3x3;
  B_D75: Matrix3x3;
  B_E: Matrix3x3;
  B_F2: Matrix3x3;
  B_F7: Matrix3x3;
  B_F11: Matrix3x3;
  C_A: Matrix3x3;
  C_B: Matrix3x3;
  C_D50: Matrix3x3;
  C_D55: Matrix3x3;
  C_D65: Matrix3x3;
  C_D75: Matrix3x3;
  C_E: Matrix3x3;
  C_F2: Matrix3x3;
  C_F7: Matrix3x3;
  C_F11: Matrix3x3;
  D50_A: Matrix3x3;
  D50_B: Matrix3x3;
  D50_C: Matrix3x3;
  D50_D55: Matrix3x3;
  D50_D65: Matrix3x3;
  D50_D75: Matrix3x3;
  D50_E: Matrix3x3;
  D50_F2: Matrix3x3;
  D50_F7: Matrix3x3;
  D50_F11: Matrix3x3;
  D55_A: Matrix3x3;
  D55_B: Matrix3x3;
  D55_C: Matrix3x3;
  D55_D50: Matrix3x3;
  D55_D65: Matrix3x3;
  D55_D75: Matrix3x3;
  D55_E: Matrix3x3;
  D55_F2: Matrix3x3;
  D55_F7: Matrix3x3;
  D55_F11: Matrix3x3;
  D65_A: Matrix3x3;
  D65_B: Matrix3x3;
  D65_C: Matrix3x3;
  D65_D50: Matrix3x3;
  D65_D55: Matrix3x3;
  D65_D75: Matrix3x3;
  D65_E: Matrix3x3;
  D65_F2: Matrix3x3;
  D65_F7: Matrix3x3;
  D65_F11: Matrix3x3;
  D75_A: Matrix3x3;
  D75_B: Matrix3x3;
  D75_C: Matrix3x3;
  D75_D50: Matrix3x3;
  D75_D55: Matrix3x3;
  D75_D65:Matrix3x3;
  D75_E: Matrix3x3;
  D75_F2:Matrix3x3;
  D75_F7: Matrix3x3;
  D75_F11: Matrix3x3;
  E_A: Matrix3x3;
  E_B: Matrix3x3;
  E_C: Matrix3x3;
  E_D50: Matrix3x3;
  E_D55: Matrix3x3;
  E_D65: Matrix3x3;
  E_D75: Matrix3x3;
  E_F2: Matrix3x3;
  E_F7: Matrix3x3;
  E_F11: Matrix3x3;
  F2_A: Matrix3x3;
  F2_B: Matrix3x3;
  F2_C: Matrix3x3;
  F2_D50: Matrix3x3;
  F2_D55: Matrix3x3;
  F2_D65: Matrix3x3;
  F2_D75: Matrix3x3;
  F2_E: Matrix3x3;
  F2_F7: Matrix3x3;
  F2_F11: Matrix3x3;
  F7_A: Matrix3x3;
  F7_B: Matrix3x3;
  F7_C: Matrix3x3;
  F7_D50: Matrix3x3;
  F7_D55: Matrix3x3;
  F7_D65: Matrix3x3;
  F7_D75: Matrix3x3;
  F7_E: Matrix3x3;
  F7_F2: Matrix3x3;
  F7_F11: Matrix3x3;
  F11_A: Matrix3x3;
  F11_B: Matrix3x3;
  F11_C: Matrix3x3;
  F11_D50: Matrix3x3;
  F11_D55:Matrix3x3;
  F11_D65: Matrix3x3;
  F11_D75: Matrix3x3;
  F11_E: Matrix3x3;
  F11_F2: Matrix3x3;
  F11_F7: Matrix3x3;
}