import type { FastifyRequest, FastifyReply } from 'fastify';
export declare function handleGetProfile(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function handleUpdateProfile(request: FastifyRequest<{
    Body: Record<string, any>;
}>, reply: FastifyReply): Promise<never>;
export declare function handleUpdateStatus(request: FastifyRequest<{
    Body: {
        emoji: string;
        message: string;
    };
}>, reply: FastifyReply): Promise<never>;
//# sourceMappingURL=user.d.ts.map