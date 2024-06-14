import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/auth';

import { useGetListQuery } from '../../services/TMDB';

import RatedCard from '../RatedCard/RatedCard';

const Profile = () => {
  const { user } = useSelector(userSelector);


  const { data: favouriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});
  const { data: watchlistMovies, refetch: refetchWathlisted } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});

  useEffect(() => {
    refetchFavorites();
    refetchWathlisted();
  }, [])
  


  const logout = () => {

    localStorage.clear();

    window.location.href = '/';

  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom >My Profile</Typography>
        <Button color='inherit' onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favouriteMovies?.results?.length && !watchlistMovies?.results?.length 
        ? <Typography>Add favourites or watchlist some movies to see them here!</Typography>
        : (
          <Box>
            <RatedCard title={'Favourite Movies'} data={favouriteMovies} />
            <RatedCard title={'WatchList'} data={watchlistMovies} />
          </Box>
        )
    }

    </Box>
  )
}

export default Profile