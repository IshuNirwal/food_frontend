import React, { useEffect, useState } from 'react';
import '../styles/menu.css';
import { useNavigate } from 'react-router-dom';

const MenuList = () => {
    const navigate = useNavigate();
    const [filteredMenus, setFilteredMenus] = useState([]);

    useEffect(() => {
            fetch('http://127.0.0.1:8000/api/user/menu/')
                .then(response => response.json())
                .then(data => setFilteredMenus(data))
                .catch(error => console.error('Error fetching menus:', error));
        
    }, []);

    return (
        <section className='menu' id='menu'>
            <h1 className='heading'>
                <span>our</span>menu
            </h1>
            <div className='box-container'>
                {filteredMenus.map((item, index) => (
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

export default MenuList;
