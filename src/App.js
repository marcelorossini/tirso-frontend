import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import CoursesDetail from './pages/CoursesDetail';
import ProcessPayment from './pages/ProcessPayment';

export default () => {
    return (
      <div className="app">
        <BrowserRouter>     
            <Header/>          
            <main>
              <Route path="/" exact component={Home} />
              <Route path="/cursos" exact component={Courses} />
              <Route path="/cursos/:id" component={CoursesDetail} />
              <Route path="/processar/:type" component={ProcessPayment} />
              <Route path="/about" exact component={About} />
            </main>
            <Footer/>               
        </BrowserRouter>               
      </div>
    )
}