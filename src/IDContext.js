import React from 'react'

const ids = []

export default React.createContext({
  getID (namespace) {
    let id = null

    while (id === null || ids.includes(id) === true) {
      id = `${namespace}-${Math.floor(Math.random() * 1000000)}`
    }

    ids.push(id)

    return id
  },

  clearID (id) {
    const position = ids.indexOf(id)
    if (position === -1) return
    ids.splice(position, 1)
  }
})
