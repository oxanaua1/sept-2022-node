import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums";
import { ApiError } from "../errors";
import { Token } from "../models";
import { tokenService } from "../services";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");
      if (!accessToken) {
        throw new ApiError("No token", 401);
      }
      const jwtPayload = tokenService.checkToken(accessToken);
      //якби не встановили деф знач в token.service ( tokenType = ETokenType.access)
      // то другий параметр клали б access токін
      const tokenInfo = await Token.findOne({ accessToken }); //accessToken z Token.model

      if (!tokenInfo) {
        throw new ApiError("Token is not valid", 401);
      }
      //req.res.locals.tokenInfo = tokenInfo;
      req.res.locals = { tokenInfo, jwtPayload }; //{} - дозв передавати декілька змінних

      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");
      if (!refreshToken) {
        throw new ApiError("No token", 401);
      }
      const jwtPayload = tokenService.checkToken(
        refreshToken,
        ETokenType.refresh
      );
      const tokenInfo = await Token.findOne({ refreshToken }); //accessToken z Token.model

      if (!tokenInfo) {
        throw new ApiError("Token is not valid", 401);
      }
      //req.res.locals.tokenInfo = tokenInfo;
      req.res.locals = { tokenInfo, jwtPayload };

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();

//UserMiddleware = void (нічого не повертає). Якщо ok відправляє- > controller(відправляє користувачу),
// якщо !ok відправляє- > app (throw err)
