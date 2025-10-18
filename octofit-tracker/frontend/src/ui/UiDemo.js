import React from 'react'
import AppShell from './AppShell'
import FeedCard from './FeedCard'

const fake = Array.from({length:6}).map((_,i)=>({id:i,title:`Clip ${i+1}`}))

export default function UiDemo(){
  return (
    <AppShell>
      <div>
        {fake.map((it,idx)=> (
          <FeedCard key={it.id} item={it} index={idx} />
        ))}
      </div>
    </AppShell>
  )
}
