import React, { useEffect, useState } from 'react'
import { teams as sampleTeams } from '../data/sampleData'

function buildEndpoint(getApiBase, path) {
  const base = typeof getApiBase === 'function' ? getApiBase() : (process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api` : 'http://localhost:8000/api')
  return `${base}/${path}/`.replace(/([^:])\/\//g, '$1/')
}

export default function Teams({ getApiBase }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const endpoint = buildEndpoint(getApiBase, 'teams')
    console.log('[Teams] Fetching from', endpoint)
    fetch(endpoint)
      .then(r => r.json())
      .then(data => {
        console.log('[Teams] Fetched data', data)
        const results = Array.isArray(data) ? data : (data && data.results) ? data.results : []
        setItems(results.length ? results : sampleTeams)
      })
      .catch(err => console.error('[Teams] Fetch error', err))
  }, [getApiBase])

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title h4 mb-3">Teams</h2>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-warning">
                <tr><th style={{width:'6%'}}>#</th><th>Team</th><th>Members</th><th>Details</th></tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={it.id || idx}>
                    <td>{idx+1}</td>
                    <td>{it.name || it.title || `Team ${idx+1}`}</td>
                    <td className="small">{(it.members && it.members.length) ? it.members.length : it.size || '—'}</td>
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
