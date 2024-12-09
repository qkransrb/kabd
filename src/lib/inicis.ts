import crypto from "crypto";
import { v4 as uuid } from "uuid";
import { getProductTitleBySeq } from "./utils";

export const generateInicisPcForm = (
  id: string,
  name: string,
  phone: string,
  email: string,
  type: string,
  amount: string,
  isConference: boolean,
  optionalData?: string
) => {
  const now = new Date().getTime();
  const orderId = `${uuid()
    .split("-")
    .map((i) => i.charAt(0))
    .join("")}${now}`;

  const form = document.createElement("form");
  form.setAttribute("id", id);
  form.setAttribute("method", "POST");

  const version = document.createElement("input");
  version.setAttribute("type", "hidden");
  version.setAttribute("name", "version");
  version.setAttribute("value", "1.0");

  const gopaymethod = document.createElement("input");
  gopaymethod.setAttribute("type", "hidden");
  gopaymethod.setAttribute("name", "gopaymethod");
  gopaymethod.setAttribute("value", "Card");

  const mid = document.createElement("input");
  mid.setAttribute("type", "text");
  mid.setAttribute("name", "mid");
  mid.setAttribute("value", process.env.NEXT_PUBLIC_INI_MID as string);

  const oid = document.createElement("input");
  oid.setAttribute("type", "text");
  oid.setAttribute("name", "oid");
  oid.setAttribute("value", orderId);

  const price = document.createElement("input");
  price.setAttribute("type", "text");
  price.setAttribute("name", "price");
  price.setAttribute("value", amount);

  const timestamp = document.createElement("input");
  timestamp.setAttribute("type", "text");
  timestamp.setAttribute("name", "timestamp");
  timestamp.setAttribute("value", now.toString());

  const use_chkfake = document.createElement("input");
  use_chkfake.setAttribute("type", "hidden");
  use_chkfake.setAttribute("name", "use_chkfake");
  use_chkfake.setAttribute("value", "Y");

  const signature = document.createElement("input");
  signature.setAttribute("type", "hidden");
  signature.setAttribute("name", "signature");
  signature.setAttribute(
    "value",
    crypto
      .createHash("sha256")
      .update(`oid=${orderId}&price=${amount}&timestamp=${now}`)
      .digest("hex")
  );

  const verification = document.createElement("input");
  verification.setAttribute("type", "hidden");
  verification.setAttribute("name", "verification");
  verification.setAttribute(
    "value",
    crypto
      .createHash("sha256")
      .update(
        `oid=${orderId}&price=${amount}&signKey=${
          process.env.NEXT_PUBLIC_INI_SIGNKEY as string
        }&timestamp=${now}`
      )
      .digest("hex")
  );

  const mKey = document.createElement("input");
  mKey.setAttribute("type", "hidden");
  mKey.setAttribute("name", "mKey");
  mKey.setAttribute(
    "value",
    crypto
      .createHash("sha256")
      .update(process.env.NEXT_PUBLIC_INI_SIGNKEY as string)
      .digest("hex")
  );

  const currency = document.createElement("input");
  currency.setAttribute("type", "hidden");
  currency.setAttribute("name", "currency");
  currency.setAttribute("value", "WON");

  const goodname = document.createElement("input");
  goodname.setAttribute("type", "text");
  goodname.setAttribute("name", "goodname");
  if (isConference) {
    goodname.setAttribute("value", type);
  } else {
    goodname.setAttribute("value", getProductTitleBySeq(type));
  }

  const buyername = document.createElement("input");
  buyername.setAttribute("type", "text");
  buyername.setAttribute("name", "buyername");
  buyername.setAttribute("value", name);

  const buyertel = document.createElement("input");
  buyertel.setAttribute("type", "text");
  buyertel.setAttribute("name", "buyertel");
  buyertel.setAttribute("value", phone);

  const buyeremail = document.createElement("input");
  buyeremail.setAttribute("type", "text");
  buyeremail.setAttribute("name", "buyeremail");
  buyeremail.setAttribute("value", email);

  const returnUrl = document.createElement("input");
  returnUrl.setAttribute("type", "hidden");
  returnUrl.setAttribute("name", "returnUrl");
  returnUrl.setAttribute(
    "value",
    `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/inicis/pc`
  );

  const closeUrl = document.createElement("input");
  closeUrl.setAttribute("type", "hidden");
  closeUrl.setAttribute("name", "closeUrl");
  closeUrl.setAttribute(
    "value",
    `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/inicis/pc/close`
  );

  const acceptmethod = document.createElement("input");
  acceptmethod.setAttribute("type", "text");
  acceptmethod.setAttribute("name", "acceptmethod");
  acceptmethod.setAttribute("value", "HPP(1):va_receipt:below1000:centerCd(Y)");

  form.appendChild(version);
  form.appendChild(gopaymethod);
  form.appendChild(mid);
  form.appendChild(oid);
  form.appendChild(price);
  form.appendChild(timestamp);
  form.appendChild(use_chkfake);
  form.appendChild(signature);
  form.appendChild(verification);
  form.appendChild(mKey);
  form.appendChild(currency);
  form.appendChild(goodname);
  form.appendChild(buyername);
  form.appendChild(buyertel);
  form.appendChild(buyeremail);
  form.appendChild(returnUrl);
  form.appendChild(closeUrl);
  form.appendChild(acceptmethod);

  if (optionalData) {
    const merchantData = document.createElement("input");
    merchantData.setAttribute("type", "text");
    merchantData.setAttribute("name", "merchantData");
    merchantData.setAttribute("value", optionalData);

    form.appendChild(merchantData);
  }

  return form;
};

export const generateInicisMobileForm = (
  id: string,
  name: string,
  phone: string,
  email: string,
  type: string,
  amount: string,
  isConference: boolean,
  optionalData?: string
) => {
  const now = new Date().getTime();
  const orderId = `${uuid()
    .split("-")
    .map((i) => i.charAt(0))
    .join("")}${now}`;

  const form = document.createElement("form");
  form.setAttribute("id", id);
  form.setAttribute("method", "POST");
  form.setAttribute("accept-charset", "euc-kr");
  form.setAttribute("action", "https://mobile.inicis.com/smart/payment/");
  form.setAttribute("target", "_self");

  const payment = document.createElement("input");
  payment.setAttribute("type", "text");
  payment.setAttribute("name", "P_INI_PAYMENT");
  payment.setAttribute("value", "CARD");

  const mid = document.createElement("input");
  mid.setAttribute("type", "text");
  mid.setAttribute("name", "P_MID");
  mid.setAttribute("value", process.env.NEXT_PUBLIC_INI_MID as string);

  const oid = document.createElement("input");
  oid.setAttribute("type", "text");
  oid.setAttribute("name", "P_OID");
  oid.setAttribute("value", orderId);

  const amt = document.createElement("input");
  amt.setAttribute("type", "text");
  amt.setAttribute("name", "P_AMT");
  amt.setAttribute("value", amount);

  const goods = document.createElement("input");
  goods.setAttribute("type", "text");
  goods.setAttribute("name", "P_GOODS");
  if (isConference) {
    goods.setAttribute("value", type);
  } else {
    goods.setAttribute("value", getProductTitleBySeq(type));
  }

  const uname = document.createElement("input");
  uname.setAttribute("type", "text");
  uname.setAttribute("name", "P_UNAME");
  uname.setAttribute("value", name);

  const mobile = document.createElement("input");
  mobile.setAttribute("type", "text");
  mobile.setAttribute("name", "P_MOBILE");
  mobile.setAttribute("value", phone);

  const mail = document.createElement("input");
  mail.setAttribute("type", "text");
  mail.setAttribute("name", "P_EMAIL");
  mail.setAttribute("value", email);

  const nextUrl = document.createElement("input");
  nextUrl.setAttribute("type", "hidden");
  nextUrl.setAttribute("name", "P_NEXT_URL");
  nextUrl.setAttribute(
    "value",
    `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/inicis/mobile`
  );

  const charset = document.createElement("input");
  charset.setAttribute("type", "hidden");
  charset.setAttribute("name", "P_CHARSET");
  charset.setAttribute("value", "utf8");

  const reserved = document.createElement("input");
  reserved.setAttribute("type", "hidden");
  reserved.setAttribute("name", "P_RESERVED");
  reserved.setAttribute("value", "below1000=Y&vbank_receipt=Y&centerCd=Y");

  const noti = document.createElement("input");
  noti.setAttribute("type", "hidden");
  noti.setAttribute("name", "P_NOTI");
  if (isConference) {
    noti.setAttribute(
      "value",
      JSON.stringify({
        phone,
        goodsName: type,
        conferenceId: optionalData,
      })
    );
  } else {
    noti.setAttribute(
      "value",
      JSON.stringify({
        phone,
        goodsName: getProductTitleBySeq(type),
        conferenceId: "EMPTY",
      })
    );
  }

  form.appendChild(payment);
  form.appendChild(mid);
  form.appendChild(oid);
  form.appendChild(amt);
  form.appendChild(goods);
  form.appendChild(uname);
  form.appendChild(mobile);
  form.appendChild(mail);
  form.appendChild(nextUrl);
  form.appendChild(charset);
  form.appendChild(reserved);
  form.appendChild(noti);

  return form;
};

export const pcGetAuthUrl = (idc_name: string): string => {
  const url = "stdpay.inicis.com/api/payAuth";
  let authUrl;
  switch (idc_name) {
    case "fc":
      authUrl = "https://fc" + url;
      break;
    case "ks":
      authUrl = "https://ks" + url;
      break;
    case "stg":
      authUrl = "https://stg" + url;
      break;
    default:
      throw new Error("invalid idc_name");
  }
  return authUrl;
};

export const pcGetNetCancel = (idc_name: string): string => {
  const url = "stdpay.inicis.com/api/netCancel";
  let netCancel;
  switch (idc_name) {
    case "fc":
      netCancel = "https://fc" + url;
      break;
    case "ks":
      netCancel = "https://ks" + url;
      break;
    case "stg":
      netCancel = "https://stg" + url;
      break;
    default:
      throw new Error("invalid idc_name");
  }
  return netCancel;
};

export const mobileGetAuthUrl = (idc_name: string): string => {
  const url = "mobile.inicis.com/smart/payReq.ini";
  let authUrl;
  switch (idc_name) {
    case "fc":
      authUrl = "https://fc" + url;
      break;
    case "ks":
      authUrl = "https://ks" + url;
      break;
    case "stg":
      authUrl = "https://stg" + url;
      break;
    default:
      throw new Error("invalid idc_name");
  }
  return authUrl;
};
