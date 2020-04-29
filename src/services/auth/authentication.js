import {AnonymousAuthProvider} from 'mongodb-stitch-react-native-sdk';
import {app} from './app';

export function loginAnonymous() {
  //permite login anonima
  const credential = new AnonymousAuthProvider();
  return app.auth.loginWithCredential(credential);
}

export function hasLoggedInUser() {
  //Verifica si existe algun usuario loggeado
  return app.auth.isLoggedIn;
}

export function getCurrentUser() {
  //retorna el objeto del usuario que actualmente esta logeado
  return app.auth.isLoggedIn ? app.auth.user : null;
}

export function logoutCurrentUser() {
  //Des-logea al actual usuario
  const user = getCurrentUser();
  return app.auth.logoutUserWithId(user.id);
}
