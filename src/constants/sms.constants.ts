import { ESmsActionEnum } from "../enums";

export const smsTemplates: { [key: string]: string } = {
  [ESmsActionEnum.WELCOME]: "Great to see you in our app!",
  [ESmsActionEnum.FORGOT_PASSWORD]:
    "Pls, follow all steps and restore your password",
};
