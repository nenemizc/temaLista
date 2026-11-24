import { useState } from 'react'
import './App.css'
import User from './components/user'
import Mod from './components/mod'
import Admin from './components/admin'

function App() {
  const [page, setPage] = useState<string>("user")
  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className='mx-3 my-2 text-center'>Téma lista</h1>
        </div>
        <div className="d-flex flex-nowrap gap-2 justify-content-center my-2 mx-3 w-auto">
          <button className={`btn ${page === "user" ? "btn-secondary" : "btn-primary"}`} onClick={() => setPage("user")}>User</button>
          <button className={`btn ${page === "mod" ? "btn-secondary" : "btn-warning"}`} onClick={() => setPage("mod")}>Mod</button>
          <button className={`btn ${page === "admin" ? "btn-secondary" : "btn-danger"}`} onClick={() => setPage("admin")}>Admin</button>
        </div>
        <div className="row">
          <div className="row">
            {page === "user" && <User />}
            {page === "mod" && <Mod />}
            {page === "admin" && <Admin />}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
