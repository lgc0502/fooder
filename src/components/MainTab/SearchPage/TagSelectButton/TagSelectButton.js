import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import Add from '@material-ui/icons/Add'
import Check from '@material-ui/icons/Check'

const styles = theme => ({
  root: {
    paddingRight: '0',
    paddingLeft: '0',
    height: 'calc(100vh - 116px)',
    overflow: 'auto',
    padding: theme.spacing.unit / 2
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
    height: 'calc(100vh - 208px)',
    paddingTop: '20px'
  },
  chip: {
    justifyContent: 'center',
    margin: '0 5px 0 5px',
    padding: '20px 5px 20px 5px',
    width: '120px',
    height: '40px',
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
    width: '100%'
  },
  chipaddicon: {
    height: '15px'
  },
  button: {
    padding: '0px 40px 0px 40px',
    margin: '10px',
    backgroundColor: '#37474f',
    marginBottom: '56px',
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
      Tags: [
        {
          key: 0,
          label: ' 早午餐 ',
          choose: 0,
          id: '5c7ecdc8ede547650ddb1b51'
        },
        {
          key: 1,
          label: ' 下午茶 ',
          choose: 0,
          id: '5c7ecdc8ede547650ddb1b52'
        },
        { key: 2, label: '午餐', choose: 0, id: '5c7ecdc8ede547650ddb1b53' },
        { key: 3, label: '晚餐', choose: 0, id: '5c7ecdc8ede547650ddb1b54' },
        { key: 4, label: '宵夜', choose: 0, id: '5c7ecdc8ede547650ddb1b55' },
        {
          key: 5,
          label: ' 來點湯 ',
          choose: 0,
          id: '5c7ecdc8ede547650ddb1b4a'
        },
        {
          key: 6,
          label: '  點心  ',
          choose: 0,
          id: '5c7ecdc8ede547650ddb1b4e'
        },
        {
          key: 7,
          label: '  小吃  ',
          choose: 0,
          id: '5c7ecdc8ede547650ddb1b4f'
        },
        {
          key: 8,
          label: '小編推薦',
          choose: 0,
          id: '5c7ecdc8ede547650ddb1b68'
        },
        {
          key: 9,
          label: '氣氛悠閒',
          choose: 0,
          id: '5c7ecdc8ede547650ddb1b5e'
        },
        {
          key: 10,
          label: '相機先吃',
          choose: 0,
          id: '5c7ecdc8ede547650ddb1b58'
        },
        {
          key: 11,
          label: '  久坐  ',
          choose: 0,
          id: '5c7ecdc8ede547650ddb1b5c'
        },
        {
          key: 12,
          label: ' 吃粗飽 ',
          choose: 0,
          id: '5c7ecdc8ede547650ddb1b64'
        },
        {
          key: 13,
          label: '氣氛歡樂',
          choose: 0,
          id: '5c7ecdc8ede547650ddb1b5f'
        }
      ],
      Selected: [],
      array: []
    }
    let i = 0
    while (this.state.Tags[i]) {
      const temp = [this.state.Tags[i], this.state.Tags[i + 1]]
      this.state.array.push(temp)
      i += 2
    }
  }

  handleClick = data => {
    this.setState(state => {
      const Data = {
        Tags: [...state.Tags]
      }
      Data.Tags[data.key].choose = Data.Tags[data.key].choose === 1 ? 0 : 1
      if (Data.Tags[data.key].choose === 1) {
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
            {this.state.array.map((data, index) => {
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
