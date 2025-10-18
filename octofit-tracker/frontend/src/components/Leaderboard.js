import React, { useEffect, useState } from 'react'
import { leaderboard as sampleLeaderboard } from '../data/sampleData'

function buildEndpoint(getApiBase, path) {
  const base = typeof getApiBase === 'function' ? getApiBase() : (process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api` : 'http://localhost:8000/api')
  return `${base}/${path}/`.replace(/([^:])\/\//g, '$1/')
}

export default function Leaderboard({ getApiBase }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const endpoint = buildEndpoint(getApiBase, 'leaderboard')
    console.log('[Leaderboard] Fetching from', endpoint)
    fetch(endpoint)
      .then(r => r.json())
      .then(data => {
        console.log('[Leaderboard] Fetched data', data)
        const results = Array.isArray(data) ? data : (data && data.results) ? data.results : []
        setItems(results.length ? results : sampleLeaderboard)
      })
      .catch(err => {
        console.error('[Leaderboard] Fetch error', err)
        setItems(sampleLeaderboard)
      })
  }, [getApiBase])

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title h4 mb-3">Leaderboard</h2>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-success">
                <tr><th style={{width:'6%'}}>#</th><th>Player</th><th>Score</th><th>Details</th></tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={it.id || idx}>
                    <td>{idx+1}</td>
                    <td>{it.username || it.name || it.id}</td>
                    <td>{it.score ?? it.points ?? '-'}</td>
                    <td className="text-muted small">{JSON.stringify(it)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
