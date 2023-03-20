import { EEmailActions, ESmsActionEnum } from "../enums";
import { ApiError } from "../errors";
import { Token, User } from "../models";
import { ICredentials, ITokenPair, ITokenPayload, IUser } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { smsService } from "./sms.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      await User.create({
        ...body,
        password: hashedPassword,
      });

      Promise.all([
        smsService.sendSms(body.email, ESmsActionEnum.WELCOME),
        // smsService.sendSms("+380....", ESmsActionEnum.WELCOME),

        //await emailService.sendMail(body.email)
        emailService.sendMail("leyacat11@gmail.com", EEmailActions.WELCOME),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password, //той пароль що ввів користувач
        user.password //вже захешований пароль, що зберігається в БД (там є поле password, а не hashedPassword)
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 404);
      }

      const tokenPair = tokenService.generateTokenPair({
        _id: user._id,
        name: user.name,
      });
      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    tokenInfo: ITokenPair,
    jwtPayload: ITokenPayload
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair({
        _id: jwtPayload._id,
        name: jwtPayload.name,
      });
      await Promise.all([
        Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
        Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
      ]);
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await User.findById(userId);

    const isMatched = await passwordService.compare(oldPassword, user.password);

    if (!isMatched) {
      throw new ApiError("Wrong old password", 400);
    }

    const hashedNewPassword = await passwordService.hash(newPassword);
    await User.updateOne({ _id: user._id }, { password: hashedNewPassword });
  }
}
export const authService = new AuthService();
