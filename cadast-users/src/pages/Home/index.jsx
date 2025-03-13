import './style.css'
import Trash from '../../assets/trash.svg'
import { api } from '../../services/api'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


  async function getUsers() {

    const usersFromApi = await api.get('/users');

    setUsers(usersFromApi.data.Usuarios)

  }

  async function createUsers() {

    await api.post('/users', {
      name: inputName.current.value,
      age: parseInt(inputAge.current.value),
      email: inputEmail.current.value

    });
    getUsers()
  }




  async function deleteUsers(id) {

    await api.delete(`/users/${encodeURIComponent(id)}`);
    getUsers()

  }





  useEffect(() => {
    getUsers()
  }, [])





  return (

    <div className='container'>
      <form onSubmit={createUsers}>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='Nome' type='text' ref={inputName} />
        <input placeholder='Idade' name='idade' type='number' ref={inputAge} />
        <input placeholder='Email' name='email' type='email' ref={inputEmail} />

        <button type='submit'>Cadastrar</button> {/* Alterei o type de button para submit */}
      </form>




      {Array.isArray(users) && users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>

          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="Excluir" />
          </button>
        </div>
      ))}





    </div>

  )
}

export default Home
