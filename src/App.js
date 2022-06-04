import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Header from './components/header/Header'
import Navigation from './components/navigation/Navigation'
import Pokemons from './components/pokemons/Pokemons'

const BASE_URL = 'https://pokeapi.co/api/v2'

async function loadPokemons(callback) {
  await axios(`${BASE_URL}/pokemon?offset=0&limit=10000`)
    .then((response) => {
      callback(response.data.results)
    })
    .catch((e) => console.error(e.message))
}

function App() {
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState(10)
  const [search, setSearch] = useState('')

  const [pokemons, setPokemons] = useState([])
  const [filteredPokemons, setFilteredPokemons] = useState([])

  useEffect(() => {
    let newPokemons = pokemons

    if (search) {
      newPokemons = newPokemons.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
          search.toLowerCase().includes(pokemon.name.toLowerCase())
      )
    }

    setFilteredPokemons(newPokemons)
  }, [search, page, pagination, pokemons])

  useEffect(() => {
    loadPokemons((data) => {
      setPokemons(data)
      setFilteredPokemons(data)
    })
  }, [])

  return (
    <div id="app">
      <div className="background"></div>
      <Header
        value={search}
        callBack={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }}
      />

      <Navigation
        page={page}
        setPage={(value) => setPage(value)}
        pagination={pagination}
        setPagination={(value) => {
          setPage(1)
          setPagination(value)
        }}
        count={filteredPokemons.length}
      />

      <Pokemons
        pokemons={filteredPokemons.slice(
          page * pagination - pagination,
          page * pagination
        )}
      />
    </div>
  )
}

export default App
