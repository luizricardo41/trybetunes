import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <body>
          <Header />
          <Content />
          <Footer />
        </body>
      </BrowserRouter>
    );
  }
}

export default App;
