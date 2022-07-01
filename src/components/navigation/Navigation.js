import React, { useEffect } from 'react'
import styles from './navigation.module.css'

function getPage(page, count, pagination) {
  const min = 1
  const max = Math.ceil(count / pagination)

  if (page > max) return min
  if (page < min) return max
  return page
}

function Navigation(props) {
  useEffect(() => {
    props.setPage(getPage(props.page, props.count, props.pagination))
  }, [props.pagination, props])

  return (
    <div className={styles.navigation}>
      <div className={styles.pages}>
        <button
          className={styles.btn}
          onClick={() =>
            props.setPage(
              getPage(props.page - 1, props.count, props.pagination)
            )
          }
        >
          {'<'}
        </button>
        <input
          className={styles.btn}
          type="number"
          value={props.page}
          onChange={(e) =>
            props.setPage(
              getPage(e.target.value, props.count, props.pagination)
            )
          }
        />
        <button
          className={styles.btn}
          onClick={() =>
            props.setPage(
              getPage(props.page + 1, props.count, props.pagination)
            )
          }
        >
          {'>'}
        </button>
      </div>

      <div className={styles.pagination}>
        <button
          className={`${styles.btn} ${
            props.pagination === 10 ? styles.active : ''
          }`}
          onClick={() => props.setPagination(10)}
        >
          10
        </button>
        <button
          className={`${styles.btn} ${
            props.pagination === 20 ? styles.active : ''
          }`}
          onClick={() => props.setPagination(20)}
        >
          20
        </button>
        <button
          className={`${styles.btn} ${
            props.pagination === 50 ? styles.active : ''
          }`}
          onClick={() => props.setPagination(50)}
        >
          50
        </button>
      </div>
    </div>
  )
}

export default Navigation
