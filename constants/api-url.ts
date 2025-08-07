export const ApiUrl = {
  LOGIN: '/auth/email/login',
  ADMIN_LOGIN: '/auth/email/login',
  REGISTER: '/auth/email/register',
  FORGOT_PASSWORD: '/auth/forgot/password',
  RESET_PASSWORD: '/auth/reset/password',

  GET_CUSTOMERS: '/users',
  DELETE_CUSTOMER: '/users/{}',
  GET_PROFILE: '/auth/me',
  UPDATE_PROFILE: '/users/me',

  GET_ADMINS: '/users',
  CREATE_ADMIN: '/users/admin',
  DELETE_ADMIN: '/users/{}',

  GET_PRODUCTS: '/products',
  RANDOM_PRODUCTS: '/products/random',
  PRODUCT_DETAIL: '/products/{}',
  CREATE_PRODUCT: '/products',
  UPDATE_PRODUCT: '/products/{}',
  DELETE_PRODUCT: '/products/{}',
  GET_PRODUCT_BY_IDS: '/products/ids',

  UPLOAD_IMAGE: '/upload-images',

  CURRENCIES: '/currencies',
  CURRENCY_METADATA: '/currencies/metadata',
  CURRENCY_DETAIL: '/currencies/{}',
  CREATE_CURRENCY: '/currencies',
  UPDATE_CURRENCY: '/currencies/{}',
  DELETE_CURRENCY: '/currencies/{}',

  ORDERS: '/orders',
  HISTORY_ORDERS: '/orders/me',
  ORDER_DETAIL: '/orders/{}',
  CREATE_ORDER: '/orders',
  UPDATE_ORDER: '/orders/{}',
  DELETE_ORDER: '/orders/{}',
  UPDATE_ORDER_STATUS: '/orders/{}/status',

  CHARITIES: '/charities',
  CHARITY_DETAIL: '/charities/{}',
  CREATE_CHARITY: '/charities',
  UPDATE_CHARITY: '/charities/{}',
  DELETE_CHARITY: '/charities/{}',

  CONFIG_SYSTEM: '/config-systems',
  UPDATE_CONFIG_SYSTEM: '/config-systems',
  CHARITY_PERCENT: '/config-systems/charity-percent',

  PAYMENTS: '/payments',
  PAYMENT_ACCEPT: '/payments/{}/accept',
  PAYMENT_CANCEL: '/payments/{}/cancel',

  CHARITY_PAYMENTS: '/charity-payments',
  CHARITY_PAYMENT_SEND_DATE: '/charity-payments/send-date',

  INVOICES: '/invoices',
  INVOICE_DETAIL: '/invoices/{}',

  GET_STATISTICS: '/reports/statistics',
};
