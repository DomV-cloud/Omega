import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Sidebar from './components/Navbar/Sidebar';
import Dictaphone from './components/VoiceAssistant/Dictaphone';
import './custom.css';
import Layout from './components/Menu/Layout';
   
export default class App extends Component {
    static displayName = App.name;

    
  render() {
      return (
          <Routes>
              <Route element={<Layout />}>
                  {AppRoutes.map((route, index) => {
                      const { path, element } = route;
                      return <Route key={index} path={path} element={element} />;
                  })}
              </Route>
          </Routes>
    );
  }
}
