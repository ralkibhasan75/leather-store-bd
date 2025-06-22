// src/global.d.ts
export {};

declare global {
  interface Window {
    firebase: any;
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}
