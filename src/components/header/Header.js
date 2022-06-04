import React from 'react'
import styles from './header.module.css'
import { BiSearchAlt } from 'react-icons/bi'
import pokeBallImage from '../../assets/pokeball.png'

function Header(props) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={pokeBallImage} alt="logo" />
      </div>

      <div className={styles.search}>
        <input
          type="text"
          placeholder="Pokemon"
          value={props.value}
          onInput={(e) => props.callBack(e)}
        />
        <BiSearchAlt className={styles.icon} />
      </div>
    </header>
  )
}

export default Header
