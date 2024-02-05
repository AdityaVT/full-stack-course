import {useState} from 'react'

const Header = ({heading}) => {
  return (
    <h1>{heading}</h1>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={good + neutral + bad} />
      <StatisticLine text='average' value={(good - bad)/(good+neutral+bad)} />
      <StatisticLine text='positive' value={(good*100)/(good+neutral+bad) + ' %'} />
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const reset = () => {
    setGood(0)
    setNeutral(0)
    setBad(0)
  }

  return (
    <div>
      <Header heading="give feedback" />
      <Button text='good' onClick={() => setGood(good+1)} />
      <Button text='neutral' onClick={() => setNeutral(neutral+1)} />
      <Button text='bad' onClick={() => setBad(bad+1)} />
      <div>
        <Button text='reset' onClick={reset} />
      </div>
      <Header heading="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
