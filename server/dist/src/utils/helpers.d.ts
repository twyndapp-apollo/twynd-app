export declare const prisma: any;
export declare function generateRoomCode(length?: number): string;
export declare function generateQRCodeUrl(text: string, size?: number): string;
export declare class ApiError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
export declare function validateEmail(email: string): boolean;
export declare function isValidRoom(roomId: string): Promise<boolean>;
//# sourceMappingURL=helpers.d.ts.map