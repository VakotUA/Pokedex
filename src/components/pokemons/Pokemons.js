import React from 'react'
import Card from '../card/Card'
import styles from './pokemons.module.css'

function Pokemons(props) {
  const pokemons = props.pokemons

  return (
    <section className={styles.pokemons}>
      {pokemons.map((pokemon, index) =>
        pokemon ? (
          <Card key={index} pokemon={pokemon} />
        ) : (
          <h1>Pokemon are hiding</h1>
        )
      )}
    </section>
  )
}

export default Pokemons
