import React from 'react'
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import Chip from '@material-ui/core/Chip';
// import IconButton from '@material-ui/core/IconButton';
// import Fab from '@material-ui/core/Fab';

import DetailQuery from './DetailQuery.js'

const styles = theme => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: 'calc(100vh - 112px)',
    overflowX: 'hidden',
    overflowY: 'auto',
    alignItems: 'center',
    marginBottom: '56px'
  }
})

const RestaurantDetail = (props) => {
  const { classes, tags, info } = props
  return (
    <div className={classes.content}>
        <DetailQuery tag={tags} info={info} />
    </div>
  )
}

export default withStyles(styles)(RestaurantDetail)
