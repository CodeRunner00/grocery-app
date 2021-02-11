import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import axios from 'axios';


export default function(props) {
  const { setSelectedList, setAllLists, allLists, setItemView } = props;

  const handleListClick = (currentList) => {
    const resetLists = allLists.map((list) =>{
     list.title === currentList.title ? list.current = true : list.current = false;
      console.log('set a new current list');
      return list;
    });
    setAllLists(resetLists);
    setSelectedList(currentList);
    setItemView(true);
};

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

  return (
    <React.Fragment>
      <ParentListContainer>
        {allLists.map(list => <ListContainers><ListTitle selected={list.current}><span onClick={() => handleListClick(list)}>{list.title}</span><img src="https://img.icons8.com/metro/26/000000/trash.png" className='trash' onClick={() => deleteList(list)}/></ListTitle></ListContainers>)}
        {allLists.length === 0 && <div className="no-lists">There are no created lists!</div>}
      </ParentListContainer> 
    </React.Fragment>
  );
};


const ListTitle = styled.h3`
  .trash {
    display: inline-block;
  }
`;

const ParentListContainer = styled.div`
  position: relative;
  height: 85vh;
  background: #f4f4f4;
  .no-lists {
    padding-top: 25px;
    width: 80%;
    text-align: center;
    font-size: 24px;
    margin: 0 auto;
  }
`;



const ListContainers = styled.div`
  display: inline-block;
  width: 50%;
  justify-content: center;
  height: 125px;
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
