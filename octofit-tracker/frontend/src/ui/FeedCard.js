import React, { useState, useRef } from 'react'

export default function FeedCard({item, index}){
  const [liked, setLiked] = useState(false)
  const [heartPulse, setHeartPulse] = useState(false)
  const tapRef = useRef(0)

  function handleDoubleTap(){
    setLiked(true)
    setHeartPulse(true)
    setTimeout(()=>setHeartPulse(false), 700)
  }

  function onTap(){
    const now = Date.now()
    if(now - tapRef.current < 300){
      handleDoubleTap()
    }
    tapRef.current = now
  }

  return (
    <div className="card mb-3" onClick={onTap} style={{cursor: 'pointer'}}>
      <div className="row g-0 align-items-center">
        <div className="col-4 bg-dark text-white d-flex align-items-center justify-content-center" style={{minHeight:120}}>
          Media
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title mb-1">{item.title || 'Untitled'}</h5>
            <p className="card-text small text-muted mb-2">Creator • <span className="fw-semibold">{item.title || 'Unknown'}</span></p>
            <div className="d-flex gap-2">
              <button className={`btn btn-sm ${liked ? 'btn-danger' : 'btn-outline-secondary'}`} onClick={(e)=>{e.stopPropagation(); setLiked(s=>!s)}}>{liked ? 'Liked' : 'Like'}</button>
              <button className="btn btn-sm btn-outline-secondary">Comment</button>
              <button className="btn btn-sm btn-outline-secondary">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
