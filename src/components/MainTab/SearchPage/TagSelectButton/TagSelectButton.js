import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import Add from '@material-ui/icons/Add'
import Check from '@material-ui/icons/Check'

import TagSetting from './TagSetting'

const styles = theme => ({
  root: {
    paddingRight: '0',
    paddingLeft: '0',
    height: 'calc(100vh - 116px)',
    overflow: 'auto',
    paddingBottom: '150px',
  },
  shadow: {
    bottom: '56px',
    width: '100%',
    height: '80px',
    zIndex: '1',
    position: 'fixed',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0)0%, rgba(255, 255, 255, 1)100%)'
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    height: '34px',
    width: '100%',
    backgroundColor: 'rgb(97, 97, 97, 0.08)',
    lineHeight: '24px',
    color: '#424242',
    fontSize: '14.09px',
    fontWeight: 'bold',
    paddingLeft: '34px'
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: '20px'
  },
  chip: {
    justifyContent: 'center',
    margin: '0 5px 0 5px',
    padding: '20px 5px 20px 5px',
    width: '120px',
    border: '1px rgba(0, 0, 0, 0.12) solid',
    borderRadius: '25px'
  },
  chipEven: {
    transform: 'translateX(-30px)'
  },
  chipOdd: {
    transform: 'translateX(30px)'
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '40px',
    marginBottom: '12px'
  },
  chipaddicon: {
    height: '15px'
  },
  button: {
    padding: '0px 40px 0px 40px',
    marginTop: '30px',
    backgroundColor: '#37474f',
    width: '158px',
    borderRadius: '25px'
  }
})
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FFFFFF',
      main: '#FFFFFF'
    }, // Purple and green play nicely together.
    secondary: { main: '#37474f' } // This is just green.A700 as hex.
  },
  typography: {
    useNextVariants: true
  }
})

class TagSelectButton extends Component {
  constructor(props) {
    super(props)
    /** TODO: 把tag模組化 */
    this.state = {
      foodType: TagSetting.foodType,
      atmosphere: TagSetting.atmosphere,
      Selected: [],
      arrayFoodType: [],
      arrayAtmosphere: []
    }
    let i = 0
    while (this.state.foodType[i]) {
      const temp = [this.state.foodType[i], this.state.foodType[i + 1]]
      this.state.arrayFoodType.push(temp)
      i += 2
    }
    i = 0
    while (this.state.atmosphere[i]) {
      const temp = [this.state.atmosphere[i], this.state.atmosphere[i + 1]]
      this.state.arrayAtmosphere.push(temp)
      i += 2
    }
  }

  handleClickAtmosphere = data => {
    this.setState(state => {
      const Data = {
        atmosphere: [...state.atmosphere]
      }
      Data.atmosphere[data.key].choose = Data.atmosphere[data.key].choose === 1 ? 0 : 1
      if (Data.atmosphere[data.key].choose === 1) {
        state.Selected.push(data.id)
      } else {
        const chipToDelete = state.Selected.indexOf(data.id)
        state.Selected.splice(chipToDelete, 1)
      }
      return { Data }
    })
  }
  handleClick = data => {
    this.setState(state => {
      const Data = {
        foodType: [...state.foodType]
      }
      Data.foodType[data.key].choose = Data.foodType[data.key].choose === 1 ? 0 : 1
      if (Data.foodType[data.key].choose === 1) {
        state.Selected.push(data.id)
      } else {
        const chipToDelete = state.Selected.indexOf(data.id)
        state.Selected.splice(chipToDelete, 1)
      }
      return { Data }
    })
  }

  render() {
    const { classes } = this.props
    var handleNext = this.props.handleNext
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div className={classes.subtitle}>
            {'菜系'}
          </div>
          <div className={classes.chips}>
            {this.state.arrayFoodType.map((data, index) => {
              const transform =
                index % 2 === 0 ? classes.chipEven : classes.chipOdd
              const chip = () => {
                if (data[1])
                  return (
                    <Chip
                      className={`${classes.chip} ${transform}`}
                      key={data[1].key}
                      icon={
                        data[1].choose === 0 ? (
                          <Add className={classes.chipaddicon} />
                        ) : (
                          <Check className={classes.chipaddicon} />
                        )
                      }
                      label={data[1].label}
                      onClick={() => this.handleClick(data[1])}
                      color={data[1].choose === 0 ? 'primary' : 'secondary'}
                    />
                  )
              }
              return (
                <div key={index} className={classes.chipContainer}>
                  <Chip
                    className={`${classes.chip} ${transform}`}
                    key={data[0].key}
                    icon={
                      data[0].choose === 0 ? (
                        <Add className={classes.chipaddicon} />
                      ) : (
                        <Check className={classes.chipaddicon} />
                      )
                    }
                    label={data[0].label}
                    onClick={() => this.handleClick(data[0])}
                    color={data[0].choose === 0 ? 'primary' : 'secondary'}
                  />
                  {chip()}
                </div>
              )
            })}
          </div>
          <div className={classes.subtitle}>
            {'氛圍'}
          </div>
          <div className={classes.chips}>
            {this.state.arrayAtmosphere.map((data, index) => {
              const transform =
                index % 2 === 0 ? classes.chipEven : classes.chipOdd
              const chip = () => {
                if (data[1])
                  return (
                    <Chip
                      className={`${classes.chip} ${transform}`}
                      key={data[1].key}
                      icon={
                        data[1].choose === 0 ? (
                          <Add className={classes.chipaddicon} />
                        ) : (
                          <Check className={classes.chipaddicon} />
                        )
                      }
                      label={data[1].label}
                      onClick={() => this.handleClickAtmosphere(data[1])}
                      color={data[1].choose === 0 ? 'primary' : 'secondary'}
                    />
                  )
              }
              return (
                <div key={index} className={classes.chipContainer}>
                  <Chip
                    className={`${classes.chip} ${transform}`}
                    key={data[0].key}
                    icon={
                      data[0].choose === 0 ? (
                        <Add className={classes.chipaddicon} />
                      ) : (
                        <Check className={classes.chipaddicon} />
                      )
                    }
                    label={data[0].label}
                    onClick={() => this.handleClickAtmosphere(data[0])}
                    color={data[0].choose === 0 ? 'primary' : 'secondary'}
                  />
                  {chip()}
                </div>
              )
            })}
          </div>
        </div>
        <div className={classes.shadow}>
          <Button
            className={classes.button}
            variant='contained'
            onClick={() => handleNext(this.state.Selected)}
          >
            <Typography variant='subtitle2' style={{ color: '#ffffff' }}>
              搜尋
            </Typography>
          </Button>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(TagSelectButton)
