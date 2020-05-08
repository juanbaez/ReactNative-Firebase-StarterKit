import React, { useState, useContext, useEffect } from 'react'
import { Text, View, TouchableOpacity, StatusBar, Image } from 'react-native'
import { mainStyles, loginStyles } from '@styles/styles'
import MyTextInput from '@components/MyTextInput'
import MyButton from '@components/MyButton'
import color from '@styles/colors'
import { UsuarioContext } from '@context/UsuarioContext'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin'

export default function LoginScreen(props) {
  const [login, loginAction] = useContext(UsuarioContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(false)

  useEffect(() => {
    GoogleSignin.configure({
      //scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '159580727217-tn5slf821tq407f9e57lipoui8f7em45.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      //hostedDomain: '', // specifies a hosted domain restriction
      //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      //accountName: '', // [Android] specifies an account name on the device that should be used
      //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    })
  }, [])


  return (
    <View style={[mainStyles.container, { padding: 50 }]}>
      <StatusBar backgroundColor={color.BLUE} translucent={true} />
      <View style={loginStyles.logo}>
        <Image
          source={require('@resources/images/logo-latitud.png')}
          style={{ height: 250, width: 250 }}
        />
      </View>
      <MyTextInput
        keyboardType="email-address"
        placeholder="E-mail"
        image="user"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <MyTextInput
        keyboardType={null}
        placeholder="Contraseña"
        image="lock"
        bolGone={true}
        secureTextEntry={hidePassword}
        onPress={() => setHidePassword(!hidePassword)}
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <MyButton titulo="Iniciar Sesion" onPress={() => iniciarSesion()} />
      <MyButton
        titulo="Registrarse"
        onPress={() => goToScreen('Registro')}
        transparent={true}
      />
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => iniciarSesionGoogle()}
      />
      <View>
        <TouchableOpacity
          onPress={() => goToScreen(props, 'RecuperarPassword')}>
          <Text
            style={[
              mainStyles.txtTransparent,
              { textDecorationLine: 'underline' },
            ]}>
            Olvide mi Contraseña
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  function iniciarSesion() {
    loginAction({
      type: 'sing',
      data: {
        email,
        password,
      },
    })
    goToScreen('Principal')
  }

  async function iniciarSesionGoogle() {
    loginAction({ type: 'google-sing' })
  }

  function goToScreen(routeName) {
    props.navigation.navigate(routeName)
  }
}
