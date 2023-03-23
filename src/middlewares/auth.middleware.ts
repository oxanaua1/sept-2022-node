import { NextFunction, Request, Response } from "express";

import { EActionTokenType, ETokenType } from "../enums";
import { ApiError } from "../errors";
import { Action, OldPassword, Token } from "../models";
import { passwordService, tokenService } from "../services";

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
  public checkActionToken(type: EActionTokenType) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const actionToken = req.params.token;

        if (!actionToken) {
          throw new ApiError("No token", 401);
        }

        const jwtPayload = tokenService.checkActionToken(actionToken, type);

        const tokenInfo = await Action.findOne({ actionToken });

        if (!tokenInfo) {
          throw new ApiError("Token not valid", 401);
        }

        req.res.locals = { tokenInfo, jwtPayload };
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async checkOldPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = req;
      const { tokenInfo } = req.res.locals;
      //В OldPassword зберігаємо пароль(лі) користувача який намагається відновити пароль (auth.service => public async forgotPassword)
      const oldPasswords = await OldPassword.find({
        _user_id: tokenInfo._user_id,
      });

      if (!oldPasswords) return next();

      await Promise.all(
        oldPasswords.map(async (record) => {
          const isMatched = await passwordService.compare(
            body.password, //пароль новий що передає користувач
            record.password //пароль що є в БД
          );
          if (isMatched) {
            throw new ApiError(
              "Your new password is the same as your old one!",
              409
            );
          }
        })
      );

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();

//UserMiddleware = void (нічого не повертає). Якщо ok відправляє- > controller(відправляє користувачу),
// якщо !ok відправляє- > app (throw err)
