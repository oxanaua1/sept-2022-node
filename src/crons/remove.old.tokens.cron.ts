import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Token } from "../models"; //щоб таймзона відповідала нашій таймзоні

dayjs.extend(utc);

const tokenRemover = async (): Promise<void> => {
  const previousMonth = dayjs().utc().subtract(1, "month"); //last month

  await Token.deleteMany({ createdAt: { $lte: previousMonth } }); //less than equal previousMonth
};

export const removeOldTokens = new CronJob("0 0 * * *", tokenRemover);
// export const removeOldTokens = new CronJob("* * * * * *", tokenRemover);

//https://crontab.guru
//https://day.js.org/docs/en/display/format => // const previousMonth = dayjs().format("DD/MM/YYYY");
