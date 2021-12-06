import React, { useState } from 'react'
import './CreateDeveloper.scss'

const CreateDeveloper = ({ active, setActive, addDeveloper }) => {
  const [developerForm, setDeveloperForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    photo: 'https://st4.styapokupayu.ru/images/blog_posts/covers/000/136/369_large.jpg?1576853877',
  })
  const [error, setError] = useState(null)

  const createDeveloper = async (e) => {
    e.preventDefault()
    const requestBody = {
      developer: developerForm,
    }

    try {
      const response = await fetch('http://localhost:8000/api/developer', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()

        addDeveloper(data.developer)
        close()
        return
      }

      let error

      try {
        error = await response.json()
      } catch (e) {
        error = response
      }

      const errorMessage = error.message || error.messages.join(' / ')
      setError(errorMessage)
    } catch (e) {}
  }

  const onInputChange = (key, value) => {
    setDeveloperForm({
      ...developerForm,
      [key]: value,
    })
  }

  const close = () => {
    setError(null)
    setDeveloperForm({
      firstName: '',
      lastName: '',
      email: '',
    })
    setActive(false)
  }

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => close()}>
      <div className="content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={createDeveloper}>
          <input onChange={(e) => onInputChange('firstName', e.target.value)} placeholder="add firstName" value={developerForm.firstName} />
          <input onChange={(e) => onInputChange('lastName', e.target.value)} placeholder="add lastName" value={developerForm.lastName} />
          <input onChange={(e) => onInputChange('email', e.target.value)} placeholder="add email" value={developerForm.email} />

          {!!error && <h3 style={{ color: 'red' }}>{error}</h3>}

          <div className="buttons">
            <button type="submit">Add</button>
            <button className="close-btn" onClick={() => close()}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateDeveloper
