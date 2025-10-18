import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

export default function App({ getApiBase }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<div className="container py-5"><h1>OctoFit Tracker</h1></div>} />
        <Route path="/activities" element={<Activities getApiBase={getApiBase} />} />
        <Route path="/workouts" element={<Workouts getApiBase={getApiBase} />} />
        <Route path="/teams" element={<Teams getApiBase={getApiBase} />} />
        <Route path="/users" element={<Users getApiBase={getApiBase} />} />
        <Route path="/leaderboard" element={<Leaderboard getApiBase={getApiBase} />} />
      </Routes>
    </div>
  )
}
