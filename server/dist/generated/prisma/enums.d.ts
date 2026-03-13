export declare const AuthProvider: {
    readonly EMAIL: "EMAIL";
    readonly GOOGLE: "GOOGLE";
    readonly FACEBOOK: "FACEBOOK";
    readonly TIKTOK: "TIKTOK";
};
export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];
export declare const Gender: {
    readonly MALE: "MALE";
    readonly FEMALE: "FEMALE";
    readonly OTHER: "OTHER";
    readonly PREFER_NOT_TO_SAY: "PREFER_NOT_TO_SAY";
};
export type Gender = (typeof Gender)[keyof typeof Gender];
export declare const RoomStatus: {
    readonly WAITING_FOR_PARTNER: "WAITING_FOR_PARTNER";
    readonly ACTIVE: "ACTIVE";
    readonly COMPLETED: "COMPLETED";
    readonly ARCHIVED: "ARCHIVED";
};
export type RoomStatus = (typeof RoomStatus)[keyof typeof RoomStatus];
export declare const RoomMemberRole: {
    readonly LEAD: "LEAD";
    readonly FOLLOWER: "FOLLOWER";
};
export type RoomMemberRole = (typeof RoomMemberRole)[keyof typeof RoomMemberRole];
export declare const SubscriptionStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly EXPIRED: "EXPIRED";
    readonly CANCELLED: "CANCELLED";
};
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];
export declare const MilestoneType: {
    readonly DAYS_7: "DAYS_7";
    readonly DAYS_30: "DAYS_30";
    readonly FEEL_GOOD_COUPLE: "FEEL_GOOD_COUPLE";
    readonly RECONCILED_COUPLE: "RECONCILED_COUPLE";
    readonly CUSTOM: "CUSTOM";
};
export type MilestoneType = (typeof MilestoneType)[keyof typeof MilestoneType];
//# sourceMappingURL=enums.d.ts.map