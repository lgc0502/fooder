import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import button1 from '../../../image/image-5-04.jpg'
import Appbar from '../SearchPage/AppBar/AppBar.js'
import { auto } from 'async';
const styles = theme => ({
  root: {
    height: '100%',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 1)0%, rgba(255, 193,7, 1)100%)'
  },
  subRoot: {
    margin: 'auto',
    marginTop: '40px',
    width: '80%',
    height: '80%',
    borderRadius: '20px',
    backgroundColor: '#ffffff'
  },
  img: {
    width: '80px',
    height: '80px',
    borderRadius: '100px'
  }
})

class Account extends React.Component {

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Appbar
          className={classes.appbar}
          firstpage={0}
          text={3}
        />
        <div className={classes.subRoot}>
          <img className={classes.img} src={button1} alt='' />
          <Typography className={classes.tabcontainer}>
            使用者
          </Typography>
          <Typography className={classes.tabcontainer}>
            {`已收藏了 ${localStorage.getItem('id').split(' ').length - 1} 家餐廳`}
          </Typography>
          <Typography className={classes.tabcontainer}>
            交通偏好
          </Typography>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Account)
