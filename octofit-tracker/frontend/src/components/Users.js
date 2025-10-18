import React, { useEffect, useState } from 'react'
import { users as sampleUsers } from '../data/sampleData'

function buildEndpoint(getApiBase, path) {
  const base = typeof getApiBase === 'function' ? getApiBase() : (process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api` : 'http://localhost:8000/api')
  return `${base}/${path}/`.replace(/([^:])\/\//g, '$1/')
}

export default function Users({ getApiBase }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const endpoint = buildEndpoint(getApiBase, 'users')
    console.log('[Users] Fetching from', endpoint)
    fetch(endpoint)
      .then(r => r.json())
      .then(data => {
        console.log('[Users] Fetched data', data)
        const results = Array.isArray(data) ? data : (data && data.results) ? data.results : []
        setItems(results.length ? results : sampleUsers)
      })
      .catch(err => console.error('[Users] Fetch error', err))
  }, [getApiBase])

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title h4 mb-3">Users</h2>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-info">
                <tr><th style={{width:'6%'}}>#</th><th>Name</th><th>Email</th><th>Details</th></tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={it.id || idx}>
                    <td>{idx+1}</td>
                    <td>{it.username || it.name || '—'}</td>
                    <td className="text-break small">{it.email || it.contact || '—'}</td>
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
