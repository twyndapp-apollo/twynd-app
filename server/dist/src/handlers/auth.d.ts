import type { FastifyRequest, FastifyReply } from 'fastify';
interface SignUpBody {
    email: string;
    authProvider: string;
    authProviderId?: string;
}
interface SignInBody {
    email: string;
}
export declare function handleSignUp(request: FastifyRequest<{
    Body: SignUpBody;
}>, reply: FastifyReply): Promise<never>;
export declare function handleSignIn(request: FastifyRequest<{
    Body: SignInBody;
}>, reply: FastifyReply): Promise<never>;
export declare function handleVerifyToken(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export {};
//# sourceMappingURL=auth.d.ts.map