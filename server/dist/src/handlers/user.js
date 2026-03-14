"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetProfile = handleGetProfile;
exports.handleUpdateProfile = handleUpdateProfile;
exports.handleUpdateStatus = handleUpdateStatus;
const helpers_1 = require("../utils/helpers");
async function handleGetProfile(request, reply) {
    try {
        if (!request.userId)
            throw new helpers_1.ApiError(401, 'Unauthorized');
        const user = await helpers_1.prisma.user.findUnique({ where: { id: request.userId } });
        if (!user)
            throw new helpers_1.ApiError(404, 'User not found');
        return reply.send({
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            avatar: user.avatar,
            isRoomLead: user.isRoomLead,
            currentRoomId: user.currentRoomId,
        });
    }
    catch (error) {
        if (error instanceof helpers_1.ApiError)
            return reply.code(error.statusCode).send({ error: error.message });
        console.error('Get profile error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
}
async function handleUpdateProfile(request, reply) {
    try {
        if (!request.userId)
            throw new helpers_1.ApiError(401, 'Unauthorized');
        // Only nickname and avatar are persisted server-side; all personal data lives on-device.
        const updateData = {};
        for (const field of ['nickname', 'avatar']) {
            if (field in request.body)
                updateData[field] = request.body[field];
        }
        const user = await helpers_1.prisma.user.update({
            where: { id: request.userId },
            data: updateData,
        });
        return reply.send({
            id: user.id,
            nickname: user.nickname,
            avatar: user.avatar,
            message: 'Profile updated successfully',
        });
    }
    catch (error) {
        if (error instanceof helpers_1.ApiError)
            return reply.code(error.statusCode).send({ error: error.message });
        console.error('Update profile error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
}
async function handleUpdateStatus(request, reply) {
    // Status (emoji + message) is local-only; no server persistence needed.
    // This endpoint is kept for potential future relay use but is a no-op for now.
    return reply.code(204).send();
}
//# sourceMappingURL=user.js.map