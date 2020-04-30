import React from 'react';
import PropTypes from 'prop-types';
import {
  hasLoggedInUser,
  loginAnonymous,
  logoutCurrentUser,
  getCurrentUser,
} from '../services/auth/authentication';

// Create a React Context that lets us expose and access auth state
// without passing props through many levels of the component tree
const StitchAuthContext = React.createContext();

// Create a React Hook that lets us get data from our auth context
export function useStitchAuth() {
  const context = React.useContext(StitchAuthContext);
  if (!context) {
    throw new Error('useStitchAuth must be used within a StitchAuthProvider');
  }
  return context;
}

// Create a component that controls auth state and exposes it via
// the React Context we created.
export function StitchAuthProvider() {
  const [authState, setAuthState] = React.useState({
    isLoggedIn: hasLoggedInUser(),
    currentUser: getCurrentUser(),
  });

  // Authentication Actions
  const handleAnonymousLogin = async () => {
    const {isLoggedIn} = authState;
    if (!isLoggedIn) {
      const loggedInUser = await loginAnonymous();
      setAuthState({
        ...authState,
        isLoggedIn: true,
        currentUser: loggedInUser,
      });
    }
  };
  const handleLogout = async () => {
    const {isLoggedIn} = authState;
    if (isLoggedIn) {
      await logoutCurrentUser();
      setAuthState({
        ...authState,
        isLoggedIn: false,
        currentUser: null,
      });
    } else {
      console.log("can't handleLogout when no user is logged in");
    }
  };

  // We useMemo to improve performance by eliminating some re-renders
  const authInfo = React.useMemo(
    () => {
      const {isLoggedIn, currentUser} = authState;
      const value = {
        isLoggedIn,
        currentUser,
        actions: {handleAnonymousLogin, handleLogout},
      };
      return value;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authState.isLoggedIn],
  );
  return (
    <StitchAuthContext.Provider value={authInfo}>
      {props.children}
    </StitchAuthContext.Provider>
  );
}
StitchAuthProvider.propTypes = {
  children: PropTypes.element,
};

// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   getCurrentUser,
//   hasLoggedInUser,
//   loginAnonymous,
//   logoutCurrentUser,
// } from '../services/auth/authentication';

// //se crea React Context que permite exponer el state del access auth
// //sin pasar props a traves de varios niveles de componentes
// const StitchAuthContext = React.createContext();

// export function useStitchAuth() {
//   const context = React.useContext(StitchAuthContext);
//   if (!context) {
//     throw new Error('useStitchAuth must be used within a StitchAuthProvider');
//   }
//   return context;
// }

// //Se crea un componente que controla el auth state y lo expone via el react context creado anteriormente
// export function StitchAuthProvider(props) {
//   const [authState, setAuthState] = React.useState({
//     isLoggedIn: hasLoggedInUser(),
//     currentUser: getCurrentUser(),
//   });

//   const handleAnonymousLogin = async () => {
//     const {isLoggedIn} = authState;
//     if (!isLoggedIn) {
//       const loggedInUser = await loginAnonymous();
//       setAuthState({
//         ...authState,
//         isLoggedIn: true,
//         currentUser: loggedInUser,
//       });
//     }
//   };

//   const handleLogout = async () => {
//     const {isLoggedIn} = authState;
//     if (isLoggedIn) {
//       await logoutCurrentUser();
//       setAuthState({
//         ...authState,
//         isLoggedIn: false,
//         currentUser: null,
//       });
//     } else {
//       console.log("can't handleLogout when no user is logged in");
//     }
//   };

//   //Se usa useMemo para mejorar el performance eliminando algun re-renders
//   const authInfo = React.useMemo(() => {
//     const {isLoggedIn, currentUser} = authState;
//     const value = {
//       isLoggedIn,
//       currentUser,
//       actions: {handleAnonymousLogin, handleLogout},
//     };
//     return value;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [authState.isLoggedIn]);

//   return (
//     <StitchAuthContext.Provider value={authInfo}>
//       {props.children}
//     </StitchAuthContext.Provider>
//   );
// }

// StitchAuthProvider.prototype = {
//   children: PropTypes.element,
// };
