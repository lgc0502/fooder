import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'

import button1 from '../../../../image/image-5-01.jpg'
import button2 from '../../../../image/image-5-02.jpg'
import button3 from '../../../../image/image-5-03.jpg'
import button4 from '../../../../image/image-5-04.jpg'

const styles = theme => ({
  root: {
    height: 'calc(100vh - 186px)',
    alignItems: 'center'
  },
  img: {
    width: '100%',
    height:'100%',
    overflow:'hidden'
  },
  button: {
    height: '50%',
    width: '50%',
  }
})

const FoodType = props => {
  const { classes, handleNext } = props
  return (
    <div className={classes.root}>
       <p style={{ 
        color: 'rgba(0,0,0,0.6)', 
        fontSize: '18px', 
        fontWeight: 'bold',
        marginTop:'28px',
        marginBottom:'31px',
        textAlign: 'center'}}>
        想找哪一類型的餐廳？
      </p>
      <ButtonBase
        variant='contained'
        className={classes.button}
        onClick={() => handleNext(['5c7ecdc8ede547650ddb1b40'])}
      >
        {' '}
        <img className={classes.img} src={button1} alt={'隨便吃'} />
      </ButtonBase>
      <ButtonBase
        variant='contained'
        className={classes.button}
        onClick={() => handleNext(['5c7ecdc8ede547650ddb1b41'])}
      >
        {' '}
        <img className={classes.img} src={button2} alt={'觀光'} />
      </ButtonBase>
      <ButtonBase
        variant='contained'
        className={classes.button}
        onClick={() => handleNext(['5c7ecdc8ede547650ddb1b42'])}
      >
        {' '}
        <img className={classes.img} src={button3} alt={'聚餐'} />
      </ButtonBase>
      <ButtonBase
        variant='contained'
        className={classes.button}
        onClick={() => handleNext(['5c7ecdc8ede547650ddb1b43'])}
      >
        {' '}
        <img className={classes.img} src={button4} alt={'工作'} />
      </ButtonBase>
    </div>
  )
}

FoodType.propTypes = {
  classes: PropTypes.object.isRequired,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func
}

export default withStyles(styles, { withTheme: true })(FoodType)
