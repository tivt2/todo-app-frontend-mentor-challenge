declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      PORT: number;
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
