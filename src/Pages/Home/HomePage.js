// @flow
import React from 'react';

export default class HomePage extends React.Component<{}> {
  render = () => (
    <div style={{justifyContent: 'center', display: 'flex'}}>
      <img src={require('./logo-idcra.png')} />
    </div>
  )
}