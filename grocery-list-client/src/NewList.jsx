import React, { useState, useContext } from 'react';
// import Item from './Item.jsx';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import ApiContext from './ApiContext';
import Header from './HeaderNav';
export default function NewList(props) {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const { userId, isLoggedIn, setRedirect } = props;

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
  const removeItem = (index, event) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    console.log('updated items ', updatedItems);

    setItems(updatedItems);
    event.preventDefault();
  }
  let history = useHistory();
  const api = useContext(ApiContext);
  const submitList = (event) => {
    console.log('in submit list');
    let req = {
      title: title,
      items: items,
      userId: userId 
    };
    axios.post(api + '/lists/new', req)
    .then((response) => {
    // handle success
    console.log(response);
    history.push('/');
   })
  .catch((error) => {
    // handle error
    console.log(error);
  });
    setValue('');
    event.preventDefault();
  }

return (
  <PageWrapper className="page-component">
  {isLoggedIn ? (
    <React.Fragment>
    <Header setRedirect={setRedirect} />
    <ListWrapper>
    <h1 style={{textAlign: 'center', marginTop: '0px', paddingTop: '15px'}}>Add grocery items</h1>
    <FormWrapper>
      <form>
        <InputWrapper>
          <label>
            <input
              type='text'
              value={title} 
              onChange={handleTitle}
              placeholder="Title"
            />
          </label>
        </InputWrapper>
        <InputWrapper>
          <label>
            <input
              type='text'
              value={value} 
              onChange={handleChange}
              placeholder="Add an item"
            />
          </label>
          <button onClick={addItem}>+</button>
        </InputWrapper>
        </form>
      </FormWrapper>  
    {items.map((item, i) => {
      return <div className="list-item-wrapper"><ListItem index={i} key={i}><span>{item}</span></ListItem><button className="remove-item" onClick={(event) => removeItem(i, event)}>-</button></div>
    })}
    <div className="submit-wrapper"><button className="submit-items" onClick={submitList}>Submit Items</button></div>  </ListWrapper> </React.Fragment>) : <Redirect to="/login" /> }
  </PageWrapper>
);

}

const PageWrapper = styled.div`
  .list-item-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5%;
  }
  .remove-item {
    height: 50px;
    width: 70px;
    background: darkred;
    color: white;
  }
  .submit-items {
    margin-top: 10px;
    padding: 15px 7px;
    background-color: darkgreen;
    color: white;
    border-radius: 7px;
    margin-right: 30px;
    font-size: 21px;
  }
  .submit-wrapper {
    width: 100%;
    text-align: right;
    margin-right: 10%;
  }
`;

const FormWrapper = styled.div`
  padding-left: 14%;
  padding-bottom: 8%;
  text-align: left;
  input[type="submit"] {
    visibility: hidden;
  }
  ${'' /* span {
    color: lightgreen;
  } */}

  input {
    border-radius: 10px;
    font-size: 20px;
  }

  button {
    color: white;
    font-size: 35px;
    background: green;
    margin-left: 10px;
    border-radius: 5px;
    padding: 2px 15px;
  }
`;

const InputWrapper = styled.div`
display: flex;
align-items: center;
  padding: 4% 0;
`;

const ListItem = styled.div`
  width: 75%;
  height: 100%;
  background-color: azure;
  border-radius: 5px;
  margin: 2% auto;
  span {
    font-size: 24px;
  }
`;

const ListWrapper = styled.div`
  position: relative;
  height: 85vh;
  background: #f4f4f4;
`;