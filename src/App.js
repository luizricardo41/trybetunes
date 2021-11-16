import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <section>
          <Header />
          <Content />
          <Footer />
        </section>
      </BrowserRouter>
    );
  }
}

export default App;
