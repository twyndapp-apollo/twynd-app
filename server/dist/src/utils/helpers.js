"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.prisma = void 0;
exports.generateRoomCode = generateRoomCode;
exports.generateQRCodeUrl = generateQRCodeUrl;
exports.validateEmail = validateEmail;
exports.isValidRoom = isValidRoom;
// Use require to import from the generated Prisma client with the correct runtime path
// From dist/src/utils/ -> ../../ goes to dist/ -> generated/prisma/client
const { PrismaClient } = require('../../generated/prisma/client');
exports.prisma = new PrismaClient({
    errorFormat: 'pretty',
});
// Test database connection on startup
exports.prisma.$connect()
    .then(() => {
    console.log('✅ Database connected successfully');
})
    .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    console.error('Make sure PostgreSQL is running and DATABASE_URL is correct');
    process.exit(1);
});
function generateRoomCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
function generateQRCodeUrl(text, size = 300) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
}
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
    }
}
exports.ApiError = ApiError;
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
async function isValidRoom(roomId) {
    const room = await exports.prisma.room.findUnique({ where: { id: roomId } });
    return room !== null;
}
//# sourceMappingURL=helpers.js.map