function setAuthentication (obj) {
  return {
    type: 'SET_AUTH',
    facebook_id: obj.facebook_id,
    status: obj.status
  }
}


export default setAuthentication;
