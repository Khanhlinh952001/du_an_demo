export interface ManifestItem {
    key: string;
    hawbNo: string;
    pcs: number;
    weight: number;
    currency: string;
    value: number;
    description: string;
    shipper: string;
    shipperAddress: string;
    shipperNationality: string;
    shipperPlace: string;
    shipperStreet: string;
    shipperZipCode: string;
    consignee: string;
    consigneeAddress: string;
    name: string;
    licenseSeq?: string;
    licenseNumber?: string;
    licensePcs?: number;
    licenseWeight?: number;
    status?: string;
    packageType: string;
    dangerousGoods?: boolean;
    customsValue: number;
    hsCode?: string;
    originCountry: string;
    documents?: string[];
}
 