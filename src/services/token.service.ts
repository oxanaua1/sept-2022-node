import * as jwt from "jsonwebtoken";

import { configs } from "../configs";
import { EActionTokenType, ETokenType } from "../enums";
import { ApiError } from "../errors";
import { IActionTokenPayload, ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, configs.REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  public generateActionToken(
    payload: IActionTokenPayload, // id
    tokenType: EActionTokenType //forgot or activate
  ): string {
    let secret = ""; //секретне слово
    try {
      switch (tokenType) {
        case EActionTokenType.activate:
          secret = configs.ACTIVATE_SECRET;
          break;
        case EActionTokenType.forgot:
          secret = configs.FORGOT_SECRET;
          break;
      }
      return jwt.sign(payload, secret, { expiresIn: "7d" }); //Секретним словом (згенер. динамічно) підписую свій токен
    } catch (e) {
      throw new ApiError("Token is not valid", 400);
    }
  }

  public checkToken(
    token: string,
    tokenType = ETokenType.access
  ): ITokenPayload {
    let secret = "";
    try {
      switch (tokenType) {
        case ETokenType.access:
          secret = configs.ACCESS_SECRET;
          break;
        case ETokenType.refresh:
          secret = configs.REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token is not valid", 400);
    }
  }
  public checkActionToken(token: string, tokenType: EActionTokenType) {
    try {
      let secret = "";

      switch (tokenType) {
        case EActionTokenType.forgot:
          secret = configs.FORGOT_SECRET;
          break;
        case EActionTokenType.activate:
          secret = configs.ACTIVATE_SECRET;
          break;
      }

      return jwt.verify(token, secret) as IActionTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }
}

export const tokenService = new TokenService();

//payload - data, яку ми включимо в токін, щою потім коли ми будемо верифікувати токін, цю дату звідти дістанемо
//цю payload - data будемо приймати ззовні як об'єкт
//другий параметр - це секретне слово, яким ми цей токін підписуємо
//третій парамерт - опції, expiresIn - ск токін буде жити
