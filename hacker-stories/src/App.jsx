import { useEffect, useReducer, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(
    localStorage.getItem(key) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const initialStories = [
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

const getAsyncStories = () => {
 return new Promise((resolve) => setTimeout(() => resolve({ data: { stories: initialStories } }), 1500));
};

const storiesReducer = (state, action) => { 
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return { ...state, isLoading: true, errorOccurred: false };
    case 'STORIES_FETCH_SUCCESS':
      return { ...state, isLoading: false, errorOccurred: false, data: action.payload };
    case 'STORIES_FETCH_FAILURE':
      return { ...state, isLoading: false, errorOccurred: true };
    case 'REMOVE_STORY':
      return { ...state, data: state.data.filter((story) => action.payload.objectID !== story.objectID) };
    default:
      throw new Error();
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [], isLoading: false, errorOccurred: false
  });

  useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    getAsyncStories().then((result) => {
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS', 
        payload: result.data.stories
      });
    })
    .catch(() => 
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const storiesMatchingSearchTerm = stories.data.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const handleRemoveStory = (story) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: story
    });
  };

  return (
  <div>
    <h1>My Hackier<sub>[sic]</sub> Stories</h1>

    <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={handleSearch}>
      <strong>Search:</strong>
    </InputWithLabel>
    <hr />

    {stories.errorOccurred && 
      <p>ERROR: AN ERROR OCCURRED.</p>
    }

    {!stories.errorOccurred && stories.isLoading &&
      <p>NOW LOADING STORIES. PLEASE STAND BY...</p>
    }

    {!stories.errorOccurred && !stories.isLoading && storiesMatchingSearchTerm.length <= 0 &&
      <p>NO MATCHING STORIES.</p>
    }

    {!stories.errorOccurred && !stories.isLoading && storiesMatchingSearchTerm.length > 0 &&
      <div>
      Some titles are: 
        <List list={storiesMatchingSearchTerm} onRemoveItem={handleRemoveStory} />
      </div>
    }
  </div>
  );
};

const InputWithLabel = ({ 
  id, 
  label, 
  value, 
  type = 'text', 
  isFocused,
  onInputChange, 
  children 
}) => (
  <>
    <label htmlFor={id}>{children}</label>
    {' '}
    <input 
      id={id} 
      type={type} 
      value={value} 
      autoFocus={isFocused}
      onChange={onInputChange}>
    </input>
  </>
);

const List = ({list, onRemoveItem}) => (
  <ul>
    {list.map((listItem) => (
      <Item key={listItem.objectID} listItem={listItem} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

const Item = ({listItem, onRemoveItem}) => (
  <li>
  <table>
   <thead>
      <tr>
        <th colSpan={3}>
          <a href={listItem.url}>{listItem.title}</a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Author</th>
        <td>{listItem.author}</td>
        <td><input type="button" value="🔥 BURNINATE" onClick={() => onRemoveItem(listItem)} /></td>
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
