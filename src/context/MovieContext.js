import React from 'react'

const MovieContext = React.createContext({
  response: {},
  onSearch: () => {},
})

export default MovieContext
