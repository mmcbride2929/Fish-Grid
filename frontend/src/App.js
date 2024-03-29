import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Box, ChakraProvider } from '@chakra-ui/react'
import { myTheme } from './theme/theme'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Error from './pages/Error'
import Feed from './pages/Feed'
import ProtectedRoute from './pages/ProtectedRoute'
import SinglePost from './pages/SinglePost'
import EditPost from './pages/EditPost'
import { useState } from 'react'
import CreatePost from './pages/CreatePost'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  const [nav, setNav] = useState(false)
  return (
    <>
      <ChakraProvider theme={myTheme}>
        <BrowserRouter>
          <Box minH="100vh" display="flex" flexDirection="column">
            {nav && <Navbar setNav={setNav} />}
            <Routes>
              <Route
                path="/feed"
                element={
                  <ProtectedRoute>
                    <Feed setNav={setNav} />
                  </ProtectedRoute>
                }
              />
              <Route path="landing" element={<Landing setNav={setNav} />} />
              <Route exact path="/" element={<Landing setNav={setNav} />} />
              <Route path="login" element={<Login setNav={setNav} />} />
              <Route path="register" element={<Register setNav={setNav} />} />
              <Route path="*" element={<Error setNav={setNav} />} />

              <Route
                path="post/:id"
                element={
                  <ProtectedRoute>
                    <SinglePost setNav={setNav} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit-post/:id"
                element={
                  <ProtectedRoute>
                    <EditPost setNav={setNav} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="create-post"
                element={
                  <ProtectedRoute>
                    <CreatePost setNav={setNav} />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="user/:id"
                element={
                  <ProtectedRoute>
                    <ProfilePage setNav={setNav} />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </Box>
        </BrowserRouter>
      </ChakraProvider>
    </>
  )
}

export default App
