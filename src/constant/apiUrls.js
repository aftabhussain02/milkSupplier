export const baseUrl = 'http://192.168.43.62:8000/';

export const prefix = 'api/';

export const fullUrl = baseUrl + prefix;

export const loginApi = `${fullUrl}login`;

export const customerApi = `${fullUrl}customer`;
export const vendorApi = `${fullUrl}vendor`;
export const productApi = `${fullUrl}product`;
export const productTypeApi = `${fullUrl}product_type`;
export const addProductEntryApi = `${fullUrl}customer_product_entry`;
export const addVendorProductEntryApi = `${fullUrl}vendor_product_entry`;
export const debitApi = `${fullUrl}debit`;
export const creditApi = `${fullUrl}credit`;
