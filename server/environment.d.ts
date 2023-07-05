declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      PORT: string;
      DATABASE_URL: string;
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
