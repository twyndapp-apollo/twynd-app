import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const ModelName: {
    readonly User: "User";
    readonly Room: "Room";
    readonly RoomMember: "RoomMember";
    readonly RoomAccess: "RoomAccess";
    readonly ChatSession: "ChatSession";
    readonly Message: "Message";
    readonly Subscription: "Subscription";
    readonly Milestone: "Milestone";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly authProvider: "authProvider";
    readonly authProviderId: "authProviderId";
    readonly nickname: "nickname";
    readonly avatar: "avatar";
    readonly birthDate: "birthDate";
    readonly zodiacSign: "zodiacSign";
    readonly age: "age";
    readonly language: "language";
    readonly country: "country";
    readonly description: "description";
    readonly showAge: "showAge";
    readonly showZodiac: "showZodiac";
    readonly showBirthday: "showBirthday";
    readonly showLocation: "showLocation";
    readonly currentRoomId: "currentRoomId";
    readonly connectionPartnerId: "connectionPartnerId";
    readonly isRoomLead: "isRoomLead";
    readonly lastActiveAt: "lastActiveAt";
    readonly statusEmoji: "statusEmoji";
    readonly statusMessage: "statusMessage";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const RoomScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly qrCodeUrl: "qrCodeUrl";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly roomStartedAt: "roomStartedAt";
    readonly updatedAt: "updatedAt";
};
export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum];
export declare const RoomMemberScalarFieldEnum: {
    readonly id: "id";
    readonly roomId: "roomId";
    readonly userId: "userId";
    readonly role: "role";
    readonly joinedAt: "joinedAt";
};
export type RoomMemberScalarFieldEnum = (typeof RoomMemberScalarFieldEnum)[keyof typeof RoomMemberScalarFieldEnum];
export declare const RoomAccessScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly createdAt: "createdAt";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly usedByUserId: "usedByUserId";
};
export type RoomAccessScalarFieldEnum = (typeof RoomAccessScalarFieldEnum)[keyof typeof RoomAccessScalarFieldEnum];
export declare const ChatSessionScalarFieldEnum: {
    readonly id: "id";
    readonly roomId: "roomId";
    readonly gameType: "gameType";
    readonly title: "title";
    readonly results: "results";
    readonly lastMessageAt: "lastMessageAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ChatSessionScalarFieldEnum = (typeof ChatSessionScalarFieldEnum)[keyof typeof ChatSessionScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: "id";
    readonly chatSessionId: "chatSessionId";
    readonly senderId: "senderId";
    readonly content: "content";
    readonly contentType: "contentType";
    readonly isRead: "isRead";
    readonly readAt: "readAt";
    readonly reactionToId: "reactionToId";
    readonly createdAt: "createdAt";
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const SubscriptionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly status: "status";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly isTrialPeriod: "isTrialPeriod";
    readonly trialStartDate: "trialStartDate";
    readonly trialEndDate: "trialEndDate";
    readonly referralCode: "referralCode";
    readonly referralCount: "referralCount";
    readonly referralExtensionDays: "referralExtensionDays";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum];
export declare const MilestoneScalarFieldEnum: {
    readonly id: "id";
    readonly roomId: "roomId";
    readonly type: "type";
    readonly milestoneTitle: "milestoneTitle";
    readonly description: "description";
    readonly aiGeneratedPoem: "aiGeneratedPoem";
    readonly awardedAt: "awardedAt";
};
export type MilestoneScalarFieldEnum = (typeof MilestoneScalarFieldEnum)[keyof typeof MilestoneScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly AnyNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map