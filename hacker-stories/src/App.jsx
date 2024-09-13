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

const App = () => (
  <div>
    <h1>My Hackier<sub>[sic]</sub> Stories</h1>
    <p>
      To run this, from the hacker-stories directory, run:
    </p>
    <p>
      <code>npm run dev</code>
    </p>
    <Search />
    <hr />
    Some titles are: 
    <List />
  </div>
);

const Search = () => {
  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
  }

  return (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" onChange={handleChange}></input>
  </div>
  );
};

const List = () => (
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
);

export default App;
