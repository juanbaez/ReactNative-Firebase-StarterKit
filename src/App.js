import React from 'react';
import AppNavigation from '@navigation/AppNavigation';

function App() {
  return <AppNavigation />;
}

export default App;

// import React from 'react';
// import {Button, StyleSheet, Text, View} from 'react-native';
// import {Stitch, AnonymousCredential} from 'mongodb-stitch-react-native-sdk';
// import Home from './components/Home';
// import Login from './components/Login';

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentUserId: undefined,
//       client: undefined,
//     };
//     this._loadClient = this._loadClient.bind(this);
//     this._onPressLogin = this._onPressLogin.bind(this);
//     this._onPressLogout = this._onPressLogout.bind(this);
//   }

//   componentDidMount() {
//     this._loadClient();
//   }

//   render() {
//     let loginStatus = 'Currently logged out.';

//     if (this.state.currentUserId) {
//       loginStatus = `Currently logged in as ${this.state.currentUserId}!`;
//     }

//     loginButton = <Button onPress={this._onPressLogin} title="Login" />;

//     logoutButton = <Button onPress={this._onPressLogout} title="Logout" />;

//     return (
//       <View style={styles.container}>
//         <Text> {loginStatus} </Text>
//         {this.state.currentUserId !== undefined ? <Home /> : <Login />}
//       </View>
//     );

//     // console.log(loginStatus);
//     // return (
//     //   <View style={styles.container}>
//     //     <Text> {loginStatus} </Text>
//     //     {this.state.currentUserId !== undefined ? <Login /> : <Home />}
//     //   </View>
//     // );
//   }

//   _loadClient() {
//     Stitch.initializeDefaultAppClient('deliveryapp-pmoql').then(client => {
//       this.setState({client});

//       if (client.auth.isLoggedIn) {
//         this.setState({currentUserId: client.auth.user.id});
//       }
//     });
//   }

//   _onPressLogin() {
//     this.state.client.auth
//       .loginWithCredential(new AnonymousCredential())
//       .then(user => {
//         console.log(`Successfully logged in as user ${user.id}`);
//         this.setState({currentUserId: user.id});
//       })
//       .catch(err => {
//         console.log(`Failed to log in anonymously: ${err}`);
//         this.setState({currentUserId: undefined});
//       });
//   }

//   _onPressLogout() {
//     this.state.client.auth
//       .logout()
//       .then(user => {
//         console.log('Successfully logged out');
//         this.setState({currentUserId: undefined});
//       })
//       .catch(err => {
//         console.log(`Failed to log out: ${err}`);
//         this.setState({currentUserId: undefined});
//       });
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
// // import React from 'react';
// // import {
// //   SafeAreaView,
// //   StyleSheet,
// //   ScrollView,
// //   View,
// //   Text,
// //   StatusBar,
// // } from 'react-native';

// // import {
// //   Header,
// //   LearnMoreLinks,
// //   Colors,
// //   DebugInstructions,
// //   ReloadInstructions,
// // } from 'react-native/Libraries/NewAppScreen';
// // import {Button} from 'react-native';
// // import {StitchAuthProvider, useStitchAuth} from './provider/auth';
// // import Login from './components/Login';
// // import HomeApp from './components/Home';

// // export default function App() {
// //   return (
// //     <StitchAuthProvider>
// //       <AppUI />
// //     </StitchAuthProvider>
// //   );
// // }

// // AppUI.propTypes = {};
// // function AppUI() {
// //   return (
// //     <>
// //       <StatusBar barStyle="dark-content" />
// //       <SafeAreaView>
// //         <ScrollView
// //           contentInsetAdjustmentBehavior="automatic"
// //           style={styles.scrollView}>
// //           <Header />
// //           {global.HermesInternal == null ? null : (
// //             <View style={styles.engine}>
// //               <Text style={styles.footer}>Engine: Hermes</Text>
// //             </View>
// //           )}
// //           <View style={styles.body}>
// //             <View style={styles.sectionContainer}>
// //               <Text style={styles.sectionTitle}>Step One</Text>
// //               <Text style={styles.sectionDescription}>
// //                 Edit <Text style={styles.highlight}>Login.js</Text> Editado see
// //                 your edits.
// //               </Text>
// //             </View>
// //             <View style={styles.sectionContainer}>
// //               <Text style={styles.sectionTitle}>See Your Changes</Text>
// //               <Text style={styles.sectionDescription}>
// //                 <ReloadInstructions />
// //               </Text>
// //             </View>
// //             <View style={styles.sectionContainer}>
// //               <Text style={styles.sectionTitle}>Debug</Text>
// //               <Text style={styles.sectionDescription}>
// //                 <DebugInstructions />
// //               </Text>
// //             </View>
// //             <View style={styles.sectionContainer}>
// //               <Text style={styles.sectionTitle}>Learn More</Text>
// //               <Text style={styles.sectionDescription}>
// //                 Read the docs to discover what to do next:
// //               </Text>
// //             </View>
// //             <LearnMoreLinks />
// //           </View>
// //         </ScrollView>
// //       </SafeAreaView>
// //     </>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   scrollView: {
// //     backgroundColor: Colors.lighter,
// //   },
// //   engine: {
// //     position: 'absolute',
// //     right: 0,
// //   },
// //   body: {
// //     backgroundColor: Colors.white,
// //   },
// //   sectionContainer: {
// //     marginTop: 32,
// //     paddingHorizontal: 24,
// //   },
// //   sectionTitle: {
// //     fontSize: 24,
// //     fontWeight: '600',
// //     color: Colors.black,
// //   },
// //   sectionDescription: {
// //     marginTop: 8,
// //     fontSize: 18,
// //     fontWeight: '400',
// //     color: Colors.dark,
// //   },
// //   highlight: {
// //     fontWeight: '700',
// //   },
// //   footer: {
// //     color: Colors.dark,
// //     fontSize: 12,
// //     fontWeight: '600',
// //     padding: 4,
// //     paddingRight: 12,
// //     textAlign: 'right',
// //   },
// // });
