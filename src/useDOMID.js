import React from 'react'
import IDContext from './IDContext'

export default function useDOMID (namespace = 'app') {
  const [id, setID] = React.useState(null)
  const { getID, clearID } = React.useContext(IDContext)

  React.useEffect(() => {
    const newID = getID(namespace)
    setID(newID)
    return () => clearID(newID)
  }, [namespace, getID, clearID])

  return id
}
