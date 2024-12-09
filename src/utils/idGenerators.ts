/**
 * Tạo ID ngẫu nhiên với prefix và độ dài số chỉ định

 */
const generateIdWithPrefix = (prefix: string, numberLength: number = 6): string => {
  const randomNum = Math.floor(Math.random() * Math.pow(10, numberLength));
  return `${prefix}${randomNum.toString().padStart(numberLength, '0')}`;
};



/**
 * Tạo ID nhân viên (EMP + 6 số)
 * VD: EMP001234
 */
export const generateEmployeeId = (): string => {
  return generateIdWithPrefix('EMP', 6);
};

/**
 * Tạo ID khách hàng (CUS + 6 số)
 * VD: CUS001234
 */
export const generateCustomerId = (): string => {
  return generateIdWithPrefix('CUS', 6);
};

/**
 * Tạo ID người nhận (RCV + 6 số)
 * VD: RCV001234
 */
export const generateReceiverId = (): string => {
  return generateIdWithPrefix('RCV', 6);
};

/**
 * Tạo ID công ty (COM + 6 số)
 * VD: COM001234
 */
export const generateCompanyId = (): string => {
  return generateIdWithPrefix('COM', 6);
};

/**
 * Tạo ID thanh toán (PAY + 8 số)
 * VD: PAY12345678
 */
export const generatePaymentId = (): string => {
  return generateIdWithPrefix('PAY', 8);
};

/**
 * Tạo ID giao hàng (DEL + 8 số)
 * VD: DEL12345678
 */
export const generateDeliveryId = (): string => {
  return generateIdWithPrefix('DEL', 8);
};

/**
 * Tạo ID lấy hàng (PCK + 8 số)
 * VD: PCK12345678
 */
export const generatePickupId = (): string => {
  return generateIdWithPrefix('PCK', 8);
};

/**
 * Tạo ID vận chuyển (SHP + 8 số)
 * VD: SHP12345678
 */
export const generateShipmentId = (): string => {
  return generateIdWithPrefix('SHP', 8);
};

/**
 * Tạo ID manifest (MNF + 8 số)
 * VD: MNF12345678
 */
export const generateManifestId = (): string => {
  return generateIdWithPrefix('MNF', 8);
};

/**
 * Tạo ID người dùng hệ thống (USR + 6 số)
 * VD: USR001234
 */
export const generateUserId = (): string => {
  return generateIdWithPrefix('USR', 6);
};

/**
 * Kiểm tra xem một ID có hợp lệ theo định dạng không

 */

/**
 * Tạo ID bill bay Hàn Việt (VHMA + 6 số)
 * VD: VHMA001234
 */
export const generateKoreaToVietnamAirBillId = (): string => {
  return generateIdWithPrefix('VHMA', 6);
};

/**
 * Tạo ID bill bay Việt Hàn (VHMV + 6 số)
 * VD: VHMV001234
 */
export const generateVietnamToKoreaAirBillId = (): string => {
  return generateIdWithPrefix('VHMV', 6);
};

/**
 * Tạo ID bill biển Hàn Việt (VHMS + 6 số)
 * VD: VHMS001234
 */
export const generateKoreaToVietnamSeaBillId = (): string => {
  return generateIdWithPrefix('VHMS', 6);
};

/**
 * Tạo ID khách vận chuyển Hàn Việt (VHMVC + 6 số)
 * VD: VHMVC001234
 */
export const generateKoreaToVietnamCustomerId = (): string => {
  return generateIdWithPrefix('VHMVC', 6);
};

/**
 * Tạo ID khách vận chuyển Việt Hàn (VHMVCV + 6 số)
 * VD: VHMVCV001234
 */
export const generateVietnamToKoreaCustomerId = (): string => {
  return generateIdWithPrefix('VHMVCV', 6);
};

/**
 * Tạo ID khách vận chuyển biển (VHMVCS + 6 số)
 * VD: VHMVCS001234
 */
export const generateSeaTransportCustomerId = (): string => {
  return generateIdWithPrefix('VHMVCS', 6);
};
