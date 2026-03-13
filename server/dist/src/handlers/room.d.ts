import type { FastifyRequest, FastifyReply } from 'fastify';
export declare function handleCreateRoom(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function handleGetRoom(request: FastifyRequest<{
    Params: {
        roomId: string;
    };
}>, reply: FastifyReply): Promise<never>;
export declare function handleJoinRoom(request: FastifyRequest<{
    Body: {
        roomCode: string;
    };
}>, reply: FastifyReply): Promise<never>;
export declare function handleGetQRCode(request: FastifyRequest<{
    Params: {
        roomId: string;
    };
}>, reply: FastifyReply): Promise<never>;
export declare function handleAcceptConnection(request: FastifyRequest<{
    Body: {
        leadsUserId: string;
        role: string;
    };
}>, reply: FastifyReply): Promise<never>;
//# sourceMappingURL=room.d.ts.map