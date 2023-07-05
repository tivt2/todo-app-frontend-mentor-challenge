declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      PORT: number;
      DATABASE_URL: string;
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
