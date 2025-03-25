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
const express_1 = __importDefault(require("express"));
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const googleRouter = express_1.default.Router();
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const verifyAdmin = (email) => {
    var _a;
    const admins = (_a = process.env.ADMINS) === null || _a === void 0 ? void 0 : _a.split(',');
    return admins === null || admins === void 0 ? void 0 : admins.includes(email);
};
googleRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: 'Missing token' });
        }
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const jwtToken = jsonwebtoken_1.default.sign({ userId: payload.sub, email: payload.email, name: payload.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            user: {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                isAdmin: verifyAdmin(payload.email)
            },
            token: jwtToken
        });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Authentication failed' });
    }
}));
exports.default = googleRouter;
