import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model RoomAccess
 *
 */
export type RoomAccessModel = runtime.Types.Result.DefaultSelection<Prisma.$RoomAccessPayload>;
export type AggregateRoomAccess = {
    _count: RoomAccessCountAggregateOutputType | null;
    _min: RoomAccessMinAggregateOutputType | null;
    _max: RoomAccessMaxAggregateOutputType | null;
};
export type RoomAccessMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    createdAt: Date | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    usedByUserId: string | null;
};
export type RoomAccessMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    createdAt: Date | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    usedByUserId: string | null;
};
export type RoomAccessCountAggregateOutputType = {
    id: number;
    code: number;
    createdAt: number;
    expiresAt: number;
    usedAt: number;
    usedByUserId: number;
    _all: number;
};
export type RoomAccessMinAggregateInputType = {
    id?: true;
    code?: true;
    createdAt?: true;
    expiresAt?: true;
    usedAt?: true;
    usedByUserId?: true;
};
export type RoomAccessMaxAggregateInputType = {
    id?: true;
    code?: true;
    createdAt?: true;
    expiresAt?: true;
    usedAt?: true;
    usedByUserId?: true;
};
export type RoomAccessCountAggregateInputType = {
    id?: true;
    code?: true;
    createdAt?: true;
    expiresAt?: true;
    usedAt?: true;
    usedByUserId?: true;
    _all?: true;
};
export type RoomAccessAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RoomAccess to aggregate.
     */
    where?: Prisma.RoomAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoomAccesses to fetch.
     */
    orderBy?: Prisma.RoomAccessOrderByWithRelationInput | Prisma.RoomAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RoomAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoomAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoomAccesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RoomAccesses
    **/
    _count?: true | RoomAccessCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RoomAccessMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RoomAccessMaxAggregateInputType;
};
export type GetRoomAccessAggregateType<T extends RoomAccessAggregateArgs> = {
    [P in keyof T & keyof AggregateRoomAccess]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRoomAccess[P]> : Prisma.GetScalarType<T[P], AggregateRoomAccess[P]>;
};
export type RoomAccessGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomAccessWhereInput;
    orderBy?: Prisma.RoomAccessOrderByWithAggregationInput | Prisma.RoomAccessOrderByWithAggregationInput[];
    by: Prisma.RoomAccessScalarFieldEnum[] | Prisma.RoomAccessScalarFieldEnum;
    having?: Prisma.RoomAccessScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RoomAccessCountAggregateInputType | true;
    _min?: RoomAccessMinAggregateInputType;
    _max?: RoomAccessMaxAggregateInputType;
};
export type RoomAccessGroupByOutputType = {
    id: string;
    code: string;
    createdAt: Date;
    expiresAt: Date | null;
    usedAt: Date | null;
    usedByUserId: string | null;
    _count: RoomAccessCountAggregateOutputType | null;
    _min: RoomAccessMinAggregateOutputType | null;
    _max: RoomAccessMaxAggregateOutputType | null;
};
type GetRoomAccessGroupByPayload<T extends RoomAccessGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RoomAccessGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RoomAccessGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RoomAccessGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RoomAccessGroupByOutputType[P]>;
}>>;
export type RoomAccessWhereInput = {
    AND?: Prisma.RoomAccessWhereInput | Prisma.RoomAccessWhereInput[];
    OR?: Prisma.RoomAccessWhereInput[];
    NOT?: Prisma.RoomAccessWhereInput | Prisma.RoomAccessWhereInput[];
    id?: Prisma.StringFilter<"RoomAccess"> | string;
    code?: Prisma.StringFilter<"RoomAccess"> | string;
    createdAt?: Prisma.DateTimeFilter<"RoomAccess"> | Date | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"RoomAccess"> | Date | string | null;
    usedAt?: Prisma.DateTimeNullableFilter<"RoomAccess"> | Date | string | null;
    usedByUserId?: Prisma.StringNullableFilter<"RoomAccess"> | string | null;
};
export type RoomAccessOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    usedByUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type RoomAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.RoomAccessWhereInput | Prisma.RoomAccessWhereInput[];
    OR?: Prisma.RoomAccessWhereInput[];
    NOT?: Prisma.RoomAccessWhereInput | Prisma.RoomAccessWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"RoomAccess"> | Date | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"RoomAccess"> | Date | string | null;
    usedAt?: Prisma.DateTimeNullableFilter<"RoomAccess"> | Date | string | null;
    usedByUserId?: Prisma.StringNullableFilter<"RoomAccess"> | string | null;
}, "id" | "code">;
export type RoomAccessOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    usedByUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.RoomAccessCountOrderByAggregateInput;
    _max?: Prisma.RoomAccessMaxOrderByAggregateInput;
    _min?: Prisma.RoomAccessMinOrderByAggregateInput;
};
export type RoomAccessScalarWhereWithAggregatesInput = {
    AND?: Prisma.RoomAccessScalarWhereWithAggregatesInput | Prisma.RoomAccessScalarWhereWithAggregatesInput[];
    OR?: Prisma.RoomAccessScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RoomAccessScalarWhereWithAggregatesInput | Prisma.RoomAccessScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RoomAccess"> | string;
    code?: Prisma.StringWithAggregatesFilter<"RoomAccess"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RoomAccess"> | Date | string;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"RoomAccess"> | Date | string | null;
    usedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"RoomAccess"> | Date | string | null;
    usedByUserId?: Prisma.StringNullableWithAggregatesFilter<"RoomAccess"> | string | null;
};
export type RoomAccessCreateInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    expiresAt?: Date | string | null;
    usedAt?: Date | string | null;
    usedByUserId?: string | null;
};
export type RoomAccessUncheckedCreateInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    expiresAt?: Date | string | null;
    usedAt?: Date | string | null;
    usedByUserId?: string | null;
};
export type RoomAccessUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usedByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type RoomAccessUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usedByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type RoomAccessCreateManyInput = {
    id?: string;
    code: string;
    createdAt?: Date | string;
    expiresAt?: Date | string | null;
    usedAt?: Date | string | null;
    usedByUserId?: string | null;
};
export type RoomAccessUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usedByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type RoomAccessUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usedByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type RoomAccessCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    usedByUserId?: Prisma.SortOrder;
};
export type RoomAccessMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    usedByUserId?: Prisma.SortOrder;
};
export type RoomAccessMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    usedByUserId?: Prisma.SortOrder;
};
export type RoomAccessSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    usedByUserId?: boolean;
}, ExtArgs["result"]["roomAccess"]>;
export type RoomAccessSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    usedByUserId?: boolean;
}, ExtArgs["result"]["roomAccess"]>;
export type RoomAccessSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    usedByUserId?: boolean;
}, ExtArgs["result"]["roomAccess"]>;
export type RoomAccessSelectScalar = {
    id?: boolean;
    code?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    usedByUserId?: boolean;
};
export type RoomAccessOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "createdAt" | "expiresAt" | "usedAt" | "usedByUserId", ExtArgs["result"]["roomAccess"]>;
export type $RoomAccessPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RoomAccess";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        createdAt: Date;
        expiresAt: Date | null;
        usedAt: Date | null;
        usedByUserId: string | null;
    }, ExtArgs["result"]["roomAccess"]>;
    composites: {};
};
export type RoomAccessGetPayload<S extends boolean | null | undefined | RoomAccessDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RoomAccessPayload, S>;
export type RoomAccessCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RoomAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RoomAccessCountAggregateInputType | true;
};
export interface RoomAccessDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RoomAccess'];
        meta: {
            name: 'RoomAccess';
        };
    };
    /**
     * Find zero or one RoomAccess that matches the filter.
     * @param {RoomAccessFindUniqueArgs} args - Arguments to find a RoomAccess
     * @example
     * // Get one RoomAccess
     * const roomAccess = await prisma.roomAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomAccessFindUniqueArgs>(args: Prisma.SelectSubset<T, RoomAccessFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RoomAccessClient<runtime.Types.Result.GetResult<Prisma.$RoomAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one RoomAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomAccessFindUniqueOrThrowArgs} args - Arguments to find a RoomAccess
     * @example
     * // Get one RoomAccess
     * const roomAccess = await prisma.roomAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomAccessFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RoomAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomAccessClient<runtime.Types.Result.GetResult<Prisma.$RoomAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RoomAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAccessFindFirstArgs} args - Arguments to find a RoomAccess
     * @example
     * // Get one RoomAccess
     * const roomAccess = await prisma.roomAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomAccessFindFirstArgs>(args?: Prisma.SelectSubset<T, RoomAccessFindFirstArgs<ExtArgs>>): Prisma.Prisma__RoomAccessClient<runtime.Types.Result.GetResult<Prisma.$RoomAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RoomAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAccessFindFirstOrThrowArgs} args - Arguments to find a RoomAccess
     * @example
     * // Get one RoomAccess
     * const roomAccess = await prisma.roomAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomAccessFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RoomAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomAccessClient<runtime.Types.Result.GetResult<Prisma.$RoomAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more RoomAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomAccesses
     * const roomAccesses = await prisma.roomAccess.findMany()
     *
     * // Get first 10 RoomAccesses
     * const roomAccesses = await prisma.roomAccess.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const roomAccessWithIdOnly = await prisma.roomAccess.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RoomAccessFindManyArgs>(args?: Prisma.SelectSubset<T, RoomAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a RoomAccess.
     * @param {RoomAccessCreateArgs} args - Arguments to create a RoomAccess.
     * @example
     * // Create one RoomAccess
     * const RoomAccess = await prisma.roomAccess.create({
     *   data: {
     *     // ... data to create a RoomAccess
     *   }
     * })
     *
     */
    create<T extends RoomAccessCreateArgs>(args: Prisma.SelectSubset<T, RoomAccessCreateArgs<ExtArgs>>): Prisma.Prisma__RoomAccessClient<runtime.Types.Result.GetResult<Prisma.$RoomAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many RoomAccesses.
     * @param {RoomAccessCreateManyArgs} args - Arguments to create many RoomAccesses.
     * @example
     * // Create many RoomAccesses
     * const roomAccess = await prisma.roomAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RoomAccessCreateManyArgs>(args?: Prisma.SelectSubset<T, RoomAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many RoomAccesses and returns the data saved in the database.
     * @param {RoomAccessCreateManyAndReturnArgs} args - Arguments to create many RoomAccesses.
     * @example
     * // Create many RoomAccesses
     * const roomAccess = await prisma.roomAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RoomAccesses and only return the `id`
     * const roomAccessWithIdOnly = await prisma.roomAccess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RoomAccessCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RoomAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomAccessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a RoomAccess.
     * @param {RoomAccessDeleteArgs} args - Arguments to delete one RoomAccess.
     * @example
     * // Delete one RoomAccess
     * const RoomAccess = await prisma.roomAccess.delete({
     *   where: {
     *     // ... filter to delete one RoomAccess
     *   }
     * })
     *
     */
    delete<T extends RoomAccessDeleteArgs>(args: Prisma.SelectSubset<T, RoomAccessDeleteArgs<ExtArgs>>): Prisma.Prisma__RoomAccessClient<runtime.Types.Result.GetResult<Prisma.$RoomAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one RoomAccess.
     * @param {RoomAccessUpdateArgs} args - Arguments to update one RoomAccess.
     * @example
     * // Update one RoomAccess
     * const roomAccess = await prisma.roomAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RoomAccessUpdateArgs>(args: Prisma.SelectSubset<T, RoomAccessUpdateArgs<ExtArgs>>): Prisma.Prisma__RoomAccessClient<runtime.Types.Result.GetResult<Prisma.$RoomAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more RoomAccesses.
     * @param {RoomAccessDeleteManyArgs} args - Arguments to filter RoomAccesses to delete.
     * @example
     * // Delete a few RoomAccesses
     * const { count } = await prisma.roomAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RoomAccessDeleteManyArgs>(args?: Prisma.SelectSubset<T, RoomAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RoomAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomAccesses
     * const roomAccess = await prisma.roomAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RoomAccessUpdateManyArgs>(args: Prisma.SelectSubset<T, RoomAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RoomAccesses and returns the data updated in the database.
     * @param {RoomAccessUpdateManyAndReturnArgs} args - Arguments to update many RoomAccesses.
     * @example
     * // Update many RoomAccesses
     * const roomAccess = await prisma.roomAccess.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RoomAccesses and only return the `id`
     * const roomAccessWithIdOnly = await prisma.roomAccess.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoomAccessUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RoomAccessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomAccessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one RoomAccess.
     * @param {RoomAccessUpsertArgs} args - Arguments to update or create a RoomAccess.
     * @example
     * // Update or create a RoomAccess
     * const roomAccess = await prisma.roomAccess.upsert({
     *   create: {
     *     // ... data to create a RoomAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomAccess we want to update
     *   }
     * })
     */
    upsert<T extends RoomAccessUpsertArgs>(args: Prisma.SelectSubset<T, RoomAccessUpsertArgs<ExtArgs>>): Prisma.Prisma__RoomAccessClient<runtime.Types.Result.GetResult<Prisma.$RoomAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of RoomAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAccessCountArgs} args - Arguments to filter RoomAccesses to count.
     * @example
     * // Count the number of RoomAccesses
     * const count = await prisma.roomAccess.count({
     *   where: {
     *     // ... the filter for the RoomAccesses we want to count
     *   }
     * })
    **/
    count<T extends RoomAccessCountArgs>(args?: Prisma.Subset<T, RoomAccessCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RoomAccessCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a RoomAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomAccessAggregateArgs>(args: Prisma.Subset<T, RoomAccessAggregateArgs>): Prisma.PrismaPromise<GetRoomAccessAggregateType<T>>;
    /**
     * Group by RoomAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAccessGroupByArgs} args - Group by arguments.
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
    groupBy<T extends RoomAccessGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RoomAccessGroupByArgs['orderBy'];
    } : {
        orderBy?: RoomAccessGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RoomAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RoomAccess model
     */
    readonly fields: RoomAccessFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for RoomAccess.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RoomAccessClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
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
 * Fields of the RoomAccess model
 */
export interface RoomAccessFieldRefs {
    readonly id: Prisma.FieldRef<"RoomAccess", 'String'>;
    readonly code: Prisma.FieldRef<"RoomAccess", 'String'>;
    readonly createdAt: Prisma.FieldRef<"RoomAccess", 'DateTime'>;
    readonly expiresAt: Prisma.FieldRef<"RoomAccess", 'DateTime'>;
    readonly usedAt: Prisma.FieldRef<"RoomAccess", 'DateTime'>;
    readonly usedByUserId: Prisma.FieldRef<"RoomAccess", 'String'>;
}
/**
 * RoomAccess findUnique
 */
export type RoomAccessFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAccess
     */
    select?: Prisma.RoomAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomAccess
     */
    omit?: Prisma.RoomAccessOmit<ExtArgs> | null;
    /**
     * Filter, which RoomAccess to fetch.
     */
    where: Prisma.RoomAccessWhereUniqueInput;
};
/**
 * RoomAccess findUniqueOrThrow
 */
export type RoomAccessFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAccess
     */
    select?: Prisma.RoomAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomAccess
     */
    omit?: Prisma.RoomAccessOmit<ExtArgs> | null;
    /**
     * Filter, which RoomAccess to fetch.
     */
    where: Prisma.RoomAccessWhereUniqueInput;
};
/**
 * RoomAccess findFirst
 */
export type RoomAccessFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAccess
     */
    select?: Prisma.RoomAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomAccess
     */
    omit?: Prisma.RoomAccessOmit<ExtArgs> | null;
    /**
     * Filter, which RoomAccess to fetch.
     */
    where?: Prisma.RoomAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoomAccesses to fetch.
     */
    orderBy?: Prisma.RoomAccessOrderByWithRelationInput | Prisma.RoomAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RoomAccesses.
     */
    cursor?: Prisma.RoomAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoomAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoomAccesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RoomAccesses.
     */
    distinct?: Prisma.RoomAccessScalarFieldEnum | Prisma.RoomAccessScalarFieldEnum[];
};
/**
 * RoomAccess findFirstOrThrow
 */
export type RoomAccessFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAccess
     */
    select?: Prisma.RoomAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomAccess
     */
    omit?: Prisma.RoomAccessOmit<ExtArgs> | null;
    /**
     * Filter, which RoomAccess to fetch.
     */
    where?: Prisma.RoomAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoomAccesses to fetch.
     */
    orderBy?: Prisma.RoomAccessOrderByWithRelationInput | Prisma.RoomAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RoomAccesses.
     */
    cursor?: Prisma.RoomAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoomAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoomAccesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RoomAccesses.
     */
    distinct?: Prisma.RoomAccessScalarFieldEnum | Prisma.RoomAccessScalarFieldEnum[];
};
/**
 * RoomAccess findMany
 */
export type RoomAccessFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAccess
     */
    select?: Prisma.RoomAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomAccess
     */
    omit?: Prisma.RoomAccessOmit<ExtArgs> | null;
    /**
     * Filter, which RoomAccesses to fetch.
     */
    where?: Prisma.RoomAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoomAccesses to fetch.
     */
    orderBy?: Prisma.RoomAccessOrderByWithRelationInput | Prisma.RoomAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RoomAccesses.
     */
    cursor?: Prisma.RoomAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoomAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoomAccesses.
     */
    skip?: number;
    distinct?: Prisma.RoomAccessScalarFieldEnum | Prisma.RoomAccessScalarFieldEnum[];
};
/**
 * RoomAccess create
 */
export type RoomAccessCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAccess
     */
    select?: Prisma.RoomAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomAccess
     */
    omit?: Prisma.RoomAccessOmit<ExtArgs> | null;
    /**
     * The data needed to create a RoomAccess.
     */
    data: Prisma.XOR<Prisma.RoomAccessCreateInput, Prisma.RoomAccessUncheckedCreateInput>;
};
/**
 * RoomAccess createMany
 */
export type RoomAccessCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomAccesses.
     */
    data: Prisma.RoomAccessCreateManyInput | Prisma.RoomAccessCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * RoomAccess createManyAndReturn
 */
export type RoomAccessCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAccess
     */
    select?: Prisma.RoomAccessSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomAccess
     */
    omit?: Prisma.RoomAccessOmit<ExtArgs> | null;
    /**
     * The data used to create many RoomAccesses.
     */
    data: Prisma.RoomAccessCreateManyInput | Prisma.RoomAccessCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * RoomAccess update
 */
export type RoomAccessUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAccess
     */
    select?: Prisma.RoomAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomAccess
     */
    omit?: Prisma.RoomAccessOmit<ExtArgs> | null;
    /**
     * The data needed to update a RoomAccess.
     */
    data: Prisma.XOR<Prisma.RoomAccessUpdateInput, Prisma.RoomAccessUncheckedUpdateInput>;
    /**
     * Choose, which RoomAccess to update.
     */
    where: Prisma.RoomAccessWhereUniqueInput;
};
/**
 * RoomAccess updateMany
 */
export type RoomAccessUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomAccesses.
     */
    data: Prisma.XOR<Prisma.RoomAccessUpdateManyMutationInput, Prisma.RoomAccessUncheckedUpdateManyInput>;
    /**
     * Filter which RoomAccesses to update
     */
    where?: Prisma.RoomAccessWhereInput;
    /**
     * Limit how many RoomAccesses to update.
     */
    limit?: number;
};
/**
 * RoomAccess updateManyAndReturn
 */
export type RoomAccessUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAccess
     */
    select?: Prisma.RoomAccessSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomAccess
     */
    omit?: Prisma.RoomAccessOmit<ExtArgs> | null;
    /**
     * The data used to update RoomAccesses.
     */
    data: Prisma.XOR<Prisma.RoomAccessUpdateManyMutationInput, Prisma.RoomAccessUncheckedUpdateManyInput>;
    /**
     * Filter which RoomAccesses to update
     */
    where?: Prisma.RoomAccessWhereInput;
    /**
     * Limit how many RoomAccesses to update.
     */
    limit?: number;
};
/**
 * RoomAccess upsert
 */
export type RoomAccessUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAccess
     */
    select?: Prisma.RoomAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomAccess
     */
    omit?: Prisma.RoomAccessOmit<ExtArgs> | null;
    /**
     * The filter to search for the RoomAccess to update in case it exists.
     */
    where: Prisma.RoomAccessWhereUniqueInput;
    /**
     * In case the RoomAccess found by the `where` argument doesn't exist, create a new RoomAccess with this data.
     */
    create: Prisma.XOR<Prisma.RoomAccessCreateInput, Prisma.RoomAccessUncheckedCreateInput>;
    /**
     * In case the RoomAccess was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RoomAccessUpdateInput, Prisma.RoomAccessUncheckedUpdateInput>;
};
/**
 * RoomAccess delete
 */
export type RoomAccessDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAccess
     */
    select?: Prisma.RoomAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomAccess
     */
    omit?: Prisma.RoomAccessOmit<ExtArgs> | null;
    /**
     * Filter which RoomAccess to delete.
     */
    where: Prisma.RoomAccessWhereUniqueInput;
};
/**
 * RoomAccess deleteMany
 */
export type RoomAccessDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RoomAccesses to delete
     */
    where?: Prisma.RoomAccessWhereInput;
    /**
     * Limit how many RoomAccesses to delete.
     */
    limit?: number;
};
/**
 * RoomAccess without action
 */
export type RoomAccessDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAccess
     */
    select?: Prisma.RoomAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoomAccess
     */
    omit?: Prisma.RoomAccessOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=RoomAccess.d.ts.map