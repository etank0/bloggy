import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import authService from './services/auth';
import { login, logout } from './features/auth/authSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Footer,
  Header,
  AuthLayout,
  CurveContainer,
  CustomToaster,
  Loader,
} from './components';
import { ThemeProvider } from './context/ThemeContext';
import { Signup, Login, MyPosts, AddPost, EditPost, Post, Home, About } from './pages';
import { useDrawer } from './context/DrawerContext';

function App() {
  const [loading, setLoading] = useState(true);
  const status = useSelector((state) => state.auth.status);

  const dispatch = useDispatch();

  // for Drawer
  const { isDrawerOpen } = useDrawer();

  const userAuth = async () => {
    setLoading(true);
    const userData = await authService.getCurrentUser();

    if (userData) {
      dispatch(login(userData));
    } else {
      dispatch(logout());
    }
    setLoading(false);
  };

  useEffect(() => {
    userAuth();
  }, [status]);

  return (
    <div className="bg-bkg-primary min-h-screen w-full">
      <ThemeProvider>
        <CustomToaster />
        <HelmetProvider>
          <CurveContainer className="fixed z-0 h-full top-0" />
          {loading ? (
            <div className="text-text-primary min-h-screen flex flex-col justify-center items-center">
              <Loader />
            </div>
          ) : (
            <div className="text-text-primary min-h-screen flex flex-col">
              <Router>
                <Header />
                <div
                  className={`z-10 ${isDrawerOpen
                      ? 'overflow-hidden max-h-[calc(100vh-5.5rem)]'
                      : 'overflow-auto'
                    } text-text-primary min-h-[calc(100vh-5.5rem)] flex flex-col`}
                >
                  <div className={`w-full flex flex-col flex-1`}>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <>
                            <Helmet>
                              <title>Home - Bloggy</title>
                            </Helmet>
                            <Home />
                          </>
                        }
                      ></Route>
                      <Route
                        path="/about"
                        element={
                          <>
                            <Helmet>
                              <title>About - Bloggy</title>
                            </Helmet>
                            <About />
                          </>
                        }
                      ></Route>

                      <Route
                        path="/login"
                        element={
                          <>
                            <Helmet>
                              <title>Login - Bloggy</title>
                            </Helmet>
                            <AuthLayout authentication={false}>
                              <Login />
                            </AuthLayout>
                          </>
                        }
                      ></Route>
                      <Route
                        path="/signup"
                        element={
                          <>
                            <Helmet>
                              <title>Signup - Bloggy</title>
                            </Helmet>
                            <AuthLayout authentication={false}>
                              <Signup />
                            </AuthLayout>
                          </>
                        }
                      ></Route>
                      <Route
                        path="/post/:slug"
                        element={
                          <>
                            <Post />
                          </>
                        }
                      ></Route>
                      <Route
                        path="/posts"
                        element={
                          <>
                            <Helmet>
                              <title>My Posts - Bloggy</title>
                            </Helmet>
                            <AuthLayout authentication>
                              <MyPosts />
                            </AuthLayout>
                          </>
                        }
                      ></Route>
                      <Route
                        path="/posts/add"
                        element={
                          <>
                            <Helmet>
                              <title>Add Post - Bloggy</title>
                            </Helmet>
                            <AuthLayout authentication>
                              {' '}
                              <AddPost />
                            </AuthLayout>
                          </>
                        }
                      ></Route>
                      <Route
                        path="/posts/edit/:slug"
                        element={
                          <>
                            <AuthLayout authentication>
                              {' '}
                              <EditPost />
                            </AuthLayout>
                          </>
                        }
                      ></Route>
                      <Route
                        path="*"
                        element={
                          <>
                            <Helmet>
                              <title>404 - Bloggy</title>
                            </Helmet>
                            <h1>404: Not Found</h1>
                          </>
                        }
                      ></Route>
                    </Routes>
                  </div>
                  <Footer />
                </div>
              </Router>
            </div>
          )}
        </HelmetProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
