import React, { useEffect, useState } from 'react'
import { activities as sampleActivities } from '../data/sampleData'

function buildEndpoint(getApiBase, path) {
  const base = typeof getApiBase === 'function' ? getApiBase() : (process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api` : 'http://localhost:8000/api')
  return `${base}/${path}/`.replace(/([^:])\/\//g, '$1/')
}

export default function Activities({ getApiBase }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const endpoint = buildEndpoint(getApiBase, 'activities')
    console.log('[Activities] Fetching from', endpoint)
    fetch(endpoint)
      .then(r => r.json())
      .then(data => {
        console.log('[Activities] Fetched data', data)
        const results = Array.isArray(data) ? data : (data && data.results) ? data.results : []
        setItems(results.length ? results : sampleActivities)
      })
      .catch(err => console.error('[Activities] Fetch error', err))
  }, [getApiBase])

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title h4 mb-3">Activities</h2>
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead className="table-primary">
                <tr><th style={{width: '4%'}}>#</th><th>Details</th></tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={it.id || idx}>
                    <td>{idx+1}</td>
                    <td>
                      <div className="fw-semibold">{it.title || it.type || `Activity ${idx+1}`}</div>
                      <div className="text-muted small">{it.start_time || it.created || ''}</div>
                      <pre className="mb-0 mt-1 small bg-light p-2 rounded">{JSON.stringify(it, null, 2)}</pre>
                    </td>
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
