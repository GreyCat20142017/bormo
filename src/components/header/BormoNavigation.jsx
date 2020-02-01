import React from 'react';
import {withRouter} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';

import {menuItems} from './menuItems';
import BormoIcon from '../icon/BormoIcon';

class BormoNavigation extends React.Component {

  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({value});
    this.props.history.push(menuItems[value]['href'] || '/');
  };

  render() {
    const {value} = this.state;
    const {currentRoute} = this.props;
    return (
      <BottomNavigation style={{backgroundColor: 'transparent'}}
                        value={value}
                        onChange={this.handleChange}
                        showLabels color='inherit'>

        {menuItems.map((item, ind) => (
          <BottomNavigationAction key={ind} icon={<BormoIcon icon={item['icon']}/>}
                                  label={item['label']} title={item['title']}
                                  style={{color: (currentRoute === item['href']) ? 'orangered' : 'white'}}
          />))
        }

      </BottomNavigation>
    );
  }
};

export default withRouter(BormoNavigation);
