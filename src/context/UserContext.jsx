import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

// creating contexts
const UserStateContext = createContext();
const UserDispatchContext = createContext();

// Reducer function to handle login/logout
const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

//   useEffect(() => {
//     const storedUser = JSON.parse(
//       window.localStorage.getItem('loggedBlogAppUser')
//     );
//     if (storedUser) {
//       dispatch({ type: 'LOGIN', payload: storedUser });
//     }
//   }, []);

  return (
    <UserStateContext.Provider value={state.user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custon hook to use useUser
export const useUser = () => {
  const state = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);

  if (state === undefined || dispatch === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const login = (user) => dispatch({ type: 'LOGIN', payload: user });
  const logout = () => dispatch({ type: 'LOGOUT' });

  return { user: state, login, logout };
};
