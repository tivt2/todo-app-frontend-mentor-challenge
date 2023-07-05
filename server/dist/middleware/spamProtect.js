"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spamProtect = void 0;
exports.spamProtect = (() => {
    let requestTimeOutIps = {};
    const AMOUNT_UNTIL_REQ_LOCK = 2;
    const timeOutIp = (ip) => {
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
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    });
})();
//# sourceMappingURL=spamProtect.js.map