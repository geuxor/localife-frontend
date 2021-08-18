export function delete_cookie() {
  document.cookie = process.env.REACT_APP_KUK + '=; Max-Age=-99999999;'
}
