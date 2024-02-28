import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/search.css';
import AuthContext from './AuthContext';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [filteredMenus, setFilteredMenus] = useState([]);

  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    if (searchQuery) {
      const encodedSearchQuery = encodeURIComponent(searchQuery);
      fetch(`http://127.0.0.1:8000/api/user/search/${encodedSearchQuery}/`, {
        headers: {
          Authorization: `Bearer ${authTokens.token.access}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        const extractedData = data.data; 
        setFilteredMenus(extractedData);
      })
      .catch(error => console.error('Error fetching menus:', error));

    }
  }, [searchQuery, authTokens]);

  return (
    <section className='menu' id='menu'>
      <h1 className='heading'>
        <span>search</span>items
      </h1>
      <div className='box-container'>
        {filteredMenus.map((item,index) => (
          <div className='box' onClick={() => navigate(`/item/${item.id}`)} key={item.id}>
            <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.title} />
            <h3>{item.title}</h3>
            <div className='price'>
              RS <span>{item.price}</span><br />
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Search;
