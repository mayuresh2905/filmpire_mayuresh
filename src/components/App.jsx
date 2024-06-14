import React , { useRef } from 'react'
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import useStyles from './styles';
import useAlan from './Alan';

import { Actors, MovieInformatin, Movies, NavBar, Profile } from './'
// import Actors from './Actors/Actors';
// import NavBar from './NavBar/NavBar';
// import Movies from './Movies/Movies';
// import MovieInformatin from './MovieInformation/MovieInformatin';
// import Profile from './Profile/Profile';


const App = () => {

  const classes = useStyles();
  const alanBtnContainer = useRef();

  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
        <Route exact path="/movie/:id" element={<MovieInformatin />} />
          <Route exact path="/actors/:id" element={<Actors />} />
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/approved" element={<Movies />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        
        </Routes>
          
        
      </main>
      <div ref={alanBtnContainer}/>
    </div>
  )
}

export default App;