import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import ViewList from '@material-ui/icons/ViewList';
import Group from '@material-ui/icons/Group';
import Person from '@material-ui/icons/Person';
import Search from '@material-ui/icons/Search';
import Bookmark from '@material-ui/icons/Bookmark';

import SearchPages from './SearchPages.js';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    height:56,
    position: 'fixed',
    top: 'auto',
    bottom: 0,
  },
  tabs:{
    height:56
  },
  tab:{
    height:56
  },
  tabcontainer:{
    bottom:56,
    top: 'auto',
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 2,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor:'#FFC107'}} className={classes.appBar}>
          <Tabs
          className={classes.tabs}
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="#263238"
          fullWidth
          >
            <Tab className={classes.tab} icon={<ViewList />} />
            <Tab className={classes.tab} icon={<Group />} />
            <Tab className={classes.tab} icon={<Search />} />
            <Tab className={classes.tab} icon={<Bookmark />} />
            <Tab className={classes.tab} icon={<Person />} />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <TabContainer className={classes.tabcontainer} dir={theme.direction}>噢噢...本功能目前開發中1</TabContainer>}
        {this.state.value === 1 && <TabContainer className={classes.tabcontainer} dir={theme.direction}>噢噢...本功能目前開發中</TabContainer>}
        {this.state.value === 2 && <TabContainer className={classes.tabcontainer} dir={theme.direction}><SearchPages /></TabContainer>}
        {this.state.value === 3 && <TabContainer className={classes.tabcontainer} dir={theme.direction}>噢噢...本功能目前開發中</TabContainer>}
        {this.state.value === 4 &&<TabContainer className={classes.tabcontainer} dir={theme.direction}>噢噢...本功能目前開發中</TabContainer>}
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);