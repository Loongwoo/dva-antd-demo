import React from 'react';
import style from '../styles/home-page.less';
import { connect } from 'dva';

class Home extends React.Component {
  render() {
    return (
      <div className={ style.welcome }>
        Welcome
      </div>
    );
  }
}

export default connect()(Home);