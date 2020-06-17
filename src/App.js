import React, { useState, useEffect } from 'react'
import api from './services/api'

import './styles.css'

function App() {
  const [repositories, setRepository] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => [setRepository(response.data)])
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio ReactJS ${Date.now()}`,
      url:
        'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs',
      techs: ['Node.js', 'React'],
    })

    setRepository([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const filteredArray = repositories.filter(item => item.id !== id) //Return everything but the deleted item.

    setRepository(filteredArray)
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
