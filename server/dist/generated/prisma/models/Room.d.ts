import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Room
 *
 */
export type RoomModel = runtime.Types.Result.DefaultSelection<Prisma.$RoomPayload>;
export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null;
    _min: RoomMinAggregateOutputType | null;
    _max: RoomMaxAggregateOutputType | null;
};
export type RoomMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    qrCodeUrl: string | null;
    status: $Enums.RoomStatus | null;
    createdAt: Date | null;
    roomStartedAt: Date | null;
    updatedAt: Date | null;
};
export type RoomMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    qrCodeUrl: string | null;
    status: $Enums.RoomStatus | null;
    createdAt: Date | null;
    roomStartedAt: Date | null;
    updatedAt: Date | null;
};
export type RoomCountAggregateOutputType = {
    id: number;
    code: number;
    qrCodeUrl: number;
    status: number;
    createdAt: number;
    roomStartedAt: number;
    updatedAt: number;
    _all: number;
};
export type RoomMinAggregateInputType = {
    id?: true;
    code?: true;
    qrCodeUrl?: true;
    status?: true;
    createdAt?: true;
    roomStartedAt?: true;
    updatedAt?: true;
};
export type RoomMaxAggregateInputType = {
    id?: true;
    code?: true;
    qrCodeUrl?: true;
    status?: true;
    createdAt?: true;
    roomStartedAt?: true;
    updatedAt?: true;
};
export type RoomCountAggregateInputType = {
    id?: true;
    code?: true;
    qrCodeUrl?: true;
    status?: true;
    createdAt?: true;
    roomStartedAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RoomAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: Prisma.RoomWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rooms to fetch.
     */
    orderBy?: Prisma.RoomOrderByWithRelationInput | Prisma.RoomOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RoomWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rooms.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType;
};
export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
    [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRoom[P]> : Prisma.GetScalarType<T[P], AggregateRoom[P]>;
};
export type RoomGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithAggregationInput | Prisma.RoomOrderByWithAggregationInput[];
    by: Prisma.RoomScalarFieldEnum[] | Prisma.RoomScalarFieldEnum;
    having?: Prisma.RoomScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RoomCountAggregateInputType | true;
    _min?: RoomMinAggregateInputType;
    _max?: RoomMaxAggregateInputType;
};
export type RoomGroupByOutputType = {
    id: string;
    code: string;
    qrCodeUrl: string | null;
    status: $Enums.RoomStatus;
    createdAt: Date;
    roomStartedAt: Date | null;
    updatedAt: Date;
    _count: RoomCountAggregateOutputType | null;
    _min: RoomMinAggregateOutputType | null;
    _max: RoomMaxAggregateOutputType | null;
};
type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RoomGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RoomGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RoomGroupByOutputType[P]>;
}>>;
export type RoomWhereInput = {
    AND?: Prisma.RoomWhereInput | Prisma.RoomWhereInput[];
    OR?: Prisma.RoomWhereInput[];
    NOT?: Prisma.RoomWhereInput | Prisma.RoomWhereInput[];
    id?: Prisma.StringFilter<"Room"> | string;
    code?: Prisma.StringFilter<"Room"> | string;
    qrCodeUrl?: Prisma.StringNullableFilter<"Room"> | string | null;
    status?: Prisma.EnumRoomStatusFilter<"Room"> | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    roomStartedAt?: Prisma.DateTimeNullableFilter<"Room"> | Date | string | null;
    updatedAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    lead?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    members?: Prisma.RoomMemberListRelationFilter;
    milestones?: Prisma.MilestoneListRelationFilter;
    chatSessions?: Prisma.ChatSessionListRelationFilter;
    insights?: Prisma.AIInsightListRelationFilter;
};
export type RoomOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    qrCodeUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    roomStartedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    lead?: Prisma.UserOrderByWithRelationInput;
    members?: Prisma.RoomMemberOrderByRelationAggregateInput;
    milestones?: Prisma.MilestoneOrderByRelationAggregateInput;
    chatSessions?: Prisma.ChatSessionOrderByRelationAggregateInput;
    insights?: Prisma.AIInsightOrderByRelationAggregateInput;
};
export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.RoomWhereInput | Prisma.RoomWhereInput[];
    OR?: Prisma.RoomWhereInput[];
    NOT?: Prisma.RoomWhereInput | Prisma.RoomWhereInput[];
    qrCodeUrl?: Prisma.StringNullableFilter<"Room"> | string | null;
    status?: Prisma.EnumRoomStatusFilter<"Room"> | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    roomStartedAt?: Prisma.DateTimeNullableFilter<"Room"> | Date | string | null;
    updatedAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    lead?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    members?: Prisma.RoomMemberListRelationFilter;
    milestones?: Prisma.MilestoneListRelationFilter;
    chatSessions?: Prisma.ChatSessionListRelationFilter;
    insights?: Prisma.AIInsightListRelationFilter;
}, "id" | "code">;
export type RoomOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    qrCodeUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    roomStartedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RoomCountOrderByAggregateInput;
    _max?: Prisma.RoomMaxOrderByAggregateInput;
    _min?: Prisma.RoomMinOrderByAggregateInput;
};
export type RoomScalarWhereWithAggregatesInput = {
    AND?: Prisma.RoomScalarWhereWithAggregatesInput | Prisma.RoomScalarWhereWithAggregatesInput[];
    OR?: Prisma.RoomScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RoomScalarWhereWithAggregatesInput | Prisma.RoomScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Room"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Room"> | string;
    qrCodeUrl?: Prisma.StringNullableWithAggregatesFilter<"Room"> | string | null;
    status?: Prisma.EnumRoomStatusWithAggregatesFilter<"Room"> | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Room"> | Date | string;
    roomStartedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Room"> | Date | string | null;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Room"> | Date | string;
};
export type RoomCreateInput = {
    id?: string;
    code: string;
    qrCodeUrl?: string | null;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    roomStartedAt?: Date | string | null;
    updatedAt?: Date | string;
    lead?: Prisma.UserCreateNestedOneWithoutCurrentRoomInput;
    members?: Prisma.RoomMemberCreateNestedManyWithoutRoomInput;
    milestones?: Prisma.MilestoneCreateNestedManyWithoutRoomInput;
    chatSessions?: Prisma.ChatSessionCreateNestedManyWithoutRoomInput;
    insights?: Prisma.AIInsightCreateNestedManyWithoutRoomInput;
};
export type RoomUncheckedCreateInput = {
    id?: string;
    code: string;
    qrCodeUrl?: string | null;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    roomStartedAt?: Date | string | null;
    updatedAt?: Date | string;
    lead?: Prisma.UserUncheckedCreateNestedOneWithoutCurrentRoomInput;
    members?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutRoomInput;
    milestones?: Prisma.MilestoneUncheckedCreateNestedManyWithoutRoomInput;
    chatSessions?: Prisma.ChatSessionUncheckedCreateNestedManyWithoutRoomInput;
    insights?: Prisma.AIInsightUncheckedCreateNestedManyWithoutRoomInput;
};
export type RoomUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lead?: Prisma.UserUpdateOneWithoutCurrentRoomNestedInput;
    members?: Prisma.RoomMemberUpdateManyWithoutRoomNestedInput;
    milestones?: Prisma.MilestoneUpdateManyWithoutRoomNestedInput;
    chatSessions?: Prisma.ChatSessionUpdateManyWithoutRoomNestedInput;
    insights?: Prisma.AIInsightUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lead?: Prisma.UserUncheckedUpdateOneWithoutCurrentRoomNestedInput;
    members?: Prisma.RoomMemberUncheckedUpdateManyWithoutRoomNestedInput;
    milestones?: Prisma.MilestoneUncheckedUpdateManyWithoutRoomNestedInput;
    chatSessions?: Prisma.ChatSessionUncheckedUpdateManyWithoutRoomNestedInput;
    insights?: Prisma.AIInsightUncheckedUpdateManyWithoutRoomNestedInput;
};
export type RoomCreateManyInput = {
    id?: string;
    code: string;
    qrCodeUrl?: string | null;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    roomStartedAt?: Date | string | null;
    updatedAt?: Date | string;
};
export type RoomUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomNullableScalarRelationFilter = {
    is?: Prisma.RoomWhereInput | null;
    isNot?: Prisma.RoomWhereInput | null;
};
export type RoomCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    qrCodeUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    roomStartedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RoomMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    qrCodeUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    roomStartedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RoomMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    qrCodeUrl?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    roomStartedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RoomScalarRelationFilter = {
    is?: Prisma.RoomWhereInput;
    isNot?: Prisma.RoomWhereInput;
};
export type RoomCreateNestedOneWithoutLeadInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutLeadInput, Prisma.RoomUncheckedCreateWithoutLeadInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutLeadInput;
    connect?: Prisma.RoomWhereUniqueInput;
};
export type RoomUpdateOneWithoutLeadNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutLeadInput, Prisma.RoomUncheckedCreateWithoutLeadInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutLeadInput;
    upsert?: Prisma.RoomUpsertWithoutLeadInput;
    disconnect?: Prisma.RoomWhereInput | boolean;
    delete?: Prisma.RoomWhereInput | boolean;
    connect?: Prisma.RoomWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RoomUpdateToOneWithWhereWithoutLeadInput, Prisma.RoomUpdateWithoutLeadInput>, Prisma.RoomUncheckedUpdateWithoutLeadInput>;
};
export type EnumRoomStatusFieldUpdateOperationsInput = {
    set?: $Enums.RoomStatus;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type RoomCreateNestedOneWithoutMembersInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutMembersInput, Prisma.RoomUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutMembersInput;
    connect?: Prisma.RoomWhereUniqueInput;
};
export type RoomUpdateOneRequiredWithoutMembersNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutMembersInput, Prisma.RoomUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutMembersInput;
    upsert?: Prisma.RoomUpsertWithoutMembersInput;
    connect?: Prisma.RoomWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RoomUpdateToOneWithWhereWithoutMembersInput, Prisma.RoomUpdateWithoutMembersInput>, Prisma.RoomUncheckedUpdateWithoutMembersInput>;
};
export type RoomCreateNestedOneWithoutChatSessionsInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutChatSessionsInput, Prisma.RoomUncheckedCreateWithoutChatSessionsInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutChatSessionsInput;
    connect?: Prisma.RoomWhereUniqueInput;
};
export type RoomUpdateOneRequiredWithoutChatSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutChatSessionsInput, Prisma.RoomUncheckedCreateWithoutChatSessionsInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutChatSessionsInput;
    upsert?: Prisma.RoomUpsertWithoutChatSessionsInput;
    connect?: Prisma.RoomWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RoomUpdateToOneWithWhereWithoutChatSessionsInput, Prisma.RoomUpdateWithoutChatSessionsInput>, Prisma.RoomUncheckedUpdateWithoutChatSessionsInput>;
};
export type RoomCreateNestedOneWithoutMilestonesInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutMilestonesInput, Prisma.RoomUncheckedCreateWithoutMilestonesInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutMilestonesInput;
    connect?: Prisma.RoomWhereUniqueInput;
};
export type RoomUpdateOneRequiredWithoutMilestonesNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutMilestonesInput, Prisma.RoomUncheckedCreateWithoutMilestonesInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutMilestonesInput;
    upsert?: Prisma.RoomUpsertWithoutMilestonesInput;
    connect?: Prisma.RoomWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RoomUpdateToOneWithWhereWithoutMilestonesInput, Prisma.RoomUpdateWithoutMilestonesInput>, Prisma.RoomUncheckedUpdateWithoutMilestonesInput>;
};
export type RoomCreateNestedOneWithoutInsightsInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutInsightsInput, Prisma.RoomUncheckedCreateWithoutInsightsInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutInsightsInput;
    connect?: Prisma.RoomWhereUniqueInput;
};
export type RoomUpdateOneRequiredWithoutInsightsNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutInsightsInput, Prisma.RoomUncheckedCreateWithoutInsightsInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutInsightsInput;
    upsert?: Prisma.RoomUpsertWithoutInsightsInput;
    connect?: Prisma.RoomWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RoomUpdateToOneWithWhereWithoutInsightsInput, Prisma.RoomUpdateWithoutInsightsInput>, Prisma.RoomUncheckedUpdateWithoutInsightsInput>;
};
export type RoomCreateWithoutLeadInput = {
    id?: string;
    code: string;
    qrCodeUrl?: string | null;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    roomStartedAt?: Date | string | null;
    updatedAt?: Date | string;
    members?: Prisma.RoomMemberCreateNestedManyWithoutRoomInput;
    milestones?: Prisma.MilestoneCreateNestedManyWithoutRoomInput;
    chatSessions?: Prisma.ChatSessionCreateNestedManyWithoutRoomInput;
    insights?: Prisma.AIInsightCreateNestedManyWithoutRoomInput;
};
export type RoomUncheckedCreateWithoutLeadInput = {
    id?: string;
    code: string;
    qrCodeUrl?: string | null;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    roomStartedAt?: Date | string | null;
    updatedAt?: Date | string;
    members?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutRoomInput;
    milestones?: Prisma.MilestoneUncheckedCreateNestedManyWithoutRoomInput;
    chatSessions?: Prisma.ChatSessionUncheckedCreateNestedManyWithoutRoomInput;
    insights?: Prisma.AIInsightUncheckedCreateNestedManyWithoutRoomInput;
};
export type RoomCreateOrConnectWithoutLeadInput = {
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateWithoutLeadInput, Prisma.RoomUncheckedCreateWithoutLeadInput>;
};
export type RoomUpsertWithoutLeadInput = {
    update: Prisma.XOR<Prisma.RoomUpdateWithoutLeadInput, Prisma.RoomUncheckedUpdateWithoutLeadInput>;
    create: Prisma.XOR<Prisma.RoomCreateWithoutLeadInput, Prisma.RoomUncheckedCreateWithoutLeadInput>;
    where?: Prisma.RoomWhereInput;
};
export type RoomUpdateToOneWithWhereWithoutLeadInput = {
    where?: Prisma.RoomWhereInput;
    data: Prisma.XOR<Prisma.RoomUpdateWithoutLeadInput, Prisma.RoomUncheckedUpdateWithoutLeadInput>;
};
export type RoomUpdateWithoutLeadInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.RoomMemberUpdateManyWithoutRoomNestedInput;
    milestones?: Prisma.MilestoneUpdateManyWithoutRoomNestedInput;
    chatSessions?: Prisma.ChatSessionUpdateManyWithoutRoomNestedInput;
    insights?: Prisma.AIInsightUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateWithoutLeadInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.RoomMemberUncheckedUpdateManyWithoutRoomNestedInput;
    milestones?: Prisma.MilestoneUncheckedUpdateManyWithoutRoomNestedInput;
    chatSessions?: Prisma.ChatSessionUncheckedUpdateManyWithoutRoomNestedInput;
    insights?: Prisma.AIInsightUncheckedUpdateManyWithoutRoomNestedInput;
};
export type RoomCreateWithoutMembersInput = {
    id?: string;
    code: string;
    qrCodeUrl?: string | null;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    roomStartedAt?: Date | string | null;
    updatedAt?: Date | string;
    lead?: Prisma.UserCreateNestedOneWithoutCurrentRoomInput;
    milestones?: Prisma.MilestoneCreateNestedManyWithoutRoomInput;
    chatSessions?: Prisma.ChatSessionCreateNestedManyWithoutRoomInput;
    insights?: Prisma.AIInsightCreateNestedManyWithoutRoomInput;
};
export type RoomUncheckedCreateWithoutMembersInput = {
    id?: string;
    code: string;
    qrCodeUrl?: string | null;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    roomStartedAt?: Date | string | null;
    updatedAt?: Date | string;
    lead?: Prisma.UserUncheckedCreateNestedOneWithoutCurrentRoomInput;
    milestones?: Prisma.MilestoneUncheckedCreateNestedManyWithoutRoomInput;
    chatSessions?: Prisma.ChatSessionUncheckedCreateNestedManyWithoutRoomInput;
    insights?: Prisma.AIInsightUncheckedCreateNestedManyWithoutRoomInput;
};
export type RoomCreateOrConnectWithoutMembersInput = {
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateWithoutMembersInput, Prisma.RoomUncheckedCreateWithoutMembersInput>;
};
export type RoomUpsertWithoutMembersInput = {
    update: Prisma.XOR<Prisma.RoomUpdateWithoutMembersInput, Prisma.RoomUncheckedUpdateWithoutMembersInput>;
    create: Prisma.XOR<Prisma.RoomCreateWithoutMembersInput, Prisma.RoomUncheckedCreateWithoutMembersInput>;
    where?: Prisma.RoomWhereInput;
};
export type RoomUpdateToOneWithWhereWithoutMembersInput = {
    where?: Prisma.RoomWhereInput;
    data: Prisma.XOR<Prisma.RoomUpdateWithoutMembersInput, Prisma.RoomUncheckedUpdateWithoutMembersInput>;
};
export type RoomUpdateWithoutMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lead?: Prisma.UserUpdateOneWithoutCurrentRoomNestedInput;
    milestones?: Prisma.MilestoneUpdateManyWithoutRoomNestedInput;
    chatSessions?: Prisma.ChatSessionUpdateManyWithoutRoomNestedInput;
    insights?: Prisma.AIInsightUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateWithoutMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lead?: Prisma.UserUncheckedUpdateOneWithoutCurrentRoomNestedInput;
    milestones?: Prisma.MilestoneUncheckedUpdateManyWithoutRoomNestedInput;
    chatSessions?: Prisma.ChatSessionUncheckedUpdateManyWithoutRoomNestedInput;
    insights?: Prisma.AIInsightUncheckedUpdateManyWithoutRoomNestedInput;
};
export type RoomCreateWithoutChatSessionsInput = {
    id?: string;
    code: string;
    qrCodeUrl?: string | null;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    roomStartedAt?: Date | string | null;
    updatedAt?: Date | string;
    lead?: Prisma.UserCreateNestedOneWithoutCurrentRoomInput;
    members?: Prisma.RoomMemberCreateNestedManyWithoutRoomInput;
    milestones?: Prisma.MilestoneCreateNestedManyWithoutRoomInput;
    insights?: Prisma.AIInsightCreateNestedManyWithoutRoomInput;
};
export type RoomUncheckedCreateWithoutChatSessionsInput = {
    id?: string;
    code: string;
    qrCodeUrl?: string | null;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    roomStartedAt?: Date | string | null;
    updatedAt?: Date | string;
    lead?: Prisma.UserUncheckedCreateNestedOneWithoutCurrentRoomInput;
    members?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutRoomInput;
    milestones?: Prisma.MilestoneUncheckedCreateNestedManyWithoutRoomInput;
    insights?: Prisma.AIInsightUncheckedCreateNestedManyWithoutRoomInput;
};
export type RoomCreateOrConnectWithoutChatSessionsInput = {
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateWithoutChatSessionsInput, Prisma.RoomUncheckedCreateWithoutChatSessionsInput>;
};
export type RoomUpsertWithoutChatSessionsInput = {
    update: Prisma.XOR<Prisma.RoomUpdateWithoutChatSessionsInput, Prisma.RoomUncheckedUpdateWithoutChatSessionsInput>;
    create: Prisma.XOR<Prisma.RoomCreateWithoutChatSessionsInput, Prisma.RoomUncheckedCreateWithoutChatSessionsInput>;
    where?: Prisma.RoomWhereInput;
};
export type RoomUpdateToOneWithWhereWithoutChatSessionsInput = {
    where?: Prisma.RoomWhereInput;
    data: Prisma.XOR<Prisma.RoomUpdateWithoutChatSessionsInput, Prisma.RoomUncheckedUpdateWithoutChatSessionsInput>;
};
export type RoomUpdateWithoutChatSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lead?: Prisma.UserUpdateOneWithoutCurrentRoomNestedInput;
    members?: Prisma.RoomMemberUpdateManyWithoutRoomNestedInput;
    milestones?: Prisma.MilestoneUpdateManyWithoutRoomNestedInput;
    insights?: Prisma.AIInsightUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateWithoutChatSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lead?: Prisma.UserUncheckedUpdateOneWithoutCurrentRoomNestedInput;
    members?: Prisma.RoomMemberUncheckedUpdateManyWithoutRoomNestedInput;
    milestones?: Prisma.MilestoneUncheckedUpdateManyWithoutRoomNestedInput;
    insights?: Prisma.AIInsightUncheckedUpdateManyWithoutRoomNestedInput;
};
export type RoomCreateWithoutMilestonesInput = {
    id?: string;
    code: string;
    qrCodeUrl?: string | null;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    roomStartedAt?: Date | string | null;
    updatedAt?: Date | string;
    lead?: Prisma.UserCreateNestedOneWithoutCurrentRoomInput;
    members?: Prisma.RoomMemberCreateNestedManyWithoutRoomInput;
    chatSessions?: Prisma.ChatSessionCreateNestedManyWithoutRoomInput;
    insights?: Prisma.AIInsightCreateNestedManyWithoutRoomInput;
};
export type RoomUncheckedCreateWithoutMilestonesInput = {
    id?: string;
    code: string;
    qrCodeUrl?: string | null;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    roomStartedAt?: Date | string | null;
    updatedAt?: Date | string;
    lead?: Prisma.UserUncheckedCreateNestedOneWithoutCurrentRoomInput;
    members?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutRoomInput;
    chatSessions?: Prisma.ChatSessionUncheckedCreateNestedManyWithoutRoomInput;
    insights?: Prisma.AIInsightUncheckedCreateNestedManyWithoutRoomInput;
};
export type RoomCreateOrConnectWithoutMilestonesInput = {
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateWithoutMilestonesInput, Prisma.RoomUncheckedCreateWithoutMilestonesInput>;
};
export type RoomUpsertWithoutMilestonesInput = {
    update: Prisma.XOR<Prisma.RoomUpdateWithoutMilestonesInput, Prisma.RoomUncheckedUpdateWithoutMilestonesInput>;
    create: Prisma.XOR<Prisma.RoomCreateWithoutMilestonesInput, Prisma.RoomUncheckedCreateWithoutMilestonesInput>;
    where?: Prisma.RoomWhereInput;
};
export type RoomUpdateToOneWithWhereWithoutMilestonesInput = {
    where?: Prisma.RoomWhereInput;
    data: Prisma.XOR<Prisma.RoomUpdateWithoutMilestonesInput, Prisma.RoomUncheckedUpdateWithoutMilestonesInput>;
};
export type RoomUpdateWithoutMilestonesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lead?: Prisma.UserUpdateOneWithoutCurrentRoomNestedInput;
    members?: Prisma.RoomMemberUpdateManyWithoutRoomNestedInput;
    chatSessions?: Prisma.ChatSessionUpdateManyWithoutRoomNestedInput;
    insights?: Prisma.AIInsightUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateWithoutMilestonesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lead?: Prisma.UserUncheckedUpdateOneWithoutCurrentRoomNestedInput;
    members?: Prisma.RoomMemberUncheckedUpdateManyWithoutRoomNestedInput;
    chatSessions?: Prisma.ChatSessionUncheckedUpdateManyWithoutRoomNestedInput;
    insights?: Prisma.AIInsightUncheckedUpdateManyWithoutRoomNestedInput;
};
export type RoomCreateWithoutInsightsInput = {
    id?: string;
    code: string;
    qrCodeUrl?: string | null;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    roomStartedAt?: Date | string | null;
    updatedAt?: Date | string;
    lead?: Prisma.UserCreateNestedOneWithoutCurrentRoomInput;
    members?: Prisma.RoomMemberCreateNestedManyWithoutRoomInput;
    milestones?: Prisma.MilestoneCreateNestedManyWithoutRoomInput;
    chatSessions?: Prisma.ChatSessionCreateNestedManyWithoutRoomInput;
};
export type RoomUncheckedCreateWithoutInsightsInput = {
    id?: string;
    code: string;
    qrCodeUrl?: string | null;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    roomStartedAt?: Date | string | null;
    updatedAt?: Date | string;
    lead?: Prisma.UserUncheckedCreateNestedOneWithoutCurrentRoomInput;
    members?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutRoomInput;
    milestones?: Prisma.MilestoneUncheckedCreateNestedManyWithoutRoomInput;
    chatSessions?: Prisma.ChatSessionUncheckedCreateNestedManyWithoutRoomInput;
};
export type RoomCreateOrConnectWithoutInsightsInput = {
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateWithoutInsightsInput, Prisma.RoomUncheckedCreateWithoutInsightsInput>;
};
export type RoomUpsertWithoutInsightsInput = {
    update: Prisma.XOR<Prisma.RoomUpdateWithoutInsightsInput, Prisma.RoomUncheckedUpdateWithoutInsightsInput>;
    create: Prisma.XOR<Prisma.RoomCreateWithoutInsightsInput, Prisma.RoomUncheckedCreateWithoutInsightsInput>;
    where?: Prisma.RoomWhereInput;
};
export type RoomUpdateToOneWithWhereWithoutInsightsInput = {
    where?: Prisma.RoomWhereInput;
    data: Prisma.XOR<Prisma.RoomUpdateWithoutInsightsInput, Prisma.RoomUncheckedUpdateWithoutInsightsInput>;
};
export type RoomUpdateWithoutInsightsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lead?: Prisma.UserUpdateOneWithoutCurrentRoomNestedInput;
    members?: Prisma.RoomMemberUpdateManyWithoutRoomNestedInput;
    milestones?: Prisma.MilestoneUpdateManyWithoutRoomNestedInput;
    chatSessions?: Prisma.ChatSessionUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateWithoutInsightsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    qrCodeUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lead?: Prisma.UserUncheckedUpdateOneWithoutCurrentRoomNestedInput;
    members?: Prisma.RoomMemberUncheckedUpdateManyWithoutRoomNestedInput;
    milestones?: Prisma.MilestoneUncheckedUpdateManyWithoutRoomNestedInput;
    chatSessions?: Prisma.ChatSessionUncheckedUpdateManyWithoutRoomNestedInput;
};
/**
 * Count Type RoomCountOutputType
 */
export type RoomCountOutputType = {
    members: number;
    milestones: number;
    chatSessions: number;
    insights: number;
};
export type RoomCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    members?: boolean | RoomCountOutputTypeCountMembersArgs;
    milestones?: boolean | RoomCountOutputTypeCountMilestonesArgs;
    chatSessions?: boolean | RoomCountOutputTypeCountChatSessionsArgs;
    insights?: boolean | RoomCountOutputTypeCountInsightsArgs;
};
/**
 * RoomCountOutputType without action
 */
export type RoomCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: Prisma.RoomCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * RoomCountOutputType without action
 */
export type RoomCountOutputTypeCountMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomMemberWhereInput;
};
/**
 * RoomCountOutputType without action
 */
export type RoomCountOutputTypeCountMilestonesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MilestoneWhereInput;
};
/**
 * RoomCountOutputType without action
 */
export type RoomCountOutputTypeCountChatSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatSessionWhereInput;
};
/**
 * RoomCountOutputType without action
 */
export type RoomCountOutputTypeCountInsightsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AIInsightWhereInput;
};
export type RoomSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    qrCodeUrl?: boolean;
    status?: boolean;
    createdAt?: boolean;
    roomStartedAt?: boolean;
    updatedAt?: boolean;
    lead?: boolean | Prisma.Room$leadArgs<ExtArgs>;
    members?: boolean | Prisma.Room$membersArgs<ExtArgs>;
    milestones?: boolean | Prisma.Room$milestonesArgs<ExtArgs>;
    chatSessions?: boolean | Prisma.Room$chatSessionsArgs<ExtArgs>;
    insights?: boolean | Prisma.Room$insightsArgs<ExtArgs>;
    _count?: boolean | Prisma.RoomCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["room"]>;
export type RoomSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    qrCodeUrl?: boolean;
    status?: boolean;
    createdAt?: boolean;
    roomStartedAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["room"]>;
export type RoomSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    qrCodeUrl?: boolean;
    status?: boolean;
    createdAt?: boolean;
    roomStartedAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["room"]>;
export type RoomSelectScalar = {
    id?: boolean;
    code?: boolean;
    qrCodeUrl?: boolean;
    status?: boolean;
    createdAt?: boolean;
    roomStartedAt?: boolean;
    updatedAt?: boolean;
};
export type RoomOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "qrCodeUrl" | "status" | "createdAt" | "roomStartedAt" | "updatedAt", ExtArgs["result"]["room"]>;
export type RoomInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lead?: boolean | Prisma.Room$leadArgs<ExtArgs>;
    members?: boolean | Prisma.Room$membersArgs<ExtArgs>;
    milestones?: boolean | Prisma.Room$milestonesArgs<ExtArgs>;
    chatSessions?: boolean | Prisma.Room$chatSessionsArgs<ExtArgs>;
    insights?: boolean | Prisma.Room$insightsArgs<ExtArgs>;
    _count?: boolean | Prisma.RoomCountOutputTypeDefaultArgs<ExtArgs>;
};
export type RoomIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type RoomIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $RoomPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Room";
    objects: {
        lead: Prisma.$UserPayload<ExtArgs> | null;
        members: Prisma.$RoomMemberPayload<ExtArgs>[];
        milestones: Prisma.$MilestonePayload<ExtArgs>[];
        chatSessions: Prisma.$ChatSessionPayload<ExtArgs>[];
        insights: Prisma.$AIInsightPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        qrCodeUrl: string | null;
        status: $Enums.RoomStatus;
        createdAt: Date;
        roomStartedAt: Date | null;
        updatedAt: Date;
    }, ExtArgs["result"]["room"]>;
    composites: {};
};
export type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RoomPayload, S>;
export type RoomCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RoomCountAggregateInputType | true;
};
export interface RoomDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Room'];
        meta: {
            name: 'Room';
        };
    };
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: Prisma.SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: Prisma.SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     *
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RoomFindManyArgs>(args?: Prisma.SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     *
     */
    create<T extends RoomCreateArgs>(args: Prisma.SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RoomCreateManyArgs>(args?: Prisma.SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     *
     */
    delete<T extends RoomDeleteArgs>(args: Prisma.SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RoomUpdateArgs>(args: Prisma.SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: Prisma.SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RoomUpdateManyArgs>(args: Prisma.SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {RoomUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: Prisma.SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(args?: Prisma.Subset<T, RoomCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RoomCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomAggregateArgs>(args: Prisma.Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>;
    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
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
    groupBy<T extends RoomGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RoomGroupByArgs['orderBy'];
    } : {
        orderBy?: RoomGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Room model
     */
    readonly fields: RoomFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Room.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RoomClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lead<T extends Prisma.Room$leadArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Room$leadArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    members<T extends Prisma.Room$membersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Room$membersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    milestones<T extends Prisma.Room$milestonesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Room$milestonesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    chatSessions<T extends Prisma.Room$chatSessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Room$chatSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    insights<T extends Prisma.Room$insightsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Room$insightsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AIInsightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Room model
 */
export interface RoomFieldRefs {
    readonly id: Prisma.FieldRef<"Room", 'String'>;
    readonly code: Prisma.FieldRef<"Room", 'String'>;
    readonly qrCodeUrl: Prisma.FieldRef<"Room", 'String'>;
    readonly status: Prisma.FieldRef<"Room", 'RoomStatus'>;
    readonly createdAt: Prisma.FieldRef<"Room", 'DateTime'>;
    readonly roomStartedAt: Prisma.FieldRef<"Room", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Room", 'DateTime'>;
}
/**
 * Room findUnique
 */
export type RoomFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Room to fetch.
     */
    where: Prisma.RoomWhereUniqueInput;
};
/**
 * Room findUniqueOrThrow
 */
export type RoomFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Room to fetch.
     */
    where: Prisma.RoomWhereUniqueInput;
};
/**
 * Room findFirst
 */
export type RoomFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Room to fetch.
     */
    where?: Prisma.RoomWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rooms to fetch.
     */
    orderBy?: Prisma.RoomOrderByWithRelationInput | Prisma.RoomOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Rooms.
     */
    cursor?: Prisma.RoomWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rooms.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Rooms.
     */
    distinct?: Prisma.RoomScalarFieldEnum | Prisma.RoomScalarFieldEnum[];
};
/**
 * Room findFirstOrThrow
 */
export type RoomFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Room to fetch.
     */
    where?: Prisma.RoomWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rooms to fetch.
     */
    orderBy?: Prisma.RoomOrderByWithRelationInput | Prisma.RoomOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Rooms.
     */
    cursor?: Prisma.RoomWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rooms.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Rooms.
     */
    distinct?: Prisma.RoomScalarFieldEnum | Prisma.RoomScalarFieldEnum[];
};
/**
 * Room findMany
 */
export type RoomFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Rooms to fetch.
     */
    where?: Prisma.RoomWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rooms to fetch.
     */
    orderBy?: Prisma.RoomOrderByWithRelationInput | Prisma.RoomOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Rooms.
     */
    cursor?: Prisma.RoomWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rooms.
     */
    skip?: number;
    distinct?: Prisma.RoomScalarFieldEnum | Prisma.RoomScalarFieldEnum[];
};
/**
 * Room create
 */
export type RoomCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Room.
     */
    data: Prisma.XOR<Prisma.RoomCreateInput, Prisma.RoomUncheckedCreateInput>;
};
/**
 * Room createMany
 */
export type RoomCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: Prisma.RoomCreateManyInput | Prisma.RoomCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Room createManyAndReturn
 */
export type RoomCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: Prisma.RoomSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    /**
     * The data used to create many Rooms.
     */
    data: Prisma.RoomCreateManyInput | Prisma.RoomCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Room update
 */
export type RoomUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Room.
     */
    data: Prisma.XOR<Prisma.RoomUpdateInput, Prisma.RoomUncheckedUpdateInput>;
    /**
     * Choose, which Room to update.
     */
    where: Prisma.RoomWhereUniqueInput;
};
/**
 * Room updateMany
 */
export type RoomUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: Prisma.XOR<Prisma.RoomUpdateManyMutationInput, Prisma.RoomUncheckedUpdateManyInput>;
    /**
     * Filter which Rooms to update
     */
    where?: Prisma.RoomWhereInput;
    /**
     * Limit how many Rooms to update.
     */
    limit?: number;
};
/**
 * Room updateManyAndReturn
 */
export type RoomUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: Prisma.RoomSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Room
     */
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    /**
     * The data used to update Rooms.
     */
    data: Prisma.XOR<Prisma.RoomUpdateManyMutationInput, Prisma.RoomUncheckedUpdateManyInput>;
    /**
     * Filter which Rooms to update
     */
    where?: Prisma.RoomWhereInput;
    /**
     * Limit how many Rooms to update.
     */
    limit?: number;
};
/**
 * Room upsert
 */
export type RoomUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: Prisma.RoomWhereUniqueInput;
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: Prisma.XOR<Prisma.RoomCreateInput, Prisma.RoomUncheckedCreateInput>;
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RoomUpdateInput, Prisma.RoomUncheckedUpdateInput>;
};
/**
 * Room delete
 */
export type RoomDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Room to delete.
     */
    where: Prisma.RoomWhereUniqueInput;
};
/**
 * Room deleteMany
 */
export type RoomDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: Prisma.RoomWhereInput;
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number;
};
/**
 * Room.lead
 */
export type Room$leadArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Room.members
 */
export type Room$membersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Room.milestones
 */
export type Room$milestonesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: Prisma.MilestoneSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Milestone
     */
    omit?: Prisma.MilestoneOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MilestoneInclude<ExtArgs> | null;
    where?: Prisma.MilestoneWhereInput;
    orderBy?: Prisma.MilestoneOrderByWithRelationInput | Prisma.MilestoneOrderByWithRelationInput[];
    cursor?: Prisma.MilestoneWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MilestoneScalarFieldEnum | Prisma.MilestoneScalarFieldEnum[];
};
/**
 * Room.chatSessions
 */
export type Room$chatSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSession
     */
    select?: Prisma.ChatSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatSession
     */
    omit?: Prisma.ChatSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChatSessionInclude<ExtArgs> | null;
    where?: Prisma.ChatSessionWhereInput;
    orderBy?: Prisma.ChatSessionOrderByWithRelationInput | Prisma.ChatSessionOrderByWithRelationInput[];
    cursor?: Prisma.ChatSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatSessionScalarFieldEnum | Prisma.ChatSessionScalarFieldEnum[];
};
/**
 * Room.insights
 */
export type Room$insightsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInsight
     */
    select?: Prisma.AIInsightSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AIInsight
     */
    omit?: Prisma.AIInsightOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AIInsightInclude<ExtArgs> | null;
    where?: Prisma.AIInsightWhereInput;
    orderBy?: Prisma.AIInsightOrderByWithRelationInput | Prisma.AIInsightOrderByWithRelationInput[];
    cursor?: Prisma.AIInsightWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AIInsightScalarFieldEnum | Prisma.AIInsightScalarFieldEnum[];
};
/**
 * Room without action
 */
export type RoomDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=Room.d.ts.map