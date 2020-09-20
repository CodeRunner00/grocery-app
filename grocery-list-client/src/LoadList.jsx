import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

export default function(props) {

  const [lists, setLists] = useState([]);
  const [allLists, setAllLists] = useState([{title: '', items: [] }]);
  // const [currentItems, setCurrentItems] = useState([]);
  const [selectedList, setSelectedList] = useState({title: '', items: [] });

  const { isLoggedIn, user } = props;

  useEffect(() => {
    // Update the document title using the browser API
    axios.post('http://localhost:3005/lists/load', { userId: user })
    .then((response) => {
      // handle success
      console.log(response);
      // setAllLists(response.data.allItems);
      // let allItems = [];
      let mutatedListData = response.data.allItems;
      mutatedListData.forEach((list) => {
          list.current = false;
          list.items.forEach(i => {
          i.checked = false;
          return i;
        });
      });
      // console.log('mutatedItems ', allItems);
      setAllLists(mutatedListData);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
  
  }, []);

  const handleListClick = (currentList) => {
      const resetLists = allLists.map((list) =>{
       list.title === currentList.title ? list.current = true : list.current = false;
        console.log('set a new current list');
        return list;
      });
      setAllLists(resetLists);
      setSelectedList(currentList);
  }

  const deleteList = async (deletedList) => {
    const updatedLists= [];
    allLists.forEach((list) => {
      if(deletedList.id !== list.id) updatedLists.push(list);
      return list;
    });
    console.log('updatedLIsts ', updatedLists);
    setAllLists(updatedLists);
    console.log('about to send dletedList ', deletedList);
    const deletedLists = await axios.post('http://localhost:3005/lists/delete', deletedList)

    console.log('deletedLIsts ', deletedLists);

  }

  const handleCheck = (id) => {
    return function() {
      const toggleStrikedItems = selectedList.items.map((item) =>{
        if (item.id === id) item.checked = !item.checked;
        console.log('here we go');
        return item;
      });
      console.log('selectedLIsts ', )
      setSelectedList({title: selectedList.title, items: toggleStrikedItems});
    }
  }

  return (
    isLoggedIn ?
    ( <div>
      <h1>We trying to load some lists</h1>
      {/* {lists.map((list, i) => {
        return <h3 key={i} onClick={()=>setCurrentList(list.list)}>{list.title}</h3>
      })} */}
      <ParentListContainer>
        {allLists.map(list => <ListContainers><ListTitle selected={list.current}><span onClick={() => handleListClick(list)}>{list.title}</span><img src="https://img.icons8.com/metro/26/000000/trash.png" className='trash' onClick={() => deleteList(list)}/></ListTitle></ListContainers>)}
      </ParentListContainer>  
      {/* className={`${strike ? 'striked' : 'notStriked'}`} */}
      <ULParent>
        {selectedList.items.map((item, i) => {
          return <ListItem key={i} strike={item.checked} onClick={handleCheck(item.id)}><span>{i+1}. {item.val}</span></ListItem>
        })}
      </ULParent>
    </div> ) : (
      <Redirect to="/register" />
    )
  );
}

const addStrike = () => css`
  text-decoration: line-through;
`;

const ULParent = styled.ul`
  padding: 5%;
  margin: 0 auto;
`;

const highlightCurrent = () => css`
  color: red;
`;

const ListTitle = styled.h3`
  ${props => props.selected && highlightCurrent()};
  .trash {
    display: inline-block;
  }
`;

const changeFontSize = () => css`
  font-size: 18px;
`;

const ListItem = styled.div`
  width: 75%;
  height: 100%;
  background-color: lightsalmon;
  border-radius: 5px;
  margin: 2% auto;
  ${props => props.strike && addStrike()}
  span {
    font-size: 24px;
    ${props => props.strike && changeFontSize()}
  }
`;

const ParentListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;



const ListContainers = styled.div`
  width: 50%;
  justify-content: center;
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .trash {
    display: inline-block;
    margin-left: 5%;
  }
`