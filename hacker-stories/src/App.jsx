import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') || 'React'
  );

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

    localStorage.setItem('search', event.target.value);
  };

  const storiesMatchingSearchTerm = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
  return (
  <div>
    <h1>My Hackier<sub>[sic]</sub> Stories</h1>

    <Search onSearch={handleSearch} searchTerm={searchTerm} />
    <hr />
    Some titles are: 
    <List list={storiesMatchingSearchTerm} />
  </div>
  );
};

const Search = ({searchTerm, onSearch}) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={searchTerm} onChange={onSearch}></input>
  </div>
);

const List = ({list}) => (
  <ul>
    {list.map((listItem) => (
      <Item key={listItem.objectID} listItem={listItem} />
    ))}
  </ul>
);

const Item = ({listItem}) => (
  <li>
  <table>
   <thead>
      <tr>
        <th colSpan={2}>
          <a href={listItem.url}>{listItem.title}</a>
        </th>
      </tr>
    </thead>
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
);

export default App;
