import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Game from './pages/Game/Game';
import Info from './pages/Info/Info';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';

import './App.scss';

const App = () => {
	return (
		<>
			<Header />
			<Switch>
				<Route exact path='/'>
					<Game />
				</Route>
				<Route path='/info'>
					<Info />
				</Route>
				<Route path='/accounts/login'>
					<Login />
				</Route>
				<Route path='/accounts/signup'>
					<Signup />
				</Route>
				<Route path='/profile'>
					<Profile />
				</Route>
				<PageNotFound />
			</Switch>
		</>
	);
};

export default App;
