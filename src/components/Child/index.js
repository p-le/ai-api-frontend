import React from 'react';

const Child = ({ match }) => (
  <div>
    <h3>Id: {match.params.id} </h3>
  </div>
);

export default Child;