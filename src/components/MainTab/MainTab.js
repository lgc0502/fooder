import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Person from '@material-ui/icons/Person'
import Search from '@material-ui/icons/Search'
import Bookmark from '@material-ui/icons/Bookmark'

import SearchPages from './SearchPage/SearchPage.js'
import BookmarkPage from './BookmarkPage/BookmarkPage.js'
import Account from './Account/Account.js'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    alignItems: 'center',
    height: '100vh'
  },
  appBar: {
    height: 46,
    position: 'fixed',
    top: 'auto',
    bottom: 0
  },
  tabs: {
    height: 46
  },
  tab: {
    height: 46
  },
  tabcontainer: {
    bottom: 46,
    top: 'auto',
    height: '100vh',
    lineHeight: 'calc(100vh - 46px)'
  }
})
const theme = createMuiTheme({
  palette: {
    primary: { main: '#263238' },
    secondary: { main: '#CC0000' }
  },
  typography: {
    useNextVariants: true
  }
})
class FullWidthTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1,
      vehicle: 0
    }
    const prevData = localStorage.getItem('id')
    if (!prevData) localStorage.setItem('id', '')

    const prevVehicle = localStorage.getItem('vehicle')
    if (!prevVehicle) {
      localStorage.setItem('vehicle', 0)
    } else {
      this.state.vehicle = prevVehicle
    }
  }

  handleVehicle = vehicle => {
    localStorage.setItem('vehicle', vehicle)
    this.setState({
      vehicle
    })
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  onRef = ref => {
    this.child = ref
  }

  homePage = () => {
    this.child.homePage()
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <AppBar
            position='static'
            style={{ backgroundColor: '#FFC107' }}
            className={classes.appBar}
          >
            <Tabs
              className={classes.tabs}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor='primary'
              fullWidth
            >
              <Tab className={classes.tab} icon={<Person color='primary' />} />
              <Tab
                className={classes.tab}
                icon={<Search color='primary' />}
                onClick={this.homePage}
              />
              <Tab
                className={classes.tab}
                icon={<Bookmark color='primary' />}
              />
            </Tabs>
          </AppBar>
          {this.state.value === 0 && (
            <Account
              value={this.state.vehicle}
              handleVehicle={this.handleVehicle}
            />
          )}
          {this.state.value === 1 && (
            <SearchPages vehicle={this.state.vehicle} onRef={this.onRef} />
          )}
          {this.state.value === 2 && (
            <BookmarkPage vehicle={this.state.vehicle} />
          )}
        </MuiThemeProvider>
      </div>
    )
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(FullWidthTabs)
