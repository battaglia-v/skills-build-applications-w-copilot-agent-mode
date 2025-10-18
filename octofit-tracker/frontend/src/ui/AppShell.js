import React from 'react'

export default function AppShell({children}){
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img src="/octofitapp-small.png" alt="logo" className="me-2" style={{width:36,height:36}} />
              <div>
                <div className="fw-bold mb-0">OctoFit</div>
                <small className="text-muted">Tracker</small>
              </div>
            </a>

            <div className="collapse navbar-collapse">
              <form className="d-flex ms-auto my-2 my-lg-0" role="search">
                <input className="form-control me-2" type="search" placeholder="Search tags, creators..." aria-label="Search" />
                <button className="btn btn-outline-primary" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow-1 bg-light">
        <div className="container py-4">
          {children}
        </div>
      </main>

      <footer className="mt-auto bg-white border-top">
        <div className="container py-3 d-flex justify-content-center gap-4">
          <a href="#" className="text-muted">Home</a>
          <a href="#" className="text-muted">Explore</a>
          <a href="#" className="btn btn-primary text-white">Create</a>
          <a href="#" className="text-muted">Inbox</a>
          <a href="#" className="text-muted">Profile</a>
        </div>
      </footer>
    </div>
  )
}
