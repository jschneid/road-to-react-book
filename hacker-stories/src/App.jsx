import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stories = [
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const storiesMatchingSearchTerm = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
  return (
  <div>
    <h1>My Hackier<sub>[sic]</sub> Stories</h1>
    <p>
      To run this, from the hacker-stories directory, run:
    </p>
    <p>
      <code>npm run dev</code>
    </p>
    <Search onSearch={handleSearch} />
    <hr />
    Some titles are: 
    <List list={storiesMatchingSearchTerm} />
  </div>
  );
};

const Search = (props) => {
  const handleChange = (event) => {
    props.onSearch(event);
  }

  return (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" onChange={handleChange}></input>
  </div>
  );
};

const List = (props) => (
  <ul>
    {props.list.map((listItem) => (
      <Item key={listItem.objectID} listItem={listItem} />
    ))}
  </ul>
);

const Item = (props) => (
  <li>
  <table>
   <thead>
      <tr>
        <th colSpan={2}>
          <a href={props.listItem.url}>{props.listItem.title}</a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Author</th>
        <td>{props.listItem.author}</td>
      </tr>
      <tr>
        <th># Comments</th>
        <td>{props.listItem.num_comments}</td>
      </tr>
      <tr>
        <th>Points</th>
        <td>{props.listItem.points}</td>
      </tr>
    </tbody>
  </table>
</li>
)

export default App;
