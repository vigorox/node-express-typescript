import mongoose from "mongoose";

export interface IUserDocument extends mongoose.Document {
  username: string;
  first: string;
  last: string;
  password: string;
  role: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
  passwordMatches: (password: string, hash: string) => string;
}

export interface IFloorDocument extends mongoose.Document {
  name: string;
  num: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFloorModel extends mongoose.Model<IFloorDocument> {}

export interface IRoomTypeDocument extends mongoose.Document {
  name: string;
  lamps?: {
    name: string;
    chNo: number;
  }[];
  hvacs?: {
    online: number;
    znNo: number;
    chNo: number;
    mode: number;
    setTemp: number;
    realTimer: number;
  }[];
  curtains: {
    name: string;
    chNo: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoomTypeModel extends mongoose.Model<IRoomTypeDocument> {
  _startTime: Date;
}

export interface IRoomDocument extends mongoose.Document {
  name: string;
  ip: string;
  floor: IFloorDocument;
  roomType: IRoomTypeDocument;
  connected: boolean;
  services: number[];
  hvacs?: {
    znNo: number;
    mode: number;
    setTemp: number;
    realTemp: number;
    fanSpeed: number;
  };
  registerDayLeft: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoomModel extends mongoose.Model<IRoomDocument> {}

export interface ISrvMapDocument extends mongoose.Document {
  name: {
    en: string;
    cht: string;
    chs: string;
  };
  srvNo: number;
  order: number;
  enabledTextInLog: string;
  disabledTextInLog: string;
  iconCss: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISrvMapModel extends mongoose.Model<ISrvMapDocument> {}
