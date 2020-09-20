import React, { useState } from 'react';
import Item from './Item.jsx';
import axios from 'axios';
import styled from '@emotion/styled';

export default function NewList(props) {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const { userId } = props;

  const handleTitle = (event) => {
    setTitle(event.target.value);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const addItem = (event) => {
    setItems([...items, value]);
    setValue('');
    event.preventDefault();
  }

  const submitList = (event) => {
    console.log('in submit list');
    let req = {
      title: title,
      items: items,
      userId: userId 
    };
    
    axios.post('http://localhost:3005/lists/new', req)
    .then((response) => {
    // handle success
    console.log(response);
   })
  .catch((error) => {
    // handle error
    console.log(error);
  });
    setValue('');
    event.preventDefault();
  }

return (
  <div className="page-component">
  <h1>Add grocery items</h1>
    <FormWrapper>
      <form onSubmit={addItem}>
        <InputWrapper>
          <label>Title:
            <input
              type='text'
              value={title} 
              onChange={handleTitle}
            />
          </label>
        </InputWrapper>
        <InputWrapper>
          <label>Add an item:
            <input
              type='text'
              value={value} 
              onChange={handleChange}
            />
          </label>
          <input type='submit' />
        </InputWrapper>
        </form>
      </FormWrapper>  
    {items.map((item, i) => {
      return <Item item={item} key={i} />
    })}
    <form onSubmit={submitList}>
      <p>Submit the list</p>
      <input type='submit' />
    </form>
  </div>
);

}

const FormWrapper = styled.div`
  padding-left: 20%;
  text-align: left;
`;

const InputWrapper = styled.div`
  padding: 10% 0;
`;