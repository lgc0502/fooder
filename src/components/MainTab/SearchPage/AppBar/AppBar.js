import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import KeyboardbackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import ButtonBase from '@material-ui/core/ButtonBase'

import ViewList from '@material-ui/icons/ViewList'
import LocationOn from '@material-ui/icons/LocationOn'

class Appbar extends Component {
  bartext = state => {
    switch (state) {
      case 0:
        return '搜尋'
      case 1:
        return '搜尋'
      case 2:
        return '搜尋結果'
      default:
        return state
    }
  }
  render() {
    var handleBack = this.props.handleBack
    var handleMode = this.props.handleMode
    return (
      <div>
        <AppBar
          position='relative'
          className='appbar'
          style={{
            text: this.props.text,
            backgroundColor: '#FFFFFF',
            height: '56px'
          }}
        >
          <Toolbar>
            <Grid container style={{ alignItems: 'center' }}>
              <Grid item xs={2} style={{ textAlign: 'left' }}>
                {this.props.firstpage === 0 ? (
                  ''
                ) : (
                  <ButtonBase
                    variant='contained'
                    onClick={() => handleBack()}
                    style={{ height: '25px' }}
                  >
                    <KeyboardbackspaceIcon style={{ color: '#263238' }} />
                  </ButtonBase>
                )}
              </Grid>
              <Grid item xs={8}>
                <p style={{ color: '#000000', fontSize: '1.06rem', fontWeight: 'bold'}}>
                  {this.bartext(this.props.text)}
                </p>
              </Grid>
              <Grid item xs={2} style={{ textAlign: 'right' }}>
                {this.props.text === 2 ? (
                  this.props.mode === 0 ? (
                    <LocationOn
                      style={{ color: '#263238' }}
                      onClick={() => handleMode()}
                    />
                  ) : (
                    <ViewList
                      style={{ color: '#263238' }}
                      onClick={() => handleMode()}
                    />
                  )
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default Appbar
