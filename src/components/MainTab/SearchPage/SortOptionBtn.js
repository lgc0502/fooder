import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

const styles = theme => ({
  sortbtn: {
    width: '100vw',
    height: '36px',
    backgroundColor: '#f5f5f5',
    color: '#b5b5b5'
  }
})

class SortOptionBtn extends Component {
  render() {
    const { classes, handleSortType, sortType, pricelevel } = this.props
    return (
      <div>
        <BottomNavigation
          showLabels
          className={classes.sortbtn}
          style={{ borderTop: sortType === 1 ? 'solid 1px #b5b5b5' : '0px' }}
        >
          <BottomNavigationAction
            label='熱門程度'
            style={{
              fontWeight: '700',
              color: sortType == 0 ? '#ffc107' : 'rgba(0,0,0,0.54)'
            }}
            onClick={() => {
              handleSortType(0, 0)
            }}
          />
          <nobr style={{ paddingTop: '8px' }}>|</nobr>
          <BottomNavigationAction
            label='價格範圍'
            style={{
              fontWeight: '700',
              color: sortType == 1 ? '#ffc107' : 'rgba(0,0,0,0.54)'
            }}
            onClick={() => {
              handleSortType(1, 1)
            }}
          />
          <nobr style={{ paddingTop: '8px' }}>|</nobr>
          <BottomNavigationAction
            label='距離範圍'
            style={{
              fontWeight: '700',
              color: sortType == 2 ? '#ffc107' : 'rgba(0,0,0,0.54)'
            }}
            onClick={() => {
              handleSortType(2, 0)
            }}
          />
        </BottomNavigation>
        <BottomNavigation
          showLabels
          className={classes.sortbtn}
          style={{
            borderTop: sortType === 1 ? 'solid 1px #b5b5b5' : '0px',
            borderBottom: sortType === 1 ? 'solid 1px #b5b5b5' : '0px',
            height: sortType === 1 ? 'auto' : '0px'
          }}
        >
          <BottomNavigationAction
            label={sortType === 1 ? '100以下' : ''}
            style={{
              fontWeight: '700',
              color: pricelevel == 1 ? '#ffc107' : 'rgba(0,0,0,0.54)'
            }}
            onClick={() => {
              handleSortType(1, 1)
            }}
          />
          <nobr style={{ paddingTop: '8px' }}>{sortType === 1 ? '|' : ''}</nobr>
          <BottomNavigationAction
            label={sortType === 1 ? '100 - 200' : ''}
            style={{
              fontWeight: '700',
              color: pricelevel == 2 ? '#ffc107' : 'rgba(0,0,0,0.54)'
            }}
            onClick={() => {
              handleSortType(1, 2)
            }}
          />
          <nobr style={{ paddingTop: '8px' }}>{sortType === 1 ? '|' : ''}</nobr>
          <BottomNavigationAction
            label={sortType === 1 ? '200 - 300' : ''}
            style={{
              fontWeight: '700',
              color: pricelevel == 3 ? '#ffc107' : 'rgba(0,0,0,0.54)'
            }}
            onClick={() => {
              handleSortType(1, 3)
            }}
          />
          <nobr style={{ paddingTop: '8px' }}>{sortType === 1 ? '|' : ''}</nobr>
          <BottomNavigationAction
            label={sortType === 1 ? '300以上' : ''}
            style={{
              fontWeight: '700',
              color: pricelevel == 4 ? '#ffc107' : 'rgba(0,0,0,0.54)'
            }}
            onClick={() => {
              handleSortType(1, 4)
            }}
          />
        </BottomNavigation>
      </div>
    )
  }
}
export default withStyles(styles)(SortOptionBtn)
