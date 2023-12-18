export type NumericString = `${number}` | number;
export type NodeEnv = 'development' | 'production';
export type LogFormat = 'dev' | 'combined';
export type Credentials = 'true' | 'false';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: NumericString;
      NODE_ENV: NodeEnv;
      DATABASE_URL: string;
      SECRET_KEY: string;
      LOG_FORMAT: LogFormat;
      LOG_DIR: string;
      ORIGIN: string;
      CREDENTIALS: Credentials;
    }
  }
}

export {};
