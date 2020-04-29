import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

export default function(props) {

  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState('');
  const [currentItems, setCurrentItems] = useState([]);

  const { isLoggedIn } = props;

  useEffect(() => {
    // Update the document title using the browser API
    axios.get('http://localhost:3005/lists/load')
    .then((response) => {
      // handle success
      console.log(response);
      setCurrentList(response.data.list.title);
      const mutatedItems = response.data.items.map((i) => {
        i.checked = false;
        return i;
      });
      setCurrentItems(mutatedItems);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
  
  }, []);

  const handleCheck = (id) => {
    return function() {
      const toggleStrikedItems = currentItems.map((item) =>{
        if (item.id === id) item.checked = !item.checked;
        console.log('here we go');
        return item;
      });
      setCurrentItems(toggleStrikedItems);
    }
  }

  return (
    isLoggedIn ?
    ( <div>
      <h1>We trying to load some lists</h1>
      {/* {lists.map((list, i) => {
        return <h3 key={i} onClick={()=>setCurrentList(list.list)}>{list.title}</h3>
      })} */}
      <h3>{currentList}</h3>
      {/* className={`${strike ? 'striked' : 'notStriked'}`} */}
      <ul>
        {currentItems.map((item, i) => {
          return <ListItem key={i} strike={item.checked} onClick={handleCheck(item.id)}>{item.val}</ListItem>
        })}
      </ul>
    </div> ) : (
      <Redirect to="/register" />
    )
  );
}

const addStrike = () => css`
  text-decoration: line-through;
`;

const ListItem = styled.div`
  ${props => props.strike && addStrike()}
`;