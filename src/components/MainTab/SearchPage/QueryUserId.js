import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'


const GET_USERID = gql`
    {
        appEntry{
            id
        }
    }
`

const QueryUserId = props => {
  const prevData = localStorage.getItem('FooderUserID')  
  if(prevData != null){
    return(null)
  }
  else{
    return (
        <Query query={GET_USERID}>
          {({ data, loading, error }) => {
            if (error) return (null)
            else if(!loading){
                const prevData = localStorage.setItem('FooderUserID',data['appEntry']['id'])
            }
            return (
                null  
            )
          }}
        </Query>
      )
  }
  
}

export default QueryUserId