import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const title = 'Road to React';

const welcome = {
  greeting: 'Salutations',
  title: 'React',
};

const terranUnits = ['marine', 'firebat', 'vulture', 'seige tank', 'wraith'];

function getTitle(title) {
  return title;
}

function App() {
  return (
    <div>
      <h1>{welcome.greeting}, {getTitle(welcome.title)}</h1>

      <p>Some Terran units are:{' '}
        {terranUnits.map((unit) => `${unit}, `)}
      </p>

      <label htmlFor="myLabel">Enter the value: </label>
      <input type="text" id="myLabel" />
    </div>
  )
}

export default App;
