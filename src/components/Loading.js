import React, { Component } from 'react';
import loading from './loading.gif';
export class Loading extends Component {
  render() {
    const loadingContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh', // Full viewport height
      };
    return (
      <div className='text-center' style={loadingContainerStyle}>
        <img src={loading} alt="loading" />
      </div>
    );
  }
}

export default Loading;
