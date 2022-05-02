import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
// import About from './components/About';
import CreationForm from './components/CreationForm';
import GameDetail from './components/GameDetail'
import NavBar from './components/NavBar';

export default function App() {
  return (
    <React.Fragment>
      <Route path={'/home'} component={NavBar} />
      <Switch>
        {/* <Route path={'/home/about'} component={About} /> */}
        <Route path={'/home/create'} component={CreationForm} />
        <Route path={'/home/videogame/:id'} component={GameDetail} />
        <Route path={'/home'} component={Home}/>
        <Route path={'/'} component={Landing} />
      </Switch>
    </React.Fragment>
  );
}