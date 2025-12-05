export const saveUser = (data) => {
    localStorage.setItem("authData" ,JSON.stringify(data))
}

export const loadUser = () => {
  const data = localStorage.getItem("authData");
  return data ? JSON.parse(data) : null ;
}

export const clearUser = () => {
    localStorage.removeItem("authData")
};