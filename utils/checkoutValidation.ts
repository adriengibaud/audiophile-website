import { CheckoutInformationsType } from '@/types/checkoutInformations';
import { useState } from 'react';

const checkoutValidation = (infos: CheckoutInformationsType) => {
  let check = {
    name: null,
    email: null,
    phone: null,
    address: null,
    zipCode: null,
    city: null,
    country: null,
    eMoneyNumber: null,
    eMoneyPin: null,
  };
  const mailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const nameFormat = /([a-zA-Z]+\s?\b){2,}/g;

  const phoneFormat = /^\d{10}$/;

  const cardFormat = /^(?:3[47][0-9]{13})$/;

  const pinCodeFormat = /^(\d{4}|\d{6})$/;

  if (!infos.email.match(mailFormat))
    check = { ...check, email: 'wrong format' };

  if (!infos.name.match(nameFormat)) check = { ...check, name: 'wrong format' };

  if (!infos.name.match(nameFormat)) check = { ...check, name: 'wrong format' };

  if (!infos.phone.match(phoneFormat))
    check = { ...check, phone: 'wrong format' };

  if (infos.address.length < 6) check = { ...check, address: 'wrong format' };

  if (infos.zipCode.length < 4 && infos.zipCode.length >= 6)
    check = { ...check, zipCode: 'wrong format' };

  if (infos.city.length < 3) check = { ...check, city: 'wrong format' };

  if (infos.country.length < 3) check = { ...check, country: 'wrong format' };

  if (infos.paymentMethod === 'emoney') {
    if (!infos.eMoneyNumber.match(cardFormat)) {
      if (infos.eMoneyNumber.length < 3) {
        check = { ...check, eMoneyNumber: 'missing information' };
      } else {
        check = { ...check, eMoneyNumber: 'wrong format' };
      }
    }
  }

  if (infos.paymentMethod === 'emoney') {
    if (!infos.eMoneyPin.match(pinCodeFormat)) {
      if (infos.eMoneyPin.length < 3) {
        check = { ...check, eMoneyPin: 'missing information' };
      } else {
        check = { ...check, eMoneyPin: 'wrong format' };
      }
    }
  }
  return check;
};

export default checkoutValidation;
