import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './card.module.css'
import pokeBallImage from '../../assets/pokeball.png'

import {
  GiLibertyWing,
  GiPiercingSword,
  GiPointySword,
  GiEdgedShield,
} from 'react-icons/gi'
import { BsShieldShaded } from 'react-icons/bs'
import { FaHeartbeat } from 'react-icons/fa'

async function getInfo(pokemon, callback) {
  await axios(pokemon.url)
    .then((response) => {
      // Если есть svg, берём svg
      let img = response.data.sprites.other.dream_world.front_default

      // Если svg нету, берём png.
      if (!img) img = response.data.sprites.front_default

      // Если png нету - отображаем локальный покебол
      if (!img) img = pokeBallImage

      callback({
        types: response.data.types,
        image: img,
        stats: response.data.stats,
        baseExperience: response.data.base_experience,
      })
    })
    .catch((e) => console.error(e.message))
}

function Cards(props) {
  const pokemon = props.pokemon

  const [info, setInfo] = useState({
    types: [],
    image: null,
    stats: [],
    baseExperience: null,
  })

  const bgColor =
    info.types.length > 0 ? `var(--bg-${info.types[0].type.name}, white)` : ''

  const textColor =
    info.types.length > 0
      ? `var(--color-${info.types[0].type.name}, white)`
      : ''

  useEffect(() => {
    getInfo(pokemon, (data) => {
      setInfo(data)
    })
  }, [pokemon])

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{
          background: bgColor,
        }}
      >
        <img src={info.image} alt="pokemon"></img>
      </div>

      <div className={styles.info}>
        <div className={styles.name}>
          <h6
            style={{
              color: textColor,
            }}
          >{`Experience ${info.baseExperience}`}</h6>
          <h1>{pokemon.name}</h1>
        </div>

        <div className={styles.types}>
          <ul>
            {info.types.map((type, index) => (
              <li
                style={{
                  background: `var(--bg-${type.type.name}, white)`,
                }}
                key={index}
              >
                {type.type.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={styles.stats}
        style={{
          background: bgColor,
        }}
      >
        <ul>
          {info.stats.map((stat, index) => (
            <li key={index}>
              <p>{stat.base_stat}</p>
              <p>
                {stat.stat.name === 'hp' ? <FaHeartbeat /> : ''}
                {stat.stat.name === 'attack' ? <GiPiercingSword /> : ''}
                {stat.stat.name === 'defense' ? <BsShieldShaded /> : ''}
                {stat.stat.name === 'special-attack' ? <GiPointySword /> : ''}
                {stat.stat.name === 'special-defense' ? <GiEdgedShield /> : ''}
                {stat.stat.name === 'speed' ? <GiLibertyWing /> : ''}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Cards
