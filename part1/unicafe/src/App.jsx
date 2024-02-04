import {useState} from 'react'

const Header = (props) => {
  return (
    <h1>{props.heading}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Stats = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header heading="give feedback" />
      <Button text='good' onClick={() => setGood(good+1)} />
      <Button text='neutral' onClick={() => setNeutral(neutral+1)} />
      <Button text='bad' onClick={() => setBad(bad+1)} />
      <Header heading="statistics" />
      <Stats text='good' value={good} />
      <Stats text='neutral' value={neutral} />
      <Stats text='bad' value={bad} />
    </div>
  )
}

export default App
