import * as jwt from "jsonwebtoken";

import { tokenConstants } from "../constants";
import { ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, tokenConstants.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, tokenConstants.REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}

export const tokenService = new TokenService();

//payload - data, яку ми включимо в токін, щою потім коли ми будемо верифікувати токін, цю дату звідти дістанемо
//цю payload - data будемо приймати ззовні як об'єкт
//другий параметр - це секретне слово, яким ми цей токін підписуємо
//третій парамерт - опції, expiresIn - ск токін буде жити
