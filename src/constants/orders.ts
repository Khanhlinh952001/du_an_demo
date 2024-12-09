export const ORDER_STATUS = {
    PENDING: "Pending",
    IN_PROGRESS: "InProgress",
    DELIVERY: "Delivered",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
} as const;

export const ORDER_TYPE = {
    EXPORT: 'export',
    IMPORT: 'import'
} as const;

export const ITEM_TYPES = {
    FRAGILE: "Fragile",
    FOOD: "Food",
    ELECTRONICS: "Electronics",
    DOCUMENTS: "Documents",
    OTHER: "Other",
} as const;

export const SHIPPING_METHOD = {
    AIR: 'air',
    SEA: 'sea'
} as const;

export type OrderStatusType = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
export type OrderType = typeof ORDER_TYPE[keyof typeof ORDER_TYPE];
export type ItemType = typeof ITEM_TYPES[keyof typeof ITEM_TYPES]; 
