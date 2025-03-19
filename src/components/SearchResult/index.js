import Loader from 'react-loader-spinner'

import MovieItem from '../MovieItem'
import TopContainer from '../TopContainer'
import Pagination from '../Pagination'

import MovieContext from '../../context/MovieContext'

import './index.css'

const SearchResult = () => {
  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h1>No results found.</h1>
      <p>Don not get worried, Try to search again.</p>
    </div>
  )

  const renderMoviesList = urlResponse => {
    const {results} = urlResponse

    if (!results.length) {
      return renderEmptyView()
    }
    return (
      <ul className="row p-0 ms-0 me-0 mt-3">
        {results.map(movie => (
          <MovieItem key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const renderSearchResultViews = value => {
    const {urlResponse, movieStatus} = value

    switch (movieStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMoviesList(urlResponse)
      default:
        return renderEmptyView()
    }
  }

  return (
    <MovieContext.Consumer>
      {value => {
        const {urlResponse, onSearch} = value

        return (
          <>
            <TopContainer />
            <div className="route-page-body">
              {renderSearchResultViews(value)}
            </div>
          </>
        )
      }}
    </MovieContext.Consumer>
  )
}

export default SearchResult
