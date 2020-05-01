import React, {useState, useContext} from 'react';
import {Text, View, TouchableOpacity, StatusBar, Image} from 'react-native';
import {mainStyles, loginStyles} from '@styles/styles';
import MyTextInput from '@components/MyTextInput';
import MyButton from '@components/MyButton';
import color from '@styles/colors';
import {UsuarioContext} from '@context/UsuarioContext';

export default function LoginScreen(props) {
  const [login, loginAction] = useContext(UsuarioContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(false);

  return (
    <View style={[mainStyles.container, {padding: 50}]}>
      <StatusBar backgroundColor={color.BLUE} translucent={true} />
      <View style={loginStyles.logo}>
        <Image
          source={require('@resources/images/logo-latitud.png')}
          style={{height: 250, width: 250}}
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
      <View>
        <TouchableOpacity
          onPress={() => goToScreen(props, 'RecuperarPassword')}>
          <Text
            style={[
              mainStyles.txtTransparent,
              {textDecorationLine: 'underline'},
            ]}>
            Olvide mi Contraseña
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function iniciarSesion() {
    loginAction({
      type: 'sing',
      data: {
        email,
        password,
      },
    });
    goToScreen('Principal');
  }

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }
}
