import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const list = [
  {
    title: 'React', 
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  },
  {
    title: 'Aggro Magnet Games',
    url: 'https://aggromagnetgames.com/',
    author: 'Jon Schneider',
    num_comments: 0,
    points: 0,
    objectID: 2
  }
];

function App() {
  return (
    <div>
      <h1>My Hackier<sub>[sic]</sub> Stories</h1>
      <Search />
      <hr />
      Some titles are: 
      <List />
    </div>
  )
}

function Search() {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text"></input>
    </div>
  )

}

function List() {
  return (
    <ul>
    {list.map((listItem) => 
      <li key={listItem.objectID}>
        <a href={listItem.url}>{listItem.title}</a>
        <table>
          <tbody>
            <tr>
              <th>Author</th>
              <td>{listItem.author}</td>
            </tr>
            <tr>
              <th># Comments</th>
              <td>{listItem.num_comments}</td>
            </tr>
            <tr>
              <th>Points</th>
              <td>{listItem.points}</td>
            </tr>
          </tbody>
        </table>
      </li>
      )
    }
  </ul>
  )

}

export default App;
