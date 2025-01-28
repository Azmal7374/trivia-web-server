"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const roomSchema = new mongoose_1.Schema({
    roomCode: { type: String, required: true, unique: true }, // Unique Room Code
    leader: { type: String, required: true }, // Room leader's username
    users: [
        {
            username: { type: String, required: true }, // Username of users in the room
        },
    ],
    quizCategories: [{ type: String, required: true }], // Selected quiz categories
    questions: [
        {
            question: { type: String, required: true }, // Question text
            options: [{ type: String, required: true }], // Options for the question
            correctAnswer: { type: String, required: true }, // Correct answer
        },
    ],
    timer: { type: Number, required: true }, // Timer for the room
    qrCode: { type: String, required: true }, // QR Code for the room
    createdAt: { type: Date, default: Date.now }, // Created at timestamp
});
// Create Room Model
const roomModel = mongoose_1.default.model('Room', roomSchema);
exports.default = roomModel;
