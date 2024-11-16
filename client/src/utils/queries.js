import {gql} from '@apollo/client'

//"Cannot return null for non-nullable field Entry.date." won't return updated info
export const GET_ME = gql`
    query Me {
  me {
    _id
    username
    password
  }
}
`

export const GET_DAY = gql`
  query GetDay($date: Date!) {
  getDay(date: $date) {
    _id
    date
    events {
      _id
      name
      startTime
      endTime
      location
    }
    user {
      _id
    }
  }
}
`

export const GET_ENTRY = gql`
  query GetEntry($date: Date!) {
  getEntry(date: $date) {
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
    gratitudes {
      _id
      text
    }
    freeWrite
    user {
      _id
    }
  }
}
`