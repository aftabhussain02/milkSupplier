// export const baseUrl = 'http://voiceofdon.com/';
export const baseUrl = 'http://192.168.43.62:8000/';

export const prefix = 'api/';

export const fullUrl = baseUrl + prefix;

export const loginApi = `${fullUrl}login`;

export const customerApi = `${fullUrl}customer`;
export const filterClientProductApi = `${fullUrl}customer_entry_filter`;
export const filterVendorProductApi = `${fullUrl}vendor_entry_filter`;
export const vendorApi = `${fullUrl}vendor`;
export const productApi = `${fullUrl}product`;
export const productTypeApi = `${fullUrl}product_type`;
export const productEntryApi = `${fullUrl}customer_product_entry`;
export const vendorProductEntryApi = `${fullUrl}vendor_product_entry`;
export const debitApi = `${fullUrl}debit`;
export const creditApi = `${fullUrl}credit`;
export const changePasswordApi = `${fullUrl}change_password`;
export const noteApi = `${fullUrl}note`;
