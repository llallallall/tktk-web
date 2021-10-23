import QueryParams from "../params/query.params";


export class ColumnHeader {

    static readonly Sort = {
        none: 'none',
        desc: 'order_desc',
        asce: 'order_asce',
    }

    constructor(
        public code: string,
        public name: string = null,
        public sort: string = null,
    ) {
    }

    get isNone(): boolean {
        return this.sort === ColumnHeader.Sort.none;
    }

    get icon(): string {
        if (!this.sort) {
            return;
        }
        switch (this.sort) {
            case ColumnHeader.Sort.desc: return '/assets/svg/sort-down.svg';
            case ColumnHeader.Sort.asce: return '/assets/svg/sort-up.svg';
            case ColumnHeader.Sort.none: return '/assets/svg/swap-vertical.svg';
        }
    }

    static find(columns: ColumnHeader[], code: string): ColumnHeader {
        for (const c of columns) {
            if (c.code === code) {
                return c;
            }
        }
    }

    get toggle(): string {
        switch (this.sort) {
            case ColumnHeader.Sort.desc: return ColumnHeader.Sort.asce;
        }
        return ColumnHeader.Sort.desc;
    }

    static updateOrders(items: ColumnHeader[], qp: QueryParams) {
        for (const item of items) {
            item.sort = ColumnHeader.Sort.none;
        }
        if (qp.order_asce) {
            const item = ColumnHeader.find(items, qp.order_asce);
            if (item) {
                item.sort = ColumnHeader.Sort.asce;
            }
        }
        if (qp.order_desc) {
            const item = ColumnHeader.find(items, qp.order_desc);
            if (item) {
                item.sort = ColumnHeader.Sort.desc;
            }
        }
    }

}
