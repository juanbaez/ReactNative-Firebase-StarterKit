import React, { createContext, useReducer, useEffect } from 'react'
import { saveUsuario, deleteUsuario } from '@storage/UsuarioAsyncStorage'
import Snackbar from 'react-native-snackbar'

const initialState = {
  usuario: {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  },
  activo: false,
}


const usuarioReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case 'sing-in':
      console.log('bienvenidos al sistema')
      return { ...state, usuario: payload.data, activo: true }
    case 'sing':
      saveUsuario(payload.data).then((msg) => {
        console.log('usuario guardado')
      })
      Snackbar.show({
        titulo: 'inicio de sesion exitosa',
        duration: Snackbar.LENGTH_LONG,
      })
      return { ...state, usuario: payload.data, activo: true }
    // case 'google-sing':
    //   async function signIn() {
    //     try {
    //       await GoogleSignin.hasPlayServices()
    //       const userInfo = await GoogleSignin.signIn()
    //       console.log(userInfo)
    //       return userInfo
    //     } catch (error) {
    //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         // user cancelled the login flow
    //       } else if (error.code === statusCodes.IN_PROGRESS) {
    //         // operation (e.g. sign in) is in progress already
    //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         // play services not available or outdated
    //       } else {
    //         // some other error happened
    //       }
    //     }
    //   }
    //   signIn()

    case 'sing-out':
      deleteUsuario().then((msg) => {
        console.log(msg)
      })
      Snackbar.show({
        titulo: 'sesion expirada',
        duration: Snackbar.LENGTH_LONG,
      })
      return { ...state, usuario: payload.data, activo: false }
    default:
      return state
  }
}

const UsuarioContext = createContext(initialState)

function UsuarioProvider(props) {
  const [login, loginAction] = useReducer(usuarioReducer, initialState)
  return (
    <UsuarioContext.Provider value={[login, loginAction]}>
      {props.children}
    </UsuarioContext.Provider>
  )
}

export { UsuarioContext, UsuarioProvider }
