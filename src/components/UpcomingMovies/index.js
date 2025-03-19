import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MovieItem from '../MovieItem'
import TopContainer from '../TopContainer'

import './index.css'

class UpcomingMovies extends Component {
  state = {
    isLoading: true,
    upcomingMovieResponse: {},
  }

  componentDidMount() {
    this.getUpcomingMoviesResponse()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getUpcomingMoviesResponse = async (page = 1) => {
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, upcomingMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {upcomingMovieResponse} = this.state
    const {results} = upcomingMovieResponse

    return (
      <ul className="row p-0 ms-0 me-0 mt-3">
        {results.map(movie => (
          <MovieItem key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <TopContainer />
        <div className="route-page-body">
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularMoviesList()}
        </div>
      </>
    )
  }
}

export default UpcomingMovies
