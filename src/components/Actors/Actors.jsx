import React, {useState} from 'react';
import { Box, Button, CircularProgress, Grid, Typography, useMediaQuery } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

import useStyles from './styles';
import { useGetActorsDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import CustomPagination from '../Pagination/CustomPagination';

const Actors = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });
  const classes = useStyles();

  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 18 : 20;
  

  if(isFetching){
    return (
      <Box display="flex" justifyContent="center">
         <CircularProgress size="8rem" />
      </Box>
    )
  }

  if(error){
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
         <Button startIcon={<ArrowBack />  } onClick={() => navigate(-1)}>
           Go Back
         </Button>
      </Box>
    )
  }

  return (
    <> 
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
          />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>{data?.name}</Typography>
          <Typography variant="h5" gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
          <Typography variant="body1" align="justify" paragraph>{data?.biography || 'Sorry, no biography yet...'}</Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
             <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
             <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color="primary">Back</Button>
          </Box>   
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">Movies</Typography>
        {movies && <MovieList movies={movies} numberOfMovies={numberOfMovies} />}
        <CustomPagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
       
      </Box>

    </>
  )
}

export default Actors