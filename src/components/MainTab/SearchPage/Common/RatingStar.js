import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Star from '@material-ui/icons/Star'
import StarHalf from '@material-ui/icons/StarHalf'
import StarBorder from '@material-ui/icons/StarBorder'

const styles = theme => ({
  star: {
    justifyContent: 'flex-start',
    height: '18px',
    width: '18px',
    marginBottom: '-4px',
    marginLeft: '-2px'
  }
})

const RatingStar = props => {
  const generate = rating => {
    const { classes } = props
    if (rating >= 1) {
      return <Star className={classes.star} color='secondary' />
    } else if (rating > 0) {
      //console.log(rating)
      if (rating > 0.7 && rating < 1) {
        return <Star className={classes.star} color='secondary' />
      } else if (rating <= 0.7 && rating > 0.2) {
        return <StarHalf className={classes.star} color='secondary' />
      } else if (rating <= 0.2 && rating > 0) {
        return <StarBorder className={classes.star} color='secondary' />
      }
    } else if (rating <= 0) {
      return <StarBorder className={classes.star} color='secondary' />
    }
  }
  const rating = props.rating
  return (
    <div>
      {generate((10 * rating) / 10)}
      {generate((rating * 10 - 10) / 10)}
      {generate((rating * 10 - 20) / 10)}
      {generate((rating * 10 - 30) / 10)}
      {generate((rating * 10 - 40) / 10)}
    </div>
  )
}

/* class RatingStar extends Component {
  generate = rating => {
    const { classes } = this.props
    if (rating >= 1) {
      return <Star className={classes.star} color='secondary' />
    } else if (rating > 0) {
      //console.log(rating)
      if (rating > 0.7 && rating < 1) {
        return <Star className={classes.star} color='secondary' />
      } else if (rating <= 0.7 && rating > 0.2) {
        return <StarHalf className={classes.star} color='secondary' />
      } else if (rating <= 0.2 && rating > 0) {
        return <StarBorder className={classes.star} color='secondary' />
      }
    } else if (rating <= 0) {
      return <StarBorder className={classes.star} color='secondary' />
    }
  }
  render() {
    var rating = this.props.rating
    return (
      <div>
        {this.generate((10 * rating) / 10)}
        {this.generate((rating * 10 - 10) / 10)}
        {this.generate((rating * 10 - 20) / 10)}
        {this.generate((rating * 10 - 30) / 10)}
        {this.generate((rating * 10 - 40) / 10)}
      </div>
    )
  }
} */

export default withStyles(styles)(RatingStar)
