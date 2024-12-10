export const REGION = {
    SGN: 'SGN',  // Sài Gòn
    HN: 'HAN',    // Hà Nội
    // ... các region khác
} as const;

export type RegionType = typeof REGION[keyof typeof REGION]; 
