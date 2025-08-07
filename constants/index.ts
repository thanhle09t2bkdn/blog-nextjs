export const GenderOptions = ['Male', 'Female', 'Other'];

export const StatusIcon = {
  scheduled: '/assets/icons/check.svg',
  pending: '/assets/icons/pending.svg',
  cancelled: '/assets/icons/cancelled.svg',
};

export enum OrderStatus {
  New = 'new',
  Received = 'received',
  Packed = 'packed',
  Sent = 'sent',
  Paid = 'paid',
  Canceled = 'canceled',
}

export enum PaymentStatus {
  Pending = 'pending',
  Paid = 'paid',
  Canceled = 'canceled',
}
