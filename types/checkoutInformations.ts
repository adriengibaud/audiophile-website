export interface CheckoutInformationsType {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: 'emoney' | 'cash';
  eMoneyNumber: string;
  eMoneyPin: string;
}
