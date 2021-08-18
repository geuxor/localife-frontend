export function delete_cookie() {
  document.cookie = process.env.REACT_APP_KUK + '=; Max-Age=-99999999;'
}
export function get_cookie() {
  return document.cookie.split(';').some(c => {
    return c.trim().startsWith(process.env.REACT_APP_KUK + '=');
  });
}
