import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

function HeaderNav(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     got: false
  //   };
  // }
  return (
   <div>
    <p>Welcome!</p>
    <Button variant="contained" color="primary">
     Create a List
    </Button>
    <Button variant="contained" color="primary">
      Load a List
    </Button>
  </div>
  );
}

export default HeaderNav;
