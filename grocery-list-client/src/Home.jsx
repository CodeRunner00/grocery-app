import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import ApiContext from './ApiContext';
import Header from './HeaderNav';
import AllItems from './ListItems';
import AllLists from './ListAll';
export default function(props) {

  const [itemView, setItemView] = useState(false);
  const [allLists, setAllLists] = useState([{title: '', items: [] }]);
  // const [currentItems, setCurrentItems] = useState([]);
  const [selectedList, setSelectedList] = useState({title: '', items: [] });

  const { isLoggedIn, user, setRedirect } = props;
  const api = useContext(ApiContext);

  const updateLists = () => {
    axios.post(api + '/lists/load', { userId: user })
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
  }

  useEffect(() => {
    // Update the document title using the browser API
    updateLists();
  
  }, []);

  const handleListClick = (currentList) => {
      const resetLists = allLists.map((list) =>{
       list.title === currentList.title ? list.current = true : list.current = false;
        console.log('set a new current list');
        return list;
      });
      setAllLists(resetLists);
      setSelectedList(currentList);
      setItemView(true);
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
    const deletedLists = await axios.post(api + '/delete', deletedList)

    console.log('deletedLIsts ', deletedLists);

  }


  // const addItem = () => {
  //   return (
  //     <React.Fragment>
  //       <div>+</div>
  //     </React.Fragment>
  //   )
  // }

  return (
    isLoggedIn ?
    ( <div>
      <Header itemView={itemView} setItemView={setItemView} setRedirect={setRedirect} user={user} triggerUpdatedLists={updateLists} />
      {/* {lists.map((list, i) => {
        return <h3 key={i} onClick={()=>setCurrentList(list.list)}>{list.title}</h3>
      })} */}

      {!itemView && <AllLists setSelectedList={setSelectedList} selectedList={selectedList} setAllLists={setAllLists} allLists={allLists} setItemView={setItemView} />}
      
      {/* className={`${strike ? 'striked' : 'notStriked'}`} */}
      {/* {itemView && <ULParent>
        <h2>{selectedList.title}</h2>
        {selectedList.items.map((item, i) => {
          return <ListItem key={i} strike={item.checked} onClick={handleCheck(item.id)}><span>{i+1}. {item.val}</span></ListItem>
        })} */}
        {itemView && <AllItems setSelectedList={setSelectedList} selectedList={selectedList} />}
        {/* {selectedList.title !== '' && } */}
    </div> ) : (
      <Redirect to="/login" />
    )
  );
}




// const highlightCurrent = () => css`
//   color: red;
// `;

// const ListTitle = styled.h3`
//   ${props => props.selected && highlightCurrent()};
//   .trash {
//     display: inline-block;
//   }
// `;

// const ParentListContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `;



// const ListContainers = styled.div`
//   width: 50%;
//   justify-content: center;
//   h3 {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
//   .trash {
//     display: inline-block;
//     margin-left: 5%;
//   }
// `





// import React, { useState } from 'react';
// import LoadList from './LoadList.jsx';
// import NewList from './NewList.jsx';
// import { Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import {
//   BrowserRouter as Router,
//   Redirect,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
// import styled from '@emotion/styled';
// const useStyles = makeStyles({
//   root: {
//     background: '#702822',
//     border: 0,
//     borderRadius: 5,
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   },
// });



// const StyledWrapper = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   padding-top: 90px;
//   background-color: #d42900;
//   height: 100%;
//   width: 100%;
//   height: 400px;
//   max-width: 1400px;
//   max-height: 600px;
// `;

// const linkStyles = makeStyles({
//   root: {
//     textDecoration: 'none',
//     color: 'white'
//   },
// });
// // import { makeStyles } from '@material-ui/core/styles';

// export default function(props) {
//   console.log('here are the home props ', props);
//   const { user, isLoggedIn } = props;
//   const classes = useStyles();
//   const linkClasses = linkStyles();
//   return ( isLoggedIn ? 
//    ( <StyledWrapper>
//       <Button className={classes.root}><Link to="/create" className={linkClasses.root}>Create A list</Link> </Button><br></br>
//       <Button className={classes.root}><Link to="/load" className={linkClasses.root} onClick={() => console.log('clicked on load list from homepage!')}>Load Lists</Link></Button>

//       <Switch>
//         <Route path="/create">
//               <NewList user={user}/>
//             </Route>
//             <Route path="/load">
//               <LoadList user={user} />
//         </Route>
//       </Switch>
//     </StyledWrapper>) : <Redirect to="/register" />
//   );
// }