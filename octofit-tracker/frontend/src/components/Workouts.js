import React, { useEffect, useState } from 'react'
import SimpleModal from '../ui/SimpleModal'
import { workouts as sampleWorkouts } from '../data/sampleData'

function buildEndpoint(getApiBase, path) {
  const base = typeof getApiBase === 'function' ? getApiBase() : (process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api` : 'http://localhost:8000/api')
  return `${base}/${path}/`.replace(/([^:])\/\//g, '$1/')
}

export default function Workouts({ getApiBase }) {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  function fetchData() {
    const endpoint = buildEndpoint(getApiBase, 'workouts')
    fetch(endpoint)
      .then(r => r.json())
      .then(data => setItems((Array.isArray(data) ? data : (data && data.results) ? data.results : []).length ? (Array.isArray(data) ? data : (data && data.results) ? data.results : []) : sampleWorkouts))
      .catch(err => console.error(err))
  }

  useEffect(() => { fetchData() }, [getApiBase])

  const visible = items.filter(it => !filter || JSON.stringify(it).toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Workouts</h2>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={fetchData}>Refresh</button>
        </div>
      </div>

      <div className="mb-3">
        <input className="form-control" placeholder="Search workouts..." value={filter} onChange={e => setFilter(e.target.value)} />
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light"><tr><th>#</th><th>Workout</th><th>Duration</th><th></th></tr></thead>
              <tbody>
                {visible.map((it, idx) => (
                  <tr key={it.id || idx}>
                    <td>{idx+1}</td>
                    <td className="fw-semibold">{it.title || it.name || `Workout ${idx+1}`}</td>
                    <td className="text-muted small">{it.duration ?? it.length ?? '-'}</td>
                    <td className="text-end"><button className="btn btn-sm btn-primary" onClick={() => setSelected(it)}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SimpleModal open={!!selected} onClose={() => setSelected(null)} title="Workout Details">
        <pre className="small">{selected ? JSON.stringify(selected, null, 2) : JSON.stringify(items, null, 2)}</pre>
      </SimpleModal>
    </div>
  )
}
