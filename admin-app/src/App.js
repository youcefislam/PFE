import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './App.css';
import SideBar from './Component/SideBar';
import LoginPage from './Component/Login';
import Dashboard from './Component/Dashboard';
import Utilisateurs from './Component/Utilisateurs';
import Specialites from './Component/Specialites';
import Feedback from './Component/Feedback';
import SousSpecialites from "./Component/SousSpecialites";
import Document from './Component/Document';
import Quizz from './Component/Quizz';
import Commentaire from './Component/Commentaire'

import $ from "jquery";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      status: false,
    }
  }

  toggleMenu = () => {
    $('#menu').hasClass('d-block')? $('#menu').removeClass("d-block"):$('#menu').addClass("d-block");
  }

  render() {
    return (
      <Router>
        {
          this.state.status ?
            <LoginPage />
            :
            <div className='container-fluid'>
              <div className='row p-O'>
                <div id='menu' className='col-9 col-md-5 col-lg-3 p-0 vh-100 d-none d-md-block d-lg-block d-xl-block'>
                  <Route render={(props) => <SideBar {...props} toggleMenu={this.toggleMenu} />} />
                </div>
                <button className='d-block d-md-none d-lg-none toggleMenue p-O' onClick={this.toggleMenu}>
                  <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.26564 0H13.7345C14.4307 0 15 0.585326 15 1.30077C15 2.01621 14.4307 2.60166 13.7345 2.60166H1.26564C0.569585 2.60166 0 2.01633 0 1.30089C0 0.585326 0.569585 0 1.26564 0ZM1.26564 10.3985H13.7345C14.4307 10.3985 15 10.9838 15 11.6992C15 12.4147 14.4307 13 13.7345 13H1.26564C0.569585 13 0 12.4147 0 11.6992C0 10.9838 0.569585 10.3985 1.26564 10.3985ZM1.26564 5.1993H13.7345C14.4307 5.1993 15 5.78462 15 6.50006C15 7.2155 14.4307 7.80095 13.7345 7.80095H1.26564C0.569585 7.80095 0 7.2155 0 6.50006C0 5.78462 0.569585 5.1993 1.26564 5.1993Z" fill="#5B4DA9" />
                  </svg>
                </button>
                <div className='col p-0 overflow-auto vh-100'>
                  <Route exact path="/" render={(props) => <Dashboard {...props} />} />
                  <Route exact path="/Utilisateurs" render={(props) => <Utilisateurs {...props} />} />
                  <Route exact path="/specialites" render={(props) => <Specialites {...props} />} />
                  <Route exact path="/specialites/:id_ss" render={(props) => <SousSpecialites {...props} />} />
                  <Route exact path="/specialites/:id_ss/:id_doc" render={(props) => <Document {...props} />} />
                  <Route exact strict path="/specialites/:id_ss/:id_doc/:id_quiz" render={(props) => <Quizz {...props} />} />
                  <Route exact path="/specialites/:id_ss/:id_doc/commentaire/" render={(props) => <Commentaire {...props} />} />
                  <Route exact path="/feedback" render={(props) => <Feedback {...props} />} />
                  
                </div>
              </div>
            </div>
        }
      </Router>
    )
  }
}

export default App;
