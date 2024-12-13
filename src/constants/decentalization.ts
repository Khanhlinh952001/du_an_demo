import { ROLES } from "@/constants/roles";

export const MANAGER_PERMISSION = [
    {
        role: ROLES.MANAGER,
        permission: [
            'viewAdminPage',
            'managePickup',
            'manageAirOrders',
            'manageSeaOrders', 
            'manageThecbe',
            'lookup',
            'createOrders',
            'createManifest',
            'debt',
            'receiveStatistics',
            'viewSender',
            'viewReceiver'
        ]
    }
]   

export const WAREHOUSE_VN_PERMISSION = [
    {
        role: ROLES.WAREHOUSE_VN,
        permission: [
            'managePickup',
            'lookup',
            'createOrders',
            'viewSender',
            'viewReceiver'
        ]
    }
] 

export const WAREHOUSE_KR_PERMISSION = [
    {
        role: ROLES.WAREHOUSE_KR,
        permission: [
            'managePickup',
            'lookup', 
            'createOrders',
            'viewSender',
            'viewReceiver'
        ]
    }
] 

export const EMPLOYEE_PERMISSION = [
    {
        role: ROLES.EMPLOYEE,
        permission: [
            'lookup',
            'createOrders',
            'viewSender',
            'viewReceiver'
        ]
    }
] 

export const ADMIN_PERMISSION = [
    {
        role: ROLES.ADMIN,
        permission: [
            'viewAdminPage',
            'managePickup',
            'manageAirOrders',
            'manageSeaOrders',
            'manageThecbe', 
            'lookup',
            'createOrders',
            'createManifest',
            'debt',
            'receiveStatistics',
            'viewSender',
            'viewReceiver'
        ]
    }
] 

export const ACCOUNTANT_PERMISSION = [
    {
        role: ROLES.ACCOUNTANT,
        permission: [
            'lookup',
            'debt',
            'receiveStatistics',
            'viewSender',
            'viewReceiver'
        ]
    }
] 


export type PermissionType = 
    | 'viewAdminPage'
    | 'managePickup'
    | 'manageAirOrders'
    | 'manageSeaOrders'
    | 'manageThecbe'
    | 'lookup'
    | 'createOrders'
    | 'createManifest'
    | 'debt'
    | 'receiveStatistics'
    | 'viewSender'
    | 'viewReceiver';


