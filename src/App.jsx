import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import MainTheme from './MainTheme';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Content from './components/Content';
import BormoFooter from './components/BormoFooter';
import BormoHeader from './components/BormoHeader';
import BormoAside from './components/BormoAside';

import Main from './pages/Main';
import Bormo from './pages/Bormo';
import Control from './pages/Control';
import ReverseControl from './pages/ReverseControl';

import NotFound from './pages/NotFound';


import './App.css';


const styles = theme => ({
  app: {
    height: '100vh',
    overflow: 'hidden'
  },
  
  paperMain: {
    height: '78vh',      
    overflowY: 'auto',
    display: 'flex',
    padding: '10px'
  },

  paperHeader: {
    height: '12vh',    
    minHeight: '50px',  
    overflowY: 'auto' 
  },

  paperFooter: {
    height: '10vh',    
    minHeight: '40px',
    overflowY: 'auto' 
  },

});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isAboutOpen: false, isConfigOpen: false, currentMode: null};
  }

  openAbout = () => {
    this.setState({isAboutOpen: true});
  }

  closeAbout = () => {
    this.setState({isAboutOpen: false});
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>    
          <CssBaseline />
          <MuiThemeProvider theme={MainTheme}>
          <div className={classes.app}>         
              
            <Paper className={classes.paperHeader}>
             <BormoHeader openModal={this.openModal} closeModal={this.closeModal} theme={MainTheme}/>             
            </Paper>
                          
            <Paper className={classes.paperMain}>              
              <BormoAside/>     
              <Content  className={classes.contentMain}>     
                <Switch>
                 <Route exact path='/' component={Main}/>
                 <Route path='/bormo' component={Bormo}/>
                 <Route path='/control' component={Control}/>
                 <Route path='/reversecontrol' component={ReverseControl}/>
                 <Route component={NotFound} />
               </Switch>
             </Content>   
            </Paper>  
          
            <Paper className={classes.paperFooter}>
              <BormoFooter/>
            </Paper>                 
                   
          </div>
            
        </MuiThemeProvider>
       </React.Fragment>
    );
  }
}


export default withStyles(styles)(withRouter(App));

