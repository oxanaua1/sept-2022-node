export interface IError extends Error {
  status: number;
}

export interface IMessage {
  message: string;
}
export interface ICommonResponse<T> extends IMessage {
  data: T;
}

//для визначення що ми отримаємо з реквесту - req в user.middleware=>const fieldValue = req[from][fieldName];
interface IIndex {
  [key: string]: any;
}

export type IRequest = IIndex;
