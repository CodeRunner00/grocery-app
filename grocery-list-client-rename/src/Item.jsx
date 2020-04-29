import React, { useState } from 'react';

function Item(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     got: false
  //   };
  // }
  const [bought, setBought] = useState(false);

  const hasBought = () => { 
    setBought(!bought);
    console.log('set with hooks');
  }

  let style = {
    textDecoration: bought ? "line-through" : "none",
  };
  return (
    <div style={style} onClick={hasBought}>{props.item}</div>
  );
}

export default Item;