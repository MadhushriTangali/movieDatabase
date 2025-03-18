import {Link, withRouter} from 'react-router-dom'

import MovieContext from '../../context/MovieContext'

import './index.css'

const TopContainer = props => {
  const renderSearch = () => (
    <MovieContext.Consumer>
      {value => {
        const {onSearch, onChangeSearchInput, searchInput} = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onSearch()
          history.replace(`/search`)
        }

        return (
          <div className="search-input-container">
            <input
              type="text"
              className="input-text"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="search-button"
              type="button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </MovieContext.Consumer>
  )

  return (
    <>
      <h1>movieDB</h1>
      <div>
        <ul>
          <li className="list-item">
            <Link to="/">Popular</Link>
          </li>
          <li className="list-item">
            <Link to="/top-rated">Top Rated</Link>
          </li>
          <li className="list-item">
            <Link to="/upcoming">Upcoming</Link>
          </li>
        </ul>
        {renderSearch()}
      </div>
    </>
  )
}

export default withRouter(TopContainer)
