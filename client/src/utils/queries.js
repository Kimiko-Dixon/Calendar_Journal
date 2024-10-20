import {gql} from '@apollo/client'

export const GET_ME = gql`
    query Me {
  me {
    _id
    username
    password
    schedual {
      _id
      date
      events {
        _id
        name
        startTime
        endTime
        location
      }
    }
    journal {
      _id
      date
      priorities {
        _id
        name
        isDone
      }
      habits {
        _id
        name
        isDone
      }
      gratitudes
      freeWrite
    }
  }
}
`