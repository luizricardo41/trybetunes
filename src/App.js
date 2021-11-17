import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import './login.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="content-total">
          <div className="header">
            <Header />
          </div>
          <div className="content">
            <Content />
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
