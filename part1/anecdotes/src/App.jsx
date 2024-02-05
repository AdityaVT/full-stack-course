import { useState } from 'react'

const Header = ({heading}) => {
  return (
    <h1>{heading}</h1>
  )
}

const Button  = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Anecdote = ({anecdote, votes}) => {
  return (
    <p>
      {anecdote}<br />
      {'has ' + votes + ' votes'}
    </p>
  )
}

const TopAnecdote = ({anecdotes, points}) => {
  const mostVotedAnecdoteIndex = (points) => {
    return points.indexOf(Math.max(...points))
  }

  if (Math.max(...points) == 0) {
    return (<p>No votes have been cast yet. Be the first to cast your vote!</p>)
  }

  return (
    <Anecdote anecdote={anecdotes[mostVotedAnecdoteIndex(points)]} votes={points[mostVotedAnecdoteIndex(points)]} />
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const randomIndex = (max) => {
    console.log(Math.floor(Math.random() * max))
    return Math.floor(Math.random() * max)
  }

  const updatePoints = (points, selected) => {
    console.log(points)
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const resetPoints = (points) => {
    setPoints(points.map((num) => num*0))
  }

  return (
    <div>
      <Header heading='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <div>
        <Button text='vote' onClick={() => updatePoints(points, selected)} />
        <Button text='next anecdote' onClick={() => setSelected(randomIndex(anecdotes.length))} />
      </div>
      <Header heading='Anecdote with most votes' />
      <TopAnecdote anecdotes={anecdotes} points={points} />
      <Button text='reset votes' onClick={() => resetPoints(points)} />
    </div>
  )
}

export default App
