const initialState = {
  token: localStorage.getItem("iv_jwt") || null,
  user: null,
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("iv_jwt", action.payload)
      return { ...state, token: action.payload }
    case "LOGOUT":
      localStorage.removeItem("iv_jwt")
      return { ...state, token: null, user: null }
    case "SET_USER":
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
      return { ...state, user: action.payload }
    default:
      return state
  }
}

export const login = (token) => ({ type: "LOGIN", payload: token })
export const logout = () => ({ type: "LOGOUT" })
export const setUser = (user) => ({ type: "SET_USER", payload: user })
