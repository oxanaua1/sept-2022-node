import * as jwt from "jsonwebtoken";

import { configs } from "../configs";
import { ETokenType } from "../enums";
import { ApiError } from "../errors";
import { ITokenPair, ITokenPayload } from "../types";

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
}

export const tokenService = new TokenService();

//payload - data, яку ми включимо в токін, щою потім коли ми будемо верифікувати токін, цю дату звідти дістанемо
//цю payload - data будемо приймати ззовні як об'єкт
//другий параметр - це секретне слово, яким ми цей токін підписуємо
//третій парамерт - опції, expiresIn - ск токін буде жити
