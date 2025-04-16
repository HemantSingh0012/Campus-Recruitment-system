import { SET_USER, REMOVE_USER } from '../constants/actionTypes';

const initialState = null;

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      // If role is not in the user object but exists in localStorage, add it
      const storedRole = localStorage.getItem('userRole');
      const userWithRole = action.payload.user.role 
        ? action.payload.user 
        : { ...action.payload.user, role: storedRole };
      return userWithRole;
    case REMOVE_USER:
      localStorage.removeItem('userRole'); // Clear role on logout
      return null;
    default:
      return state;
  }
};

export default user;
