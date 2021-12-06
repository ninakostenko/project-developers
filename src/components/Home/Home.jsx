import React, { useEffect, useState } from 'react'
import CreateDeveloper from './CreateDeveloper'
import Header from './Header'

import './Home.scss'

const Home = () => {
  const [developers, setDevelopers] = useState([])
  const [modalActive, setModalActive] = useState(false)

  useEffect(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/developers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setDevelopers(data.developers)
      }
    } catch (error) {}
  }, [])

  const deleteDeveloper = async (developerUuid) => {
    try {
      const response = await fetch(`http://localhost:8000/api/developer/${developerUuid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const updatedDevelopers = developers.filter((developer) => developer.uuid !== developerUuid)
        setDevelopers(updatedDevelopers)
      }
    } catch (error) {}
  }

  const addDeveloper = (developer) => {
    const updatedDevelopers = [...developers, developer]
    setDevelopers(updatedDevelopers)
  }

  return (
    <div>
      <Header />

      <main>
        <div className="left">
          <h3>Developers</h3>
        </div>
        <div className="container">
          {developers.map((developer) => {
            return (
              <div key={developer.uuid}>
                <img style={{ width: 150 }} src={developer.photo} alt="img" />

                <p>{developer.firstName}</p>
                <p>{developer.lastName}</p>
                <p>{developer.email}</p>
                <button onClick={() => deleteDeveloper(developer.uuid)}>Delete</button>
                <hr />
              </div>
            )
          })}
          <button className="open_btn" onClick={() => setModalActive(true)}>
            Add new developer
          </button>
        </div>
      </main>

      <CreateDeveloper active={modalActive} setActive={setModalActive} addDeveloper={addDeveloper} />
    </div>
  )
}
export default Home
