"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetProfile = handleGetProfile;
exports.handleUpdateProfile = handleUpdateProfile;
exports.handleUpdateStatus = handleUpdateStatus;
const helpers_1 = require("../utils/helpers");
async function handleGetProfile(request, reply) {
    try {
        if (!request.userId) {
            throw new helpers_1.ApiError(401, 'Unauthorized');
        }
        const user = await helpers_1.prisma.user.findUnique({
            where: { id: request.userId },
        });
        if (!user) {
            throw new helpers_1.ApiError(404, 'User not found');
        }
        return reply.send({
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            avatar: user.avatar,
            birthDate: user.birthDate,
            zodiacSign: user.zodiacSign,
            age: user.age,
            language: user.language,
            country: user.country,
            description: user.description,
            statusEmoji: user.statusEmoji,
            statusMessage: user.statusMessage,
            showAge: user.showAge,
            showZodiac: user.showZodiac,
            showBirthday: user.showBirthday,
            showLocation: user.showLocation,
            isRoomLead: user.isRoomLead,
            currentRoomId: user.currentRoomId,
        });
    }
    catch (error) {
        if (error instanceof helpers_1.ApiError) {
            return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Get profile error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
}
async function handleUpdateProfile(request, reply) {
    try {
        if (!request.userId) {
            throw new helpers_1.ApiError(401, 'Unauthorized');
        }
        const updateData = {};
        const allowedFields = [
            'nickname',
            'avatar',
            'birthDate',
            'zodiacSign',
            'age',
            'language',
            'country',
            'description',
            'statusEmoji',
            'statusMessage',
            'showAge',
            'showZodiac',
            'showBirthday',
            'showLocation',
        ];
        for (const field of allowedFields) {
            if (field in request.body) {
                updateData[field] = request.body[field];
            }
        }
        const user = await helpers_1.prisma.user.update({
            where: { id: request.userId },
            data: updateData,
        });
        return reply.send({
            id: user.id,
            nickname: user.nickname,
            avatar: user.avatar,
            language: user.language,
            message: 'Profile updated successfully',
        });
    }
    catch (error) {
        if (error instanceof helpers_1.ApiError) {
            return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Update profile error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
}
async function handleUpdateStatus(request, reply) {
    try {
        if (!request.userId) {
            throw new helpers_1.ApiError(401, 'Unauthorized');
        }
        const { emoji, message } = request.body;
        const user = await helpers_1.prisma.user.update({
            where: { id: request.userId },
            data: {
                statusEmoji: emoji,
                statusMessage: message,
            },
        });
        return reply.send({
            statusEmoji: user.statusEmoji,
            statusMessage: user.statusMessage,
        });
    }
    catch (error) {
        if (error instanceof helpers_1.ApiError) {
            return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Update status error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
}
//# sourceMappingURL=user.js.map