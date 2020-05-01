import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StatusBar, Image} from 'react-native';
import {mainStyles, loginStyles} from '@styles/styles';
import MyTextInput from '@components/MyTextInput';
import color from '@styles/colors';

function goToScreen(props, routeName) {
  props.navigation.navigate(routeName);
}

export default function LoginScreen(props) {
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
      />
      <MyTextInput
        keyboardType={null}
        placeholder="Contraseña"
        image="lock"
        bolGone={true}
        secureTextEntry={hidePassword}
        onPress={() => setHidePassword(!hidePassword)}
      />
      <View style={mainStyles.btnMain}>
        <TouchableOpacity>
          <Text style={mainStyles.btntxt}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={mainStyles.btnTransparent}>
        <TouchableOpacity>
          <Text style={[mainStyles.btntxt, {color: color.BLUE}]}>
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>
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
}
