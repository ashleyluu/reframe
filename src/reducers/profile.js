const initState = {
  status:"",
  user_id:"",
  facebook_id:"",
  first_name:"",
  last_name:"",
  image_url:"",
  email:"",
  user_type:"",
  stem_tags:"",
  bio:"",
  school:"",
  grad_year:"",
  major:"",
  skills:"",
  grade:"",
  interest:""
};

function profileReducer (state = initState, action) {

  switch (action.type) {
    case 'SET_PROFILE':
      return Object.assign({}, state, action.profile);
    default:
      return state;
  }
}

export default profileReducer;
