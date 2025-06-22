export function parseJwt(token: string): any {
  try {
    const base64 = token.split(".")[1];
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch (e) {
    return null;
  }
}
