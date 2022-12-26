import React, { useState, useReducer } from 'react'
import axios from 'axios'

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
  DELETE_POST_ERROR,
  DELETE_POST_SUCCESS,
  LOGOUT_USER,
} from './actions'
import reducer from './reducer'

const AppContext = React.createContext()

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: '',
  alertText: '',
  user: user ? JSON.parse(user) : null,
  token: token,
}

export const AppProvider = ({ children }) => {
  /* ******** state ******** */
  const [state, dispatch] = useReducer(reducer, initialState)
  const [posts, setPosts] = useState([])

  /* ******** axios instance + header for token ******** */
  const authFetch = axios.create({
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  })

  /* ******** functions ******** */
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const response = await axios.post(
        'http://localhost:2121/api/v1/auth/register',
        currentUser
      )
      const { user, token } = response.data

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const response = await axios.post(
        'http://localhost:2121/api/v1/auth/login',
        currentUser
      )

      const { user, token } = response.data
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      })

      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const logoutUser = async () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const createPost = async (post) => {
    try {
      await authFetch.post('http://localhost:2121/api/v1/posts', post)

      dispatch({
        type: CREATE_POST_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: CREATE_POST_ERROR,
        payload: { msg: error.response.data.msg },
      })
      console.log(error)
    }
    clearAlert()
  }

  const fetchPosts = async () => {
    try {
      const data = await axios.get(`http://localhost:2121/api/v1/posts`)

      setPosts(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updatePost = async (post, path) => {
    try {
      await authFetch.patch(`http://localhost:2121/api/v1/posts/${path}`, post)

      dispatch({
        type: UPDATE_POST_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: UPDATE_POST_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const deletePost = async (path) => {
    try {
      await authFetch.delete(`http://localhost:2121/api/v1/posts/${path}`)

      dispatch({
        type: DELETE_POST_SUCCESS,
      })
      fetchPosts()
    } catch (error) {
      dispatch({
        type: DELETE_POST_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        displayAlert,
        clearAlert,
        loginUser,
        fetchPosts,
        posts,
        createPost,
        updatePost,
        deletePost,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
