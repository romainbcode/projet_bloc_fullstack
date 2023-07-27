import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';
import store from './redux/store'
import LogIn from './pages/LogIn';
import AdminDashboard from './admin/AdminDashboard';
import CreatePost from './admin/CreatePost';
import EditPost from './admin/EditPost';
import AdminRoute from './components/AdminRoute';
import Layout from './admin/global/Layout'
import UserDashboard from './user/UserDashboard';
import UserRoute from './components/UserRoute';
import SinglePost from './pages/Singlepost';

//HOC
const AdminDashboardHOC = Layout(AdminDashboard)
const CreatePostHOC = Layout(CreatePost);
const EditPostHOC = Layout(EditPost);
const UserDashboardHOC = Layout(UserDashboard);

const App = () =>{
  return(
    <>
      <ToastContainer/>
      <Provider store={store}>
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/login' element={<LogIn/>}></Route>
              <Route path='/post/:id' element={<SinglePost/>}></Route>
              <Route path='*' element={<NotFound/>}></Route>
              <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC/></AdminRoute>}></Route>
              <Route path='/admin/post/create' element={<AdminRoute><CreatePostHOC/></AdminRoute>}></Route>
              <Route path='/admin/post/edit/:id' element={<AdminRoute><EditPost/></AdminRoute>}></Route>
              <Route path='/user/dashboard' element={<UserRoute><UserDashboardHOC/></UserRoute>}></Route>
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider>
      </Provider>
    </>
  )
}

export default App
