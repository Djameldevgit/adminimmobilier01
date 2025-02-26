import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

import Post from './pages/post';

import Roles from './pages/administracion/roles';
import Searchusers from './pages/administracion/searchusers';
import Listausuariosbloqueados from './pages/administracion/listausuariosbloqueados';
import Homepostspendientes from './pages/administracion/homepostspendientes';


import Alert from './components/alert/Alert';
import Header from './components/header/Header';
import StatusModal from './components/StatusModal';
import NotFound from './components/NotFound';
import SocketClient from './SocketClient';
import CallModal from './components/message/CallModal';

import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from './redux/actions/authAction';
import { fetchPostsByCategory } from './redux/actions/postAction';
import { getSuggestions } from './redux/actions/suggestionsAction';
import { getNotifies } from './redux/actions/notifyAction';
import { getUsers } from './redux/actions/userAction';
import { getBlockedUsers } from './redux/actions/userBlockAction';

import io from 'socket.io-client';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import Profile from './pages/profile';

function App() {
  const { auth, status, modal, call } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getBlockedUsers(auth.token));
      dispatch(getUsers(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    dispatch(fetchPostsByCategory());
  }, [dispatch]);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
          <Header />
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}

          <Switch>
            <Route exact path="/profile/:id" render={(props) => auth.token ? <Profile {...props} /> : <Redirect to="/login" />} />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" render={() => auth.token ? <Redirect to={`/profile/${auth.user._id}`} /> : <Login />} />

            <Route exact path="/register" render={() => auth.token ? <Redirect to={`/profile/${auth.user._id}`} /> : <Register />} />

            <Route exact path="/post/:id" component={Post} />

            <Route exact path="/administracion/roles" render={() => (auth.token ? <Roles /> : <Redirect to="/login" />)} />
            <Route exact path="/administracion/searchusers" render={() => (auth.token ? <Searchusers /> : <Redirect to="/login" />)} />
            <Route exact path="/administracion/listausuariosbloqueados" render={() => (auth.token ? <Listausuariosbloqueados /> : <Redirect to="/login" />)} />
            <Route exact path="/administracion/homepostspendientes" render={() => (auth.token ? <Homepostspendientes /> : <Redirect to="/login" />)} />
            <Route component={NotFound} />
          </Switch>

        </div>
      </div>
    </Router>
  );
}

export default App;
