import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import APP from './App';
import Admin from './Admin'

class Irouter extends React.Component {
  render() {
    return(
      <Route>
      {/* 引入APP接纳任何组件 */}
        <APP>
          <Admin>
            <Switch>
              <Route></Route>
            </Switch>
          </Admin>
        </APP>
      </Route>
    )
  }
}

export default Irouter
