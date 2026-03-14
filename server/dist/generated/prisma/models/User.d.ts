import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    authProvider: $Enums.AuthProvider | null;
    authProviderId: string | null;
    nickname: string | null;
    avatar: string | null;
    currentRoomId: string | null;
    connectionPartnerId: string | null;
    isRoomLead: boolean | null;
    lastActiveAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    authProvider: $Enums.AuthProvider | null;
    authProviderId: string | null;
    nickname: string | null;
    avatar: string | null;
    currentRoomId: string | null;
    connectionPartnerId: string | null;
    isRoomLead: boolean | null;
    lastActiveAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    authProvider: number;
    authProviderId: number;
    nickname: number;
    avatar: number;
    currentRoomId: number;
    connectionPartnerId: number;
    isRoomLead: number;
    lastActiveAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    authProvider?: true;
    authProviderId?: true;
    nickname?: true;
    avatar?: true;
    currentRoomId?: true;
    connectionPartnerId?: true;
    isRoomLead?: true;
    lastActiveAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    authProvider?: true;
    authProviderId?: true;
    nickname?: true;
    avatar?: true;
    currentRoomId?: true;
    connectionPartnerId?: true;
    isRoomLead?: true;
    lastActiveAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    authProvider?: true;
    authProviderId?: true;
    nickname?: true;
    avatar?: true;
    currentRoomId?: true;
    connectionPartnerId?: true;
    isRoomLead?: true;
    lastActiveAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId: string | null;
    nickname: string | null;
    avatar: string | null;
    currentRoomId: string | null;
    connectionPartnerId: string | null;
    isRoomLead: boolean;
    lastActiveAt: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    authProvider?: Prisma.EnumAuthProviderFilter<"User"> | $Enums.AuthProvider;
    authProviderId?: Prisma.StringNullableFilter<"User"> | string | null;
    nickname?: Prisma.StringNullableFilter<"User"> | string | null;
    avatar?: Prisma.StringNullableFilter<"User"> | string | null;
    currentRoomId?: Prisma.StringNullableFilter<"User"> | string | null;
    connectionPartnerId?: Prisma.StringNullableFilter<"User"> | string | null;
    isRoomLead?: Prisma.BoolFilter<"User"> | boolean;
    lastActiveAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    currentRoom?: Prisma.XOR<Prisma.RoomNullableScalarRelationFilter, Prisma.RoomWhereInput> | null;
    connectionPartner?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    partnerConnection?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    roomMemberships?: Prisma.RoomMemberListRelationFilter;
    sentMessages?: Prisma.MessageListRelationFilter;
    subscription?: Prisma.XOR<Prisma.SubscriptionNullableScalarRelationFilter, Prisma.SubscriptionWhereInput> | null;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    authProvider?: Prisma.SortOrder;
    authProviderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    nickname?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatar?: Prisma.SortOrderInput | Prisma.SortOrder;
    currentRoomId?: Prisma.SortOrderInput | Prisma.SortOrder;
    connectionPartnerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    isRoomLead?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    currentRoom?: Prisma.RoomOrderByWithRelationInput;
    connectionPartner?: Prisma.UserOrderByWithRelationInput;
    partnerConnection?: Prisma.UserOrderByWithRelationInput;
    roomMemberships?: Prisma.RoomMemberOrderByRelationAggregateInput;
    sentMessages?: Prisma.MessageOrderByRelationAggregateInput;
    subscription?: Prisma.SubscriptionOrderByWithRelationInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    authProviderId?: string;
    currentRoomId?: string;
    connectionPartnerId?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    authProvider?: Prisma.EnumAuthProviderFilter<"User"> | $Enums.AuthProvider;
    nickname?: Prisma.StringNullableFilter<"User"> | string | null;
    avatar?: Prisma.StringNullableFilter<"User"> | string | null;
    isRoomLead?: Prisma.BoolFilter<"User"> | boolean;
    lastActiveAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    currentRoom?: Prisma.XOR<Prisma.RoomNullableScalarRelationFilter, Prisma.RoomWhereInput> | null;
    connectionPartner?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    partnerConnection?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    roomMemberships?: Prisma.RoomMemberListRelationFilter;
    sentMessages?: Prisma.MessageListRelationFilter;
    subscription?: Prisma.XOR<Prisma.SubscriptionNullableScalarRelationFilter, Prisma.SubscriptionWhereInput> | null;
}, "id" | "email" | "authProviderId" | "currentRoomId" | "connectionPartnerId">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    authProvider?: Prisma.SortOrder;
    authProviderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    nickname?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatar?: Prisma.SortOrderInput | Prisma.SortOrder;
    currentRoomId?: Prisma.SortOrderInput | Prisma.SortOrder;
    connectionPartnerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    isRoomLead?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    authProvider?: Prisma.EnumAuthProviderWithAggregatesFilter<"User"> | $Enums.AuthProvider;
    authProviderId?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    nickname?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    avatar?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    currentRoomId?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    connectionPartnerId?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    isRoomLead?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    lastActiveAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    currentRoom?: Prisma.RoomCreateNestedOneWithoutLeadInput;
    connectionPartner?: Prisma.UserCreateNestedOneWithoutPartnerConnectionInput;
    partnerConnection?: Prisma.UserCreateNestedOneWithoutConnectionPartnerInput;
    roomMemberships?: Prisma.RoomMemberCreateNestedManyWithoutUserInput;
    sentMessages?: Prisma.MessageCreateNestedManyWithoutSenderInput;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    currentRoomId?: string | null;
    connectionPartnerId?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    partnerConnection?: Prisma.UserUncheckedCreateNestedOneWithoutConnectionPartnerInput;
    roomMemberships?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutUserInput;
    sentMessages?: Prisma.MessageUncheckedCreateNestedManyWithoutSenderInput;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentRoom?: Prisma.RoomUpdateOneWithoutLeadNestedInput;
    connectionPartner?: Prisma.UserUpdateOneWithoutPartnerConnectionNestedInput;
    partnerConnection?: Prisma.UserUpdateOneWithoutConnectionPartnerNestedInput;
    roomMemberships?: Prisma.RoomMemberUpdateManyWithoutUserNestedInput;
    sentMessages?: Prisma.MessageUpdateManyWithoutSenderNestedInput;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currentRoomId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    connectionPartnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    partnerConnection?: Prisma.UserUncheckedUpdateOneWithoutConnectionPartnerNestedInput;
    roomMemberships?: Prisma.RoomMemberUncheckedUpdateManyWithoutUserNestedInput;
    sentMessages?: Prisma.MessageUncheckedUpdateManyWithoutSenderNestedInput;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    currentRoomId?: string | null;
    connectionPartnerId?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currentRoomId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    connectionPartnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    authProvider?: Prisma.SortOrder;
    authProviderId?: Prisma.SortOrder;
    nickname?: Prisma.SortOrder;
    avatar?: Prisma.SortOrder;
    currentRoomId?: Prisma.SortOrder;
    connectionPartnerId?: Prisma.SortOrder;
    isRoomLead?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    authProvider?: Prisma.SortOrder;
    authProviderId?: Prisma.SortOrder;
    nickname?: Prisma.SortOrder;
    avatar?: Prisma.SortOrder;
    currentRoomId?: Prisma.SortOrder;
    connectionPartnerId?: Prisma.SortOrder;
    isRoomLead?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    authProvider?: Prisma.SortOrder;
    authProviderId?: Prisma.SortOrder;
    nickname?: Prisma.SortOrder;
    avatar?: Prisma.SortOrder;
    currentRoomId?: Prisma.SortOrder;
    connectionPartnerId?: Prisma.SortOrder;
    isRoomLead?: Prisma.SortOrder;
    lastActiveAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserCreateNestedOneWithoutPartnerConnectionInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPartnerConnectionInput, Prisma.UserUncheckedCreateWithoutPartnerConnectionInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPartnerConnectionInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutConnectionPartnerInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutConnectionPartnerInput, Prisma.UserUncheckedCreateWithoutConnectionPartnerInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutConnectionPartnerInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUncheckedCreateNestedOneWithoutConnectionPartnerInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutConnectionPartnerInput, Prisma.UserUncheckedCreateWithoutConnectionPartnerInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutConnectionPartnerInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type EnumAuthProviderFieldUpdateOperationsInput = {
    set?: $Enums.AuthProvider;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserUpdateOneWithoutPartnerConnectionNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPartnerConnectionInput, Prisma.UserUncheckedCreateWithoutPartnerConnectionInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPartnerConnectionInput;
    upsert?: Prisma.UserUpsertWithoutPartnerConnectionInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPartnerConnectionInput, Prisma.UserUpdateWithoutPartnerConnectionInput>, Prisma.UserUncheckedUpdateWithoutPartnerConnectionInput>;
};
export type UserUpdateOneWithoutConnectionPartnerNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutConnectionPartnerInput, Prisma.UserUncheckedCreateWithoutConnectionPartnerInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutConnectionPartnerInput;
    upsert?: Prisma.UserUpsertWithoutConnectionPartnerInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutConnectionPartnerInput, Prisma.UserUpdateWithoutConnectionPartnerInput>, Prisma.UserUncheckedUpdateWithoutConnectionPartnerInput>;
};
export type UserUncheckedUpdateOneWithoutConnectionPartnerNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutConnectionPartnerInput, Prisma.UserUncheckedCreateWithoutConnectionPartnerInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutConnectionPartnerInput;
    upsert?: Prisma.UserUpsertWithoutConnectionPartnerInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutConnectionPartnerInput, Prisma.UserUpdateWithoutConnectionPartnerInput>, Prisma.UserUncheckedUpdateWithoutConnectionPartnerInput>;
};
export type UserCreateNestedOneWithoutCurrentRoomInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCurrentRoomInput, Prisma.UserUncheckedCreateWithoutCurrentRoomInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCurrentRoomInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUncheckedCreateNestedOneWithoutCurrentRoomInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCurrentRoomInput, Prisma.UserUncheckedCreateWithoutCurrentRoomInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCurrentRoomInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutCurrentRoomNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCurrentRoomInput, Prisma.UserUncheckedCreateWithoutCurrentRoomInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCurrentRoomInput;
    upsert?: Prisma.UserUpsertWithoutCurrentRoomInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCurrentRoomInput, Prisma.UserUpdateWithoutCurrentRoomInput>, Prisma.UserUncheckedUpdateWithoutCurrentRoomInput>;
};
export type UserUncheckedUpdateOneWithoutCurrentRoomNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCurrentRoomInput, Prisma.UserUncheckedCreateWithoutCurrentRoomInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCurrentRoomInput;
    upsert?: Prisma.UserUpsertWithoutCurrentRoomInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCurrentRoomInput, Prisma.UserUpdateWithoutCurrentRoomInput>, Prisma.UserUncheckedUpdateWithoutCurrentRoomInput>;
};
export type UserCreateNestedOneWithoutRoomMembershipsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRoomMembershipsInput, Prisma.UserUncheckedCreateWithoutRoomMembershipsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRoomMembershipsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutRoomMembershipsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRoomMembershipsInput, Prisma.UserUncheckedCreateWithoutRoomMembershipsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRoomMembershipsInput;
    upsert?: Prisma.UserUpsertWithoutRoomMembershipsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRoomMembershipsInput, Prisma.UserUpdateWithoutRoomMembershipsInput>, Prisma.UserUncheckedUpdateWithoutRoomMembershipsInput>;
};
export type UserCreateNestedOneWithoutSentMessagesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSentMessagesInput, Prisma.UserUncheckedCreateWithoutSentMessagesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSentMessagesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSentMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSentMessagesInput, Prisma.UserUncheckedCreateWithoutSentMessagesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSentMessagesInput;
    upsert?: Prisma.UserUpsertWithoutSentMessagesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSentMessagesInput, Prisma.UserUpdateWithoutSentMessagesInput>, Prisma.UserUncheckedUpdateWithoutSentMessagesInput>;
};
export type UserCreateNestedOneWithoutSubscriptionInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSubscriptionInput, Prisma.UserUncheckedCreateWithoutSubscriptionInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSubscriptionInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSubscriptionNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSubscriptionInput, Prisma.UserUncheckedCreateWithoutSubscriptionInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSubscriptionInput;
    upsert?: Prisma.UserUpsertWithoutSubscriptionInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSubscriptionInput, Prisma.UserUpdateWithoutSubscriptionInput>, Prisma.UserUncheckedUpdateWithoutSubscriptionInput>;
};
export type UserCreateWithoutPartnerConnectionInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    currentRoom?: Prisma.RoomCreateNestedOneWithoutLeadInput;
    connectionPartner?: Prisma.UserCreateNestedOneWithoutPartnerConnectionInput;
    roomMemberships?: Prisma.RoomMemberCreateNestedManyWithoutUserInput;
    sentMessages?: Prisma.MessageCreateNestedManyWithoutSenderInput;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutPartnerConnectionInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    currentRoomId?: string | null;
    connectionPartnerId?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomMemberships?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutUserInput;
    sentMessages?: Prisma.MessageUncheckedCreateNestedManyWithoutSenderInput;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutPartnerConnectionInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPartnerConnectionInput, Prisma.UserUncheckedCreateWithoutPartnerConnectionInput>;
};
export type UserCreateWithoutConnectionPartnerInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    currentRoom?: Prisma.RoomCreateNestedOneWithoutLeadInput;
    partnerConnection?: Prisma.UserCreateNestedOneWithoutConnectionPartnerInput;
    roomMemberships?: Prisma.RoomMemberCreateNestedManyWithoutUserInput;
    sentMessages?: Prisma.MessageCreateNestedManyWithoutSenderInput;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutConnectionPartnerInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    currentRoomId?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    partnerConnection?: Prisma.UserUncheckedCreateNestedOneWithoutConnectionPartnerInput;
    roomMemberships?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutUserInput;
    sentMessages?: Prisma.MessageUncheckedCreateNestedManyWithoutSenderInput;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutConnectionPartnerInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutConnectionPartnerInput, Prisma.UserUncheckedCreateWithoutConnectionPartnerInput>;
};
export type UserUpsertWithoutPartnerConnectionInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPartnerConnectionInput, Prisma.UserUncheckedUpdateWithoutPartnerConnectionInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPartnerConnectionInput, Prisma.UserUncheckedCreateWithoutPartnerConnectionInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPartnerConnectionInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPartnerConnectionInput, Prisma.UserUncheckedUpdateWithoutPartnerConnectionInput>;
};
export type UserUpdateWithoutPartnerConnectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentRoom?: Prisma.RoomUpdateOneWithoutLeadNestedInput;
    connectionPartner?: Prisma.UserUpdateOneWithoutPartnerConnectionNestedInput;
    roomMemberships?: Prisma.RoomMemberUpdateManyWithoutUserNestedInput;
    sentMessages?: Prisma.MessageUpdateManyWithoutSenderNestedInput;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutPartnerConnectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currentRoomId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    connectionPartnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomMemberships?: Prisma.RoomMemberUncheckedUpdateManyWithoutUserNestedInput;
    sentMessages?: Prisma.MessageUncheckedUpdateManyWithoutSenderNestedInput;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserUpsertWithoutConnectionPartnerInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutConnectionPartnerInput, Prisma.UserUncheckedUpdateWithoutConnectionPartnerInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutConnectionPartnerInput, Prisma.UserUncheckedCreateWithoutConnectionPartnerInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutConnectionPartnerInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutConnectionPartnerInput, Prisma.UserUncheckedUpdateWithoutConnectionPartnerInput>;
};
export type UserUpdateWithoutConnectionPartnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentRoom?: Prisma.RoomUpdateOneWithoutLeadNestedInput;
    partnerConnection?: Prisma.UserUpdateOneWithoutConnectionPartnerNestedInput;
    roomMemberships?: Prisma.RoomMemberUpdateManyWithoutUserNestedInput;
    sentMessages?: Prisma.MessageUpdateManyWithoutSenderNestedInput;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutConnectionPartnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currentRoomId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    partnerConnection?: Prisma.UserUncheckedUpdateOneWithoutConnectionPartnerNestedInput;
    roomMemberships?: Prisma.RoomMemberUncheckedUpdateManyWithoutUserNestedInput;
    sentMessages?: Prisma.MessageUncheckedUpdateManyWithoutSenderNestedInput;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutCurrentRoomInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    connectionPartner?: Prisma.UserCreateNestedOneWithoutPartnerConnectionInput;
    partnerConnection?: Prisma.UserCreateNestedOneWithoutConnectionPartnerInput;
    roomMemberships?: Prisma.RoomMemberCreateNestedManyWithoutUserInput;
    sentMessages?: Prisma.MessageCreateNestedManyWithoutSenderInput;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutCurrentRoomInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    connectionPartnerId?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    partnerConnection?: Prisma.UserUncheckedCreateNestedOneWithoutConnectionPartnerInput;
    roomMemberships?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutUserInput;
    sentMessages?: Prisma.MessageUncheckedCreateNestedManyWithoutSenderInput;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutCurrentRoomInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCurrentRoomInput, Prisma.UserUncheckedCreateWithoutCurrentRoomInput>;
};
export type UserUpsertWithoutCurrentRoomInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCurrentRoomInput, Prisma.UserUncheckedUpdateWithoutCurrentRoomInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCurrentRoomInput, Prisma.UserUncheckedCreateWithoutCurrentRoomInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCurrentRoomInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCurrentRoomInput, Prisma.UserUncheckedUpdateWithoutCurrentRoomInput>;
};
export type UserUpdateWithoutCurrentRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    connectionPartner?: Prisma.UserUpdateOneWithoutPartnerConnectionNestedInput;
    partnerConnection?: Prisma.UserUpdateOneWithoutConnectionPartnerNestedInput;
    roomMemberships?: Prisma.RoomMemberUpdateManyWithoutUserNestedInput;
    sentMessages?: Prisma.MessageUpdateManyWithoutSenderNestedInput;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutCurrentRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    connectionPartnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    partnerConnection?: Prisma.UserUncheckedUpdateOneWithoutConnectionPartnerNestedInput;
    roomMemberships?: Prisma.RoomMemberUncheckedUpdateManyWithoutUserNestedInput;
    sentMessages?: Prisma.MessageUncheckedUpdateManyWithoutSenderNestedInput;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutRoomMembershipsInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    currentRoom?: Prisma.RoomCreateNestedOneWithoutLeadInput;
    connectionPartner?: Prisma.UserCreateNestedOneWithoutPartnerConnectionInput;
    partnerConnection?: Prisma.UserCreateNestedOneWithoutConnectionPartnerInput;
    sentMessages?: Prisma.MessageCreateNestedManyWithoutSenderInput;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutRoomMembershipsInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    currentRoomId?: string | null;
    connectionPartnerId?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    partnerConnection?: Prisma.UserUncheckedCreateNestedOneWithoutConnectionPartnerInput;
    sentMessages?: Prisma.MessageUncheckedCreateNestedManyWithoutSenderInput;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutRoomMembershipsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRoomMembershipsInput, Prisma.UserUncheckedCreateWithoutRoomMembershipsInput>;
};
export type UserUpsertWithoutRoomMembershipsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutRoomMembershipsInput, Prisma.UserUncheckedUpdateWithoutRoomMembershipsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRoomMembershipsInput, Prisma.UserUncheckedCreateWithoutRoomMembershipsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutRoomMembershipsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRoomMembershipsInput, Prisma.UserUncheckedUpdateWithoutRoomMembershipsInput>;
};
export type UserUpdateWithoutRoomMembershipsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentRoom?: Prisma.RoomUpdateOneWithoutLeadNestedInput;
    connectionPartner?: Prisma.UserUpdateOneWithoutPartnerConnectionNestedInput;
    partnerConnection?: Prisma.UserUpdateOneWithoutConnectionPartnerNestedInput;
    sentMessages?: Prisma.MessageUpdateManyWithoutSenderNestedInput;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutRoomMembershipsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currentRoomId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    connectionPartnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    partnerConnection?: Prisma.UserUncheckedUpdateOneWithoutConnectionPartnerNestedInput;
    sentMessages?: Prisma.MessageUncheckedUpdateManyWithoutSenderNestedInput;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutSentMessagesInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    currentRoom?: Prisma.RoomCreateNestedOneWithoutLeadInput;
    connectionPartner?: Prisma.UserCreateNestedOneWithoutPartnerConnectionInput;
    partnerConnection?: Prisma.UserCreateNestedOneWithoutConnectionPartnerInput;
    roomMemberships?: Prisma.RoomMemberCreateNestedManyWithoutUserInput;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutSentMessagesInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    currentRoomId?: string | null;
    connectionPartnerId?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    partnerConnection?: Prisma.UserUncheckedCreateNestedOneWithoutConnectionPartnerInput;
    roomMemberships?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutUserInput;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutSentMessagesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSentMessagesInput, Prisma.UserUncheckedCreateWithoutSentMessagesInput>;
};
export type UserUpsertWithoutSentMessagesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSentMessagesInput, Prisma.UserUncheckedUpdateWithoutSentMessagesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSentMessagesInput, Prisma.UserUncheckedCreateWithoutSentMessagesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSentMessagesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSentMessagesInput, Prisma.UserUncheckedUpdateWithoutSentMessagesInput>;
};
export type UserUpdateWithoutSentMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentRoom?: Prisma.RoomUpdateOneWithoutLeadNestedInput;
    connectionPartner?: Prisma.UserUpdateOneWithoutPartnerConnectionNestedInput;
    partnerConnection?: Prisma.UserUpdateOneWithoutConnectionPartnerNestedInput;
    roomMemberships?: Prisma.RoomMemberUpdateManyWithoutUserNestedInput;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutSentMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currentRoomId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    connectionPartnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    partnerConnection?: Prisma.UserUncheckedUpdateOneWithoutConnectionPartnerNestedInput;
    roomMemberships?: Prisma.RoomMemberUncheckedUpdateManyWithoutUserNestedInput;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutSubscriptionInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    currentRoom?: Prisma.RoomCreateNestedOneWithoutLeadInput;
    connectionPartner?: Prisma.UserCreateNestedOneWithoutPartnerConnectionInput;
    partnerConnection?: Prisma.UserCreateNestedOneWithoutConnectionPartnerInput;
    roomMemberships?: Prisma.RoomMemberCreateNestedManyWithoutUserInput;
    sentMessages?: Prisma.MessageCreateNestedManyWithoutSenderInput;
};
export type UserUncheckedCreateWithoutSubscriptionInput = {
    id?: string;
    email: string;
    authProvider: $Enums.AuthProvider;
    authProviderId?: string | null;
    nickname?: string | null;
    avatar?: string | null;
    currentRoomId?: string | null;
    connectionPartnerId?: string | null;
    isRoomLead?: boolean;
    lastActiveAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    partnerConnection?: Prisma.UserUncheckedCreateNestedOneWithoutConnectionPartnerInput;
    roomMemberships?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutUserInput;
    sentMessages?: Prisma.MessageUncheckedCreateNestedManyWithoutSenderInput;
};
export type UserCreateOrConnectWithoutSubscriptionInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSubscriptionInput, Prisma.UserUncheckedCreateWithoutSubscriptionInput>;
};
export type UserUpsertWithoutSubscriptionInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSubscriptionInput, Prisma.UserUncheckedUpdateWithoutSubscriptionInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSubscriptionInput, Prisma.UserUncheckedCreateWithoutSubscriptionInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSubscriptionInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSubscriptionInput, Prisma.UserUncheckedUpdateWithoutSubscriptionInput>;
};
export type UserUpdateWithoutSubscriptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentRoom?: Prisma.RoomUpdateOneWithoutLeadNestedInput;
    connectionPartner?: Prisma.UserUpdateOneWithoutPartnerConnectionNestedInput;
    partnerConnection?: Prisma.UserUpdateOneWithoutConnectionPartnerNestedInput;
    roomMemberships?: Prisma.RoomMemberUpdateManyWithoutUserNestedInput;
    sentMessages?: Prisma.MessageUpdateManyWithoutSenderNestedInput;
};
export type UserUncheckedUpdateWithoutSubscriptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    authProviderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currentRoomId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    connectionPartnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isRoomLead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActiveAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    partnerConnection?: Prisma.UserUncheckedUpdateOneWithoutConnectionPartnerNestedInput;
    roomMemberships?: Prisma.RoomMemberUncheckedUpdateManyWithoutUserNestedInput;
    sentMessages?: Prisma.MessageUncheckedUpdateManyWithoutSenderNestedInput;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    roomMemberships: number;
    sentMessages: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roomMemberships?: boolean | UserCountOutputTypeCountRoomMembershipsArgs;
    sentMessages?: boolean | UserCountOutputTypeCountSentMessagesArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountRoomMembershipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomMemberWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSentMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    authProvider?: boolean;
    authProviderId?: boolean;
    nickname?: boolean;
    avatar?: boolean;
    currentRoomId?: boolean;
    connectionPartnerId?: boolean;
    isRoomLead?: boolean;
    lastActiveAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    currentRoom?: boolean | Prisma.User$currentRoomArgs<ExtArgs>;
    connectionPartner?: boolean | Prisma.User$connectionPartnerArgs<ExtArgs>;
    partnerConnection?: boolean | Prisma.User$partnerConnectionArgs<ExtArgs>;
    roomMemberships?: boolean | Prisma.User$roomMembershipsArgs<ExtArgs>;
    sentMessages?: boolean | Prisma.User$sentMessagesArgs<ExtArgs>;
    subscription?: boolean | Prisma.User$subscriptionArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    authProvider?: boolean;
    authProviderId?: boolean;
    nickname?: boolean;
    avatar?: boolean;
    currentRoomId?: boolean;
    connectionPartnerId?: boolean;
    isRoomLead?: boolean;
    lastActiveAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    currentRoom?: boolean | Prisma.User$currentRoomArgs<ExtArgs>;
    connectionPartner?: boolean | Prisma.User$connectionPartnerArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    authProvider?: boolean;
    authProviderId?: boolean;
    nickname?: boolean;
    avatar?: boolean;
    currentRoomId?: boolean;
    connectionPartnerId?: boolean;
    isRoomLead?: boolean;
    lastActiveAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    currentRoom?: boolean | Prisma.User$currentRoomArgs<ExtArgs>;
    connectionPartner?: boolean | Prisma.User$connectionPartnerArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    authProvider?: boolean;
    authProviderId?: boolean;
    nickname?: boolean;
    avatar?: boolean;
    currentRoomId?: boolean;
    connectionPartnerId?: boolean;
    isRoomLead?: boolean;
    lastActiveAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "authProvider" | "authProviderId" | "nickname" | "avatar" | "currentRoomId" | "connectionPartnerId" | "isRoomLead" | "lastActiveAt" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    currentRoom?: boolean | Prisma.User$currentRoomArgs<ExtArgs>;
    connectionPartner?: boolean | Prisma.User$connectionPartnerArgs<ExtArgs>;
    partnerConnection?: boolean | Prisma.User$partnerConnectionArgs<ExtArgs>;
    roomMemberships?: boolean | Prisma.User$roomMembershipsArgs<ExtArgs>;
    sentMessages?: boolean | Prisma.User$sentMessagesArgs<ExtArgs>;
    subscription?: boolean | Prisma.User$subscriptionArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    currentRoom?: boolean | Prisma.User$currentRoomArgs<ExtArgs>;
    connectionPartner?: boolean | Prisma.User$connectionPartnerArgs<ExtArgs>;
};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    currentRoom?: boolean | Prisma.User$currentRoomArgs<ExtArgs>;
    connectionPartner?: boolean | Prisma.User$connectionPartnerArgs<ExtArgs>;
};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        currentRoom: Prisma.$RoomPayload<ExtArgs> | null;
        connectionPartner: Prisma.$UserPayload<ExtArgs> | null;
        partnerConnection: Prisma.$UserPayload<ExtArgs> | null;
        roomMemberships: Prisma.$RoomMemberPayload<ExtArgs>[];
        sentMessages: Prisma.$MessagePayload<ExtArgs>[];
        subscription: Prisma.$SubscriptionPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        authProvider: $Enums.AuthProvider;
        authProviderId: string | null;
        nickname: string | null;
        avatar: string | null;
        currentRoomId: string | null;
        connectionPartnerId: string | null;
        isRoomLead: boolean;
        lastActiveAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    currentRoom<T extends Prisma.User$currentRoomArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$currentRoomArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    connectionPartner<T extends Prisma.User$connectionPartnerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$connectionPartnerArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    partnerConnection<T extends Prisma.User$partnerConnectionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$partnerConnectionArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    roomMemberships<T extends Prisma.User$roomMembershipsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$roomMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sentMessages<T extends Prisma.User$sentMessagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$sentMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    subscription<T extends Prisma.User$subscriptionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$subscriptionArgs<ExtArgs>>): Prisma.Prisma__SubscriptionClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly authProvider: Prisma.FieldRef<"User", 'AuthProvider'>;
    readonly authProviderId: Prisma.FieldRef<"User", 'String'>;
    readonly nickname: Prisma.FieldRef<"User", 'String'>;
    readonly avatar: Prisma.FieldRef<"User", 'String'>;
    readonly currentRoomId: Prisma.FieldRef<"User", 'String'>;
    readonly connectionPartnerId: Prisma.FieldRef<"User", 'String'>;
    readonly isRoomLead: Prisma.FieldRef<"User", 'Boolean'>;
    readonly lastActiveAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.currentRoom
 */
export type User$currentRoomArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: Prisma.RoomSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where?: Prisma.RoomWhereInput;
};
/**
 * User.connectionPartner
 */
export type User$connectionPartnerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * User.partnerConnection
 */
export type User$partnerConnectionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * User.roomMemberships
 */
export type User$roomMembershipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: Prisma.RoomMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: Prisma.RoomMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoomMemberInclude<ExtArgs> | null;
    where?: Prisma.RoomMemberWhereInput;
    orderBy?: Prisma.RoomMemberOrderByWithRelationInput | Prisma.RoomMemberOrderByWithRelationInput[];
    cursor?: Prisma.RoomMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomMemberScalarFieldEnum | Prisma.RoomMemberScalarFieldEnum[];
};
/**
 * User.sentMessages
 */
export type User$sentMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: Prisma.MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
/**
 * User.subscription
 */
export type User$subscriptionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: Prisma.SubscriptionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subscription
     */
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubscriptionInclude<ExtArgs> | null;
    where?: Prisma.SubscriptionWhereInput;
};
/**
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=User.d.ts.map