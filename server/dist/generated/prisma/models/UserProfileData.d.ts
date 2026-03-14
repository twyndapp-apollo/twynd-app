import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model UserProfileData
 *
 */
export type UserProfileDataModel = runtime.Types.Result.DefaultSelection<Prisma.$UserProfileDataPayload>;
export type AggregateUserProfileData = {
    _count: UserProfileDataCountAggregateOutputType | null;
    _min: UserProfileDataMinAggregateOutputType | null;
    _max: UserProfileDataMaxAggregateOutputType | null;
};
export type UserProfileDataMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    summary: string | null;
    updatedAt: Date | null;
};
export type UserProfileDataMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    summary: string | null;
    updatedAt: Date | null;
};
export type UserProfileDataCountAggregateOutputType = {
    id: number;
    userId: number;
    summary: number;
    preferences: number;
    character: number;
    info: number;
    updatedAt: number;
    _all: number;
};
export type UserProfileDataMinAggregateInputType = {
    id?: true;
    userId?: true;
    summary?: true;
    updatedAt?: true;
};
export type UserProfileDataMaxAggregateInputType = {
    id?: true;
    userId?: true;
    summary?: true;
    updatedAt?: true;
};
export type UserProfileDataCountAggregateInputType = {
    id?: true;
    userId?: true;
    summary?: true;
    preferences?: true;
    character?: true;
    info?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserProfileDataAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfileData to aggregate.
     */
    where?: Prisma.UserProfileDataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserProfileData to fetch.
     */
    orderBy?: Prisma.UserProfileDataOrderByWithRelationInput | Prisma.UserProfileDataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserProfileDataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserProfileData from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserProfileData.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned UserProfileData
    **/
    _count?: true | UserProfileDataCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserProfileDataMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserProfileDataMaxAggregateInputType;
};
export type GetUserProfileDataAggregateType<T extends UserProfileDataAggregateArgs> = {
    [P in keyof T & keyof AggregateUserProfileData]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserProfileData[P]> : Prisma.GetScalarType<T[P], AggregateUserProfileData[P]>;
};
export type UserProfileDataGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserProfileDataWhereInput;
    orderBy?: Prisma.UserProfileDataOrderByWithAggregationInput | Prisma.UserProfileDataOrderByWithAggregationInput[];
    by: Prisma.UserProfileDataScalarFieldEnum[] | Prisma.UserProfileDataScalarFieldEnum;
    having?: Prisma.UserProfileDataScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserProfileDataCountAggregateInputType | true;
    _min?: UserProfileDataMinAggregateInputType;
    _max?: UserProfileDataMaxAggregateInputType;
};
export type UserProfileDataGroupByOutputType = {
    id: string;
    userId: string;
    summary: string | null;
    preferences: runtime.JsonValue | null;
    character: runtime.JsonValue | null;
    info: runtime.JsonValue | null;
    updatedAt: Date;
    _count: UserProfileDataCountAggregateOutputType | null;
    _min: UserProfileDataMinAggregateOutputType | null;
    _max: UserProfileDataMaxAggregateOutputType | null;
};
type GetUserProfileDataGroupByPayload<T extends UserProfileDataGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserProfileDataGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserProfileDataGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserProfileDataGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserProfileDataGroupByOutputType[P]>;
}>>;
export type UserProfileDataWhereInput = {
    AND?: Prisma.UserProfileDataWhereInput | Prisma.UserProfileDataWhereInput[];
    OR?: Prisma.UserProfileDataWhereInput[];
    NOT?: Prisma.UserProfileDataWhereInput | Prisma.UserProfileDataWhereInput[];
    id?: Prisma.StringFilter<"UserProfileData"> | string;
    userId?: Prisma.StringFilter<"UserProfileData"> | string;
    summary?: Prisma.StringNullableFilter<"UserProfileData"> | string | null;
    preferences?: Prisma.JsonNullableFilter<"UserProfileData">;
    character?: Prisma.JsonNullableFilter<"UserProfileData">;
    info?: Prisma.JsonNullableFilter<"UserProfileData">;
    updatedAt?: Prisma.DateTimeFilter<"UserProfileData"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserProfileDataOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    summary?: Prisma.SortOrderInput | Prisma.SortOrder;
    preferences?: Prisma.SortOrderInput | Prisma.SortOrder;
    character?: Prisma.SortOrderInput | Prisma.SortOrder;
    info?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type UserProfileDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.UserProfileDataWhereInput | Prisma.UserProfileDataWhereInput[];
    OR?: Prisma.UserProfileDataWhereInput[];
    NOT?: Prisma.UserProfileDataWhereInput | Prisma.UserProfileDataWhereInput[];
    summary?: Prisma.StringNullableFilter<"UserProfileData"> | string | null;
    preferences?: Prisma.JsonNullableFilter<"UserProfileData">;
    character?: Prisma.JsonNullableFilter<"UserProfileData">;
    info?: Prisma.JsonNullableFilter<"UserProfileData">;
    updatedAt?: Prisma.DateTimeFilter<"UserProfileData"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type UserProfileDataOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    summary?: Prisma.SortOrderInput | Prisma.SortOrder;
    preferences?: Prisma.SortOrderInput | Prisma.SortOrder;
    character?: Prisma.SortOrderInput | Prisma.SortOrder;
    info?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserProfileDataCountOrderByAggregateInput;
    _max?: Prisma.UserProfileDataMaxOrderByAggregateInput;
    _min?: Prisma.UserProfileDataMinOrderByAggregateInput;
};
export type UserProfileDataScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserProfileDataScalarWhereWithAggregatesInput | Prisma.UserProfileDataScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserProfileDataScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserProfileDataScalarWhereWithAggregatesInput | Prisma.UserProfileDataScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserProfileData"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"UserProfileData"> | string;
    summary?: Prisma.StringNullableWithAggregatesFilter<"UserProfileData"> | string | null;
    preferences?: Prisma.JsonNullableWithAggregatesFilter<"UserProfileData">;
    character?: Prisma.JsonNullableWithAggregatesFilter<"UserProfileData">;
    info?: Prisma.JsonNullableWithAggregatesFilter<"UserProfileData">;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"UserProfileData"> | Date | string;
};
export type UserProfileDataCreateInput = {
    id?: string;
    summary?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    character?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    info?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutProfileDataInput;
};
export type UserProfileDataUncheckedCreateInput = {
    id?: string;
    userId: string;
    summary?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    character?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    info?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Date | string;
};
export type UserProfileDataUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    character?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    info?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutProfileDataNestedInput;
};
export type UserProfileDataUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    character?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    info?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProfileDataCreateManyInput = {
    id?: string;
    userId: string;
    summary?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    character?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    info?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Date | string;
};
export type UserProfileDataUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    character?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    info?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProfileDataUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    character?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    info?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProfileDataNullableScalarRelationFilter = {
    is?: Prisma.UserProfileDataWhereInput | null;
    isNot?: Prisma.UserProfileDataWhereInput | null;
};
export type UserProfileDataCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    preferences?: Prisma.SortOrder;
    character?: Prisma.SortOrder;
    info?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserProfileDataMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserProfileDataMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserProfileDataCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserProfileDataCreateWithoutUserInput, Prisma.UserProfileDataUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserProfileDataCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserProfileDataWhereUniqueInput;
};
export type UserProfileDataUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserProfileDataCreateWithoutUserInput, Prisma.UserProfileDataUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserProfileDataCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserProfileDataWhereUniqueInput;
};
export type UserProfileDataUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserProfileDataCreateWithoutUserInput, Prisma.UserProfileDataUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserProfileDataCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserProfileDataUpsertWithoutUserInput;
    disconnect?: Prisma.UserProfileDataWhereInput | boolean;
    delete?: Prisma.UserProfileDataWhereInput | boolean;
    connect?: Prisma.UserProfileDataWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserProfileDataUpdateToOneWithWhereWithoutUserInput, Prisma.UserProfileDataUpdateWithoutUserInput>, Prisma.UserProfileDataUncheckedUpdateWithoutUserInput>;
};
export type UserProfileDataUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserProfileDataCreateWithoutUserInput, Prisma.UserProfileDataUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserProfileDataCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserProfileDataUpsertWithoutUserInput;
    disconnect?: Prisma.UserProfileDataWhereInput | boolean;
    delete?: Prisma.UserProfileDataWhereInput | boolean;
    connect?: Prisma.UserProfileDataWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserProfileDataUpdateToOneWithWhereWithoutUserInput, Prisma.UserProfileDataUpdateWithoutUserInput>, Prisma.UserProfileDataUncheckedUpdateWithoutUserInput>;
};
export type UserProfileDataCreateWithoutUserInput = {
    id?: string;
    summary?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    character?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    info?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Date | string;
};
export type UserProfileDataUncheckedCreateWithoutUserInput = {
    id?: string;
    summary?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    character?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    info?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Date | string;
};
export type UserProfileDataCreateOrConnectWithoutUserInput = {
    where: Prisma.UserProfileDataWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserProfileDataCreateWithoutUserInput, Prisma.UserProfileDataUncheckedCreateWithoutUserInput>;
};
export type UserProfileDataUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.UserProfileDataUpdateWithoutUserInput, Prisma.UserProfileDataUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserProfileDataCreateWithoutUserInput, Prisma.UserProfileDataUncheckedCreateWithoutUserInput>;
    where?: Prisma.UserProfileDataWhereInput;
};
export type UserProfileDataUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.UserProfileDataWhereInput;
    data: Prisma.XOR<Prisma.UserProfileDataUpdateWithoutUserInput, Prisma.UserProfileDataUncheckedUpdateWithoutUserInput>;
};
export type UserProfileDataUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    character?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    info?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProfileDataUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    character?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    info?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserProfileDataSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    summary?: boolean;
    preferences?: boolean;
    character?: boolean;
    info?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userProfileData"]>;
export type UserProfileDataSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    summary?: boolean;
    preferences?: boolean;
    character?: boolean;
    info?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userProfileData"]>;
export type UserProfileDataSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    summary?: boolean;
    preferences?: boolean;
    character?: boolean;
    info?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userProfileData"]>;
export type UserProfileDataSelectScalar = {
    id?: boolean;
    userId?: boolean;
    summary?: boolean;
    preferences?: boolean;
    character?: boolean;
    info?: boolean;
    updatedAt?: boolean;
};
export type UserProfileDataOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "summary" | "preferences" | "character" | "info" | "updatedAt", ExtArgs["result"]["userProfileData"]>;
export type UserProfileDataInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserProfileDataIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserProfileDataIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserProfileDataPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserProfileData";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        summary: string | null;
        preferences: runtime.JsonValue | null;
        character: runtime.JsonValue | null;
        info: runtime.JsonValue | null;
        updatedAt: Date;
    }, ExtArgs["result"]["userProfileData"]>;
    composites: {};
};
export type UserProfileDataGetPayload<S extends boolean | null | undefined | UserProfileDataDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserProfileDataPayload, S>;
export type UserProfileDataCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserProfileDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserProfileDataCountAggregateInputType | true;
};
export interface UserProfileDataDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserProfileData'];
        meta: {
            name: 'UserProfileData';
        };
    };
    /**
     * Find zero or one UserProfileData that matches the filter.
     * @param {UserProfileDataFindUniqueArgs} args - Arguments to find a UserProfileData
     * @example
     * // Get one UserProfileData
     * const userProfileData = await prisma.userProfileData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProfileDataFindUniqueArgs>(args: Prisma.SelectSubset<T, UserProfileDataFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserProfileDataClient<runtime.Types.Result.GetResult<Prisma.$UserProfileDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one UserProfileData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProfileDataFindUniqueOrThrowArgs} args - Arguments to find a UserProfileData
     * @example
     * // Get one UserProfileData
     * const userProfileData = await prisma.userProfileData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProfileDataFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserProfileDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserProfileDataClient<runtime.Types.Result.GetResult<Prisma.$UserProfileDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UserProfileData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileDataFindFirstArgs} args - Arguments to find a UserProfileData
     * @example
     * // Get one UserProfileData
     * const userProfileData = await prisma.userProfileData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProfileDataFindFirstArgs>(args?: Prisma.SelectSubset<T, UserProfileDataFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserProfileDataClient<runtime.Types.Result.GetResult<Prisma.$UserProfileDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UserProfileData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileDataFindFirstOrThrowArgs} args - Arguments to find a UserProfileData
     * @example
     * // Get one UserProfileData
     * const userProfileData = await prisma.userProfileData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProfileDataFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserProfileDataFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserProfileDataClient<runtime.Types.Result.GetResult<Prisma.$UserProfileDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more UserProfileData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProfileData
     * const userProfileData = await prisma.userProfileData.findMany()
     *
     * // Get first 10 UserProfileData
     * const userProfileData = await prisma.userProfileData.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userProfileDataWithIdOnly = await prisma.userProfileData.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserProfileDataFindManyArgs>(args?: Prisma.SelectSubset<T, UserProfileDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserProfileDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a UserProfileData.
     * @param {UserProfileDataCreateArgs} args - Arguments to create a UserProfileData.
     * @example
     * // Create one UserProfileData
     * const UserProfileData = await prisma.userProfileData.create({
     *   data: {
     *     // ... data to create a UserProfileData
     *   }
     * })
     *
     */
    create<T extends UserProfileDataCreateArgs>(args: Prisma.SelectSubset<T, UserProfileDataCreateArgs<ExtArgs>>): Prisma.Prisma__UserProfileDataClient<runtime.Types.Result.GetResult<Prisma.$UserProfileDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many UserProfileData.
     * @param {UserProfileDataCreateManyArgs} args - Arguments to create many UserProfileData.
     * @example
     * // Create many UserProfileData
     * const userProfileData = await prisma.userProfileData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserProfileDataCreateManyArgs>(args?: Prisma.SelectSubset<T, UserProfileDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many UserProfileData and returns the data saved in the database.
     * @param {UserProfileDataCreateManyAndReturnArgs} args - Arguments to create many UserProfileData.
     * @example
     * // Create many UserProfileData
     * const userProfileData = await prisma.userProfileData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many UserProfileData and only return the `id`
     * const userProfileDataWithIdOnly = await prisma.userProfileData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserProfileDataCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserProfileDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserProfileDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a UserProfileData.
     * @param {UserProfileDataDeleteArgs} args - Arguments to delete one UserProfileData.
     * @example
     * // Delete one UserProfileData
     * const UserProfileData = await prisma.userProfileData.delete({
     *   where: {
     *     // ... filter to delete one UserProfileData
     *   }
     * })
     *
     */
    delete<T extends UserProfileDataDeleteArgs>(args: Prisma.SelectSubset<T, UserProfileDataDeleteArgs<ExtArgs>>): Prisma.Prisma__UserProfileDataClient<runtime.Types.Result.GetResult<Prisma.$UserProfileDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one UserProfileData.
     * @param {UserProfileDataUpdateArgs} args - Arguments to update one UserProfileData.
     * @example
     * // Update one UserProfileData
     * const userProfileData = await prisma.userProfileData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserProfileDataUpdateArgs>(args: Prisma.SelectSubset<T, UserProfileDataUpdateArgs<ExtArgs>>): Prisma.Prisma__UserProfileDataClient<runtime.Types.Result.GetResult<Prisma.$UserProfileDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more UserProfileData.
     * @param {UserProfileDataDeleteManyArgs} args - Arguments to filter UserProfileData to delete.
     * @example
     * // Delete a few UserProfileData
     * const { count } = await prisma.userProfileData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserProfileDataDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserProfileDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more UserProfileData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProfileData
     * const userProfileData = await prisma.userProfileData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserProfileDataUpdateManyArgs>(args: Prisma.SelectSubset<T, UserProfileDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more UserProfileData and returns the data updated in the database.
     * @param {UserProfileDataUpdateManyAndReturnArgs} args - Arguments to update many UserProfileData.
     * @example
     * // Update many UserProfileData
     * const userProfileData = await prisma.userProfileData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more UserProfileData and only return the `id`
     * const userProfileDataWithIdOnly = await prisma.userProfileData.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserProfileDataUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserProfileDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserProfileDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one UserProfileData.
     * @param {UserProfileDataUpsertArgs} args - Arguments to update or create a UserProfileData.
     * @example
     * // Update or create a UserProfileData
     * const userProfileData = await prisma.userProfileData.upsert({
     *   create: {
     *     // ... data to create a UserProfileData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProfileData we want to update
     *   }
     * })
     */
    upsert<T extends UserProfileDataUpsertArgs>(args: Prisma.SelectSubset<T, UserProfileDataUpsertArgs<ExtArgs>>): Prisma.Prisma__UserProfileDataClient<runtime.Types.Result.GetResult<Prisma.$UserProfileDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of UserProfileData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileDataCountArgs} args - Arguments to filter UserProfileData to count.
     * @example
     * // Count the number of UserProfileData
     * const count = await prisma.userProfileData.count({
     *   where: {
     *     // ... the filter for the UserProfileData we want to count
     *   }
     * })
    **/
    count<T extends UserProfileDataCountArgs>(args?: Prisma.Subset<T, UserProfileDataCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserProfileDataCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a UserProfileData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserProfileDataAggregateArgs>(args: Prisma.Subset<T, UserProfileDataAggregateArgs>): Prisma.PrismaPromise<GetUserProfileDataAggregateType<T>>;
    /**
     * Group by UserProfileData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileDataGroupByArgs} args - Group by arguments.
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
    groupBy<T extends UserProfileDataGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserProfileDataGroupByArgs['orderBy'];
    } : {
        orderBy?: UserProfileDataGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserProfileDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the UserProfileData model
     */
    readonly fields: UserProfileDataFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for UserProfileData.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserProfileDataClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the UserProfileData model
 */
export interface UserProfileDataFieldRefs {
    readonly id: Prisma.FieldRef<"UserProfileData", 'String'>;
    readonly userId: Prisma.FieldRef<"UserProfileData", 'String'>;
    readonly summary: Prisma.FieldRef<"UserProfileData", 'String'>;
    readonly preferences: Prisma.FieldRef<"UserProfileData", 'Json'>;
    readonly character: Prisma.FieldRef<"UserProfileData", 'Json'>;
    readonly info: Prisma.FieldRef<"UserProfileData", 'Json'>;
    readonly updatedAt: Prisma.FieldRef<"UserProfileData", 'DateTime'>;
}
/**
 * UserProfileData findUnique
 */
export type UserProfileDataFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileData
     */
    select?: Prisma.UserProfileDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProfileData
     */
    omit?: Prisma.UserProfileDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProfileDataInclude<ExtArgs> | null;
    /**
     * Filter, which UserProfileData to fetch.
     */
    where: Prisma.UserProfileDataWhereUniqueInput;
};
/**
 * UserProfileData findUniqueOrThrow
 */
export type UserProfileDataFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileData
     */
    select?: Prisma.UserProfileDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProfileData
     */
    omit?: Prisma.UserProfileDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProfileDataInclude<ExtArgs> | null;
    /**
     * Filter, which UserProfileData to fetch.
     */
    where: Prisma.UserProfileDataWhereUniqueInput;
};
/**
 * UserProfileData findFirst
 */
export type UserProfileDataFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileData
     */
    select?: Prisma.UserProfileDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProfileData
     */
    omit?: Prisma.UserProfileDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProfileDataInclude<ExtArgs> | null;
    /**
     * Filter, which UserProfileData to fetch.
     */
    where?: Prisma.UserProfileDataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserProfileData to fetch.
     */
    orderBy?: Prisma.UserProfileDataOrderByWithRelationInput | Prisma.UserProfileDataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserProfileData.
     */
    cursor?: Prisma.UserProfileDataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserProfileData from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserProfileData.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserProfileData.
     */
    distinct?: Prisma.UserProfileDataScalarFieldEnum | Prisma.UserProfileDataScalarFieldEnum[];
};
/**
 * UserProfileData findFirstOrThrow
 */
export type UserProfileDataFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileData
     */
    select?: Prisma.UserProfileDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProfileData
     */
    omit?: Prisma.UserProfileDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProfileDataInclude<ExtArgs> | null;
    /**
     * Filter, which UserProfileData to fetch.
     */
    where?: Prisma.UserProfileDataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserProfileData to fetch.
     */
    orderBy?: Prisma.UserProfileDataOrderByWithRelationInput | Prisma.UserProfileDataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserProfileData.
     */
    cursor?: Prisma.UserProfileDataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserProfileData from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserProfileData.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserProfileData.
     */
    distinct?: Prisma.UserProfileDataScalarFieldEnum | Prisma.UserProfileDataScalarFieldEnum[];
};
/**
 * UserProfileData findMany
 */
export type UserProfileDataFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileData
     */
    select?: Prisma.UserProfileDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProfileData
     */
    omit?: Prisma.UserProfileDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProfileDataInclude<ExtArgs> | null;
    /**
     * Filter, which UserProfileData to fetch.
     */
    where?: Prisma.UserProfileDataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserProfileData to fetch.
     */
    orderBy?: Prisma.UserProfileDataOrderByWithRelationInput | Prisma.UserProfileDataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing UserProfileData.
     */
    cursor?: Prisma.UserProfileDataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserProfileData from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserProfileData.
     */
    skip?: number;
    distinct?: Prisma.UserProfileDataScalarFieldEnum | Prisma.UserProfileDataScalarFieldEnum[];
};
/**
 * UserProfileData create
 */
export type UserProfileDataCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileData
     */
    select?: Prisma.UserProfileDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProfileData
     */
    omit?: Prisma.UserProfileDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProfileDataInclude<ExtArgs> | null;
    /**
     * The data needed to create a UserProfileData.
     */
    data: Prisma.XOR<Prisma.UserProfileDataCreateInput, Prisma.UserProfileDataUncheckedCreateInput>;
};
/**
 * UserProfileData createMany
 */
export type UserProfileDataCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProfileData.
     */
    data: Prisma.UserProfileDataCreateManyInput | Prisma.UserProfileDataCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * UserProfileData createManyAndReturn
 */
export type UserProfileDataCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileData
     */
    select?: Prisma.UserProfileDataSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProfileData
     */
    omit?: Prisma.UserProfileDataOmit<ExtArgs> | null;
    /**
     * The data used to create many UserProfileData.
     */
    data: Prisma.UserProfileDataCreateManyInput | Prisma.UserProfileDataCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProfileDataIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * UserProfileData update
 */
export type UserProfileDataUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileData
     */
    select?: Prisma.UserProfileDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProfileData
     */
    omit?: Prisma.UserProfileDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProfileDataInclude<ExtArgs> | null;
    /**
     * The data needed to update a UserProfileData.
     */
    data: Prisma.XOR<Prisma.UserProfileDataUpdateInput, Prisma.UserProfileDataUncheckedUpdateInput>;
    /**
     * Choose, which UserProfileData to update.
     */
    where: Prisma.UserProfileDataWhereUniqueInput;
};
/**
 * UserProfileData updateMany
 */
export type UserProfileDataUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProfileData.
     */
    data: Prisma.XOR<Prisma.UserProfileDataUpdateManyMutationInput, Prisma.UserProfileDataUncheckedUpdateManyInput>;
    /**
     * Filter which UserProfileData to update
     */
    where?: Prisma.UserProfileDataWhereInput;
    /**
     * Limit how many UserProfileData to update.
     */
    limit?: number;
};
/**
 * UserProfileData updateManyAndReturn
 */
export type UserProfileDataUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileData
     */
    select?: Prisma.UserProfileDataSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProfileData
     */
    omit?: Prisma.UserProfileDataOmit<ExtArgs> | null;
    /**
     * The data used to update UserProfileData.
     */
    data: Prisma.XOR<Prisma.UserProfileDataUpdateManyMutationInput, Prisma.UserProfileDataUncheckedUpdateManyInput>;
    /**
     * Filter which UserProfileData to update
     */
    where?: Prisma.UserProfileDataWhereInput;
    /**
     * Limit how many UserProfileData to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProfileDataIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * UserProfileData upsert
 */
export type UserProfileDataUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileData
     */
    select?: Prisma.UserProfileDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProfileData
     */
    omit?: Prisma.UserProfileDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProfileDataInclude<ExtArgs> | null;
    /**
     * The filter to search for the UserProfileData to update in case it exists.
     */
    where: Prisma.UserProfileDataWhereUniqueInput;
    /**
     * In case the UserProfileData found by the `where` argument doesn't exist, create a new UserProfileData with this data.
     */
    create: Prisma.XOR<Prisma.UserProfileDataCreateInput, Prisma.UserProfileDataUncheckedCreateInput>;
    /**
     * In case the UserProfileData was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserProfileDataUpdateInput, Prisma.UserProfileDataUncheckedUpdateInput>;
};
/**
 * UserProfileData delete
 */
export type UserProfileDataDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileData
     */
    select?: Prisma.UserProfileDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProfileData
     */
    omit?: Prisma.UserProfileDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProfileDataInclude<ExtArgs> | null;
    /**
     * Filter which UserProfileData to delete.
     */
    where: Prisma.UserProfileDataWhereUniqueInput;
};
/**
 * UserProfileData deleteMany
 */
export type UserProfileDataDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfileData to delete
     */
    where?: Prisma.UserProfileDataWhereInput;
    /**
     * Limit how many UserProfileData to delete.
     */
    limit?: number;
};
/**
 * UserProfileData without action
 */
export type UserProfileDataDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileData
     */
    select?: Prisma.UserProfileDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserProfileData
     */
    omit?: Prisma.UserProfileDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserProfileDataInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=UserProfileData.d.ts.map