import path from "node:path";

import EmailTemplates from "email-templates";
import nodemailer, { Transporter } from "nodemailer";

import { configs } from "../configs";
import { allTemplates } from "../constants";
import { EEmailActions } from "../enums/email-action.enum";

class EmailService {
  private transporter: Transporter;
  private templateParser;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_EMAIL_PASSWORD,
      },
    });

    this.templateParser = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "src", "statics"),
        options: {
          extension: "hbs",
        },
      },
      //Для створення і читання файлів css. Вбудована бібліотека
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "src", "statics", "css"),
        },
      },
    });
  }

  public async sendMail(email: string, emailAction: EEmailActions) {
    const templateInfo = allTemplates[emailAction];
    const html = await this.templateParser.render(templateInfo.templateName);
    return this.transporter.sendMail({
      from: "No reply",
      to: email, //вказуємо імейл який ми прийняли в ф-ї
      subject: templateInfo.subject,
      html,
    });
  }
}

export const emailService = new EmailService();
