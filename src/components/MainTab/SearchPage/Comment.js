import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'

import RatingStar from './Common/RatingStar.js'
const styles = theme => ({
  card: {
    margin: '5px',
    maxWidth: 400,
    borderRadius: '15px',
    boxShadow: '#CFCFCF 0px 1px 0px 1px',
    color: 'rgba(0,0,0,0.6)'
  },
  header: {
    justifyContent: 'flex-start',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12.33px'
  },
  avatar: {
    backgroundColor: red[500],
    margin: '0 10px 0 0',
    height: '37px',
    width: '37px'
  },
  star: {
    justifyContent: 'flex-start',
    height: '18px',
    width: '18px'
  }
})

class Comment extends Component {
  render() {
    const { classes, review: info } = this.props
    return (
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.header}>
            <Avatar
              aria-label='Recipe'
              className={classes.avatar}
              src={info['authorPhotoUrl']}
            />
            <div>
              <nobr style={{ fontWeight: 'bold', padding: '0 0 0 1px' }}>
                {info['authorName']}
              </nobr>
              <nobr style={{ padding: '0 0 0 29px' }}>
                {' '}
                {info['relativeTime']}
              </nobr>
              <div style={{ display: 'flex' }}>
                <div style={{ textAlign: 'left' }}>
                  <RatingStar rating={info['rating']} theme={0} />
                </div>
                <nobr style={{ padding: '1px 0 0 5px' }}>{info['rating']}</nobr>
              </div>
            </div>
          </div>

          <Typography
            component='p'
            style={{
              textAlign: 'left',
              padding: '10px 0 0 0',
              fontSize: '12.33px',
              color: 'rgba(0,0,0,0.6)'
            }}
          >
            {info['text']}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Comment)
