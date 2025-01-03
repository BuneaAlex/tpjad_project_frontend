export function saveTokenToLocalStorage(token: string) {
  localStorage.setItem('token', token);  
}

export function saveUsernameToLocalStorage(username: string) {
  localStorage.setItem('username', username);  
}

export function getUsernameFromLocalStorage() {
  const username = localStorage.getItem('username');  
  return username;
}

export function getTokenFromLocalStorage() {
  const token = localStorage.getItem('token');  
  return token;
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem('token'); 
}
