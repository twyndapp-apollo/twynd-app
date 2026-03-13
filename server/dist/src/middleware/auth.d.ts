import type { FastifyRequest, FastifyReply } from 'fastify';
declare module 'fastify' {
    interface FastifyRequest {
        userId?: string;
    }
}
export declare function authenticateToken(request: FastifyRequest, reply: FastifyReply): Promise<undefined>;
export declare function generateToken(userId: string): string;
//# sourceMappingURL=auth.d.ts.map