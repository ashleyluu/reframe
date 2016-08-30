const initState = {};

function authReducer (state = initState, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return Object.assign({}, state, {
        facebook_id: action.facebook_id,
        status: action.status
      });
    case 'CLEAR_AUTH':
      return Object.assign({}, state, {
        facebook_id: '',
        status: ''
      });
    default:
      return state;
  }
}

export default authReducer;
