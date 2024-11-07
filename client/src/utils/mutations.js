import {gql} from '@apollo/client'

//✔
export const SIGNUP = gql`
    mutation Signup($username: String!, $password: String!) {
  signup(username: $username, password: $password) {
    token
    user {
      _id
    }
  }
}
`
//✔
export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
    }
  }
}
`

//✔
export const ADD_DAY = gql`
    mutation AddDay($date: Date!) {
  addDay(date: $date) {
    _id
    date
    user {
      _id
    }
  }
}
`
//✔ fix duplication on backend
export const ADD_EVENT = gql`
    mutation AddEvent($addEventDayId2: ID!, $event: EventInput) {
  addEvent(dayId: $addEventDayId2, event: $event) {
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
//✔
export const EDIT_EVENT = gql`
    mutation EditEvent($editEventDayId2: ID!, $eventId: ID!, $editEventEvent2: EventInput) {
  editEvent(dayId: $editEventDayId2, eventId: $eventId, event: $editEventEvent2) {
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
//✔
export const DELETE_EVENT = gql`
    mutation DeleteEvent($deleteEventDayId2: ID!, $deleteEventEventId2: ID!) {
  deleteEvent(dayId: $deleteEventDayId2, eventId: $deleteEventEventId2) {
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
//✔
export const ADD_ENTRY = gql`
    mutation AddEntry($date: Date!) {
  addEntry(date: $date) {
    _id
    date
    user {
      _id
    }
  }
}
`
//✔
export const EDIT_ENTRY = gql`
   mutation EditEntry($entryId: ID!, $gratitudes: String, $freeWrite: String) {
  editEntry(entryId: $entryId, gratitudes: $gratitudes, freeWrite: $freeWrite) {
    _id
    date
    gratitudes
    freeWrite
    user {
      _id
    }
  }
}
`
//✔ fix duplication on backend
export const ADD_PRIORITY = gql`
    mutation AddPriority($entryId: ID!, $name: String!) {
  addPriority(entryId: $entryId, name: $name) {
    _id
    priorities {
      _id
      name
      isDone
    }
    date
    user {
      _id
    }
  }
}
`
//✔
export const EDIT_PRIORITY = gql`
   mutation EditPriority($entryId: ID!, $priorityId: ID!, $name: String, $isDone: Boolean) {
  editPriority(entryId: $entryId, priorityId: $priorityId, name: $name, isDone: $isDone) {
    _id
    date
    user {
      _id
    }
    priorities {
      _id
      name
      isDone
    }
  }
}
`
//✔
export const DELETE_PRIORITY = gql`
    mutation DeletePriority($entryId: ID!, $priorityId: ID!) {
  deletePriority(entryId: $entryId, priorityId: $priorityId) {
    _id
    date
    priorities {
      _id
      name
      isDone
    }
    user {
      _id
    }
  }
}
`
//✔ fix duplication on backend
export const ADD_HABIT = gql`
    mutation AddHabit($entryId: ID!, $name: String!) {
  addHabit(entryId: $entryId, name: $name) {
    _id
    date
    habits {
      _id
      name
      isDone
    }
    user {
      _id
    }
  }
}
`
//✔
export const EDIT_HABIT = gql`
    mutation EditHabit($entryId: ID!, $habitId: ID!, $isDone:Boolean) {
  editHabit(entryId: $entryId, habitId: $habitId, isDone:$isDone) {
    _id
    date
    habits {
      _id
      name
      isDone
    }
    user {
      _id
    }
  }
}
`
//✔
export const DELETE_HABIT = gql`
    mutation DeleteHabit($entryId: ID!, $habitId: ID!) {
  deleteHabit(entryId: $entryId, habitId: $habitId) {
    _id
    date
    habits {
      _id
      name
      isDone
    }
    user {
      _id
    }
  }
}
`