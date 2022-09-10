import { useState } from 'react';

export default function useToken() {

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    
    if (!tokenString || tokenString == "undefined") {
      console.log("test");
      return null;
    }
    
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  }
  
  const [token, setToken] = useState(getToken());
  
  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  }
  
  return {
    setToken: saveToken,
    token
  }
  
}
