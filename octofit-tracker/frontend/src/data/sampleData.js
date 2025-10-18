// sampleData.js - local sample datasets to populate UI when API is empty
export const activities = [
  { id: 1, title: 'Morning Run', type: 'run', start_time: '2025-10-18T07:00:00Z', distance_km: 5.2, duration: '00:28:15' },
  { id: 2, title: 'Lunchtime Ride', type: 'bike', start_time: '2025-10-17T12:30:00Z', distance_km: 12.4, duration: '00:45:00' }
]

export const users = [
  { id: 'u1', username: 'alice', email: 'alice@example.com' },
  { id: 'u2', username: 'bob', email: 'bob@example.com' }
]

export const teams = [
  { id: 't1', name: 'OctoRunners', members: ['u1','u2'] },
  { id: 't2', name: 'CycleSquad', members: [] }
]

export const workouts = [
  { id: 'w1', title: '5K Tempo', duration: '00:25:00', notes: 'Warm up then tempo pace' },
  { id: 'w2', title: 'Hills', duration: '00:40:00', notes: '6 repeats' }
]

export const leaderboard = [
  { id: 'u1', username: 'alice', score: 420 },
  { id: 'u2', username: 'bob', score: 375 }
]

export default { activities, users, teams, workouts, leaderboard }
