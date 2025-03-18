import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import SearchResult from './components/SearchResult'

import MovieContext from './context/MovieContext'

import './App.css'

const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'

const App = () => {
  const [urlResponse, setUrlResponse] = useState({})
  const [movieStatus, setMovieStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const onSearch = async (page = 1) => {
    setMovieStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`

    const response = await fetch(apiUrl)
    const data = await response.json()
    setUrlResponse(getUpdatedData(data))
    setMovieStatus('SUCCESS')
  }

  return (
    <MovieContext.Provider
      value={{
        urlResponse,
        movieStatus,
        onSearch,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <Switch>
        <Route exact path="/" component={PopularMovies} />
        <Route exact path="/top-rated" component={TopRatedMovies} />
        <Route exact path="/upcoming" component={UpcomingMovies} />
        <Route exact path="/search" component={SearchResult} />
      </Switch>
    </MovieContext.Provider>
  )
}

export default App
