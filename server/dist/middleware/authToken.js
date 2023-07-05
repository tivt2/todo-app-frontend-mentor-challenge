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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.count("Trying to auth token");
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
    if (!token) {
        console.log("token not found");
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        console.log("reading token");
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.userId;
        next();
    }
    catch (err) {
        console.log("token problem");
        res.status(401).json({ message: "Unauthorized" });
    }
});
exports.authToken = authToken;
//# sourceMappingURL=authToken.js.map