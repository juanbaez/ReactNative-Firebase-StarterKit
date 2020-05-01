import React, {useContext, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import {mainStyles} from '@styles/styles';
import color from '@styles/colors';
import {UsuarioContext} from '@context/UsuarioContext';
import MyButton from '../components/MyButton';

function useBackButton(handler) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      console.log('hardwareBackPress Close');
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function PrincipalScreen(props) {
  useBackButton(desconectarse);
  const [login, loginAction] = useContext(UsuarioContext);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <StatusBar
        backgroundColor={color.BLUE}
        barStyle="dark-content"
        translucent={true}
      />
      <Text
        style={{
          textAlign: 'center',
          marginTop: 200,
          fontFamily: 'Poppins-Bold',
        }}>
        Bienvenido{'\n' + login.usuario.email}
      </Text>
      <MyButton titulo="Cerrar Sesion" onPress={() => desconectarse()} />
    </View>
  );

  function goToScreen(routeName) {
    props.navigation.navigate(routeName);
  }

  function desconectarse() {
    Alert.alert('Salir', 'Estas seguro que \ndesea cerrar sesion?', [
      {
        text: 'Si',
        onPress: () => {
          loginAction({
            type: 'sing-out',
            data: {},
          });
          goToScreen('Login');
        },
      },
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  }
}
