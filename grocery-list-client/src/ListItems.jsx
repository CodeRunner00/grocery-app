import React, {useState, useContext} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import axios from 'axios';
import ApiContext from './ApiContext';

export default function(props) {
  const api = useContext(ApiContext);
  const { setSelectedList, selectedList } = props;
  const [newItemVal, setNewItemVal] = useState('');
  // const handleRemoveItem = (id, index) => {
  //   return function() {
  //     const newList = {};
  //     newList.items =[...selectedList.items];
  //     newList.title = selectedList.title;
  //     newList.id = selectedList.id;
  //     newList.items.splice(index, 1);
  //     setSelectedList(newList);
  //   }
  // };

  const handleStrikedItems = (i) => {
    return () => {
      const toggleStrikedItems = selectedList.items.map((item, index) => { // todo remove item from databse
        if (index === i) item.checked = !item.checked;
        return item;
      });
      setSelectedList({title: selectedList.title, items: toggleStrikedItems});
    };
  };

  const handleInputValue = (e) => {
    setNewItemVal(e.target.value);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const newList = {};
    newList.title = selectedList.title;
    const { items } = selectedList;
    const newItems = [...items];
    newList.items = newItems;
    newList.items.push({val: newItemVal});
    setSelectedList(newList);
    axios.post(api + '/list/newitem', { listParentId: selectedList.id, item: newItemVal}).then((res) => {
      console.log('success creating new item!');
    }).catch((e) => {
      console.log("error creaeting new itemn");
    });
  };


  return (
    <ListWrapper>
      <ULParent>
        <h2>{selectedList.title}</h2>
        {selectedList.items.map((item, i) => {
          return <ListItem key={i} strike={item.checked}><div className="item-1" onClick={handleStrikedItems(i)}>{item.val}</div></ListItem>
        })}
        <ListItem addItem><input className="item-1 add" value={newItemVal} onChange={handleInputValue} placeholder="Add an item"></input><button className="add-item item-2" onClick={handleAddItem}>+</button></ListItem>
      </ULParent>  
    </ListWrapper>
  );
};


const ULParent = styled.ul`
  padding: 5%;
  margin: 0 auto;
  h2 {
    text-align: center;
  }
  .remove-item {
    height: 50px;
    width: 70px;
    background: darkred;
    color: white;
  }
`;

const ListWrapper = styled.div`
  position: relative;
  height: 85vh;
  background: #f4f4f4;
`;

const ListItem = styled.div`
  width: 95%;
  height: 100%;
  background-color: azure;
  border-radius: 5px;
  margin: 6% auto;
  display: flex;
  align-items: center;
  ${props => props.strike && addStrike()}
  ${props => props.addItem && css`
    background: grey;
  `}
  span {
    font-size: 24px;
    ${props => props.strike && changeFontSize()}
  }
  .item-1, .item-2 {
    justify-content: center;
  }
  .item-1 {
    width: 75%;
    font-size: 25px;
  }
  .item-2 {
    width: 25%;
    font-size: 35px;
  }
  .add-item {
    height: 50px;
    width: 82px;
    background: green;
    color: white;
  }
`;

const addStrike = () => css`
  text-decoration: line-through;
`;

const changeFontSize = () => css`
  font-size: 18px;
`;