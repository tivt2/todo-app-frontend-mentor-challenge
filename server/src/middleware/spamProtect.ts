import { NextFunction, Request, Response } from "express";

export const spamProtect = (() => {
  let requestTimeOutIps: { [key: string]: number } = {};

  const AMOUNT_UNTIL_REQ_LOCK = 2;

  const timeOutIp = (ip: string) => {
    console.log(requestTimeOutIps);
    if (!(ip in requestTimeOutIps)) {
      requestTimeOutIps[ip] = 0;

      const inactiviteIntervalCheck = setInterval(() => {
        if (requestTimeOutIps[ip] === 0) {
          clearInterval(inactiviteIntervalCheck);
          delete requestTimeOutIps[ip];
        }
      }, 15000);
    }

    if (requestTimeOutIps[ip] > AMOUNT_UNTIL_REQ_LOCK) {
      setTimeout(() => delete requestTimeOutIps[ip], 3000);
      return;
    }

    setTimeout(() => requestTimeOutIps[ip]--, 1000);
    requestTimeOutIps[ip]++;
  };

  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("checking for spam");
    if (!req.headers.origin)
      return res.status(403).json({ message: "No origin" });

    console.log("adding to ipList");
    timeOutIp(req.headers.origin);

    if (requestTimeOutIps[req.headers.origin] > AMOUNT_UNTIL_REQ_LOCK) {
      console.log("spamming");
      return res.status(403).json({ message: "Spamming" });
    }

    next();
  };
})();
