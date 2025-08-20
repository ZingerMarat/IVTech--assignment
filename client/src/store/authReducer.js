const initialState = {
  token: localStorage.getItem("iv_jwt") || null,
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("iv_jwt", action.payload)
      return { ...state, token: action.payload }
    case "LOGOUT":
      localStorage.removeItem("iv_jwt")
      return { ...state, token: null }
    default:
      return state
  }
}

export const login = (token) => ({ type: "LOGIN", payload: token })
export const logout = () => ({ type: "LOGOUT" })
