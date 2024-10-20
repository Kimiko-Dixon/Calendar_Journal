import {gql} from '@apollo/client'

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

export const ADD_DAY = gql`
    mutation AddDay($date: String!) {
  addDay(date: $date) {
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
}
`

export const ADD_EVENT = gql`
    mutation AddEvent($dayId: ID!, $event: EventInput) {
  addEvent(dayId: $dayId, event: $event) {
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
}
`

export const EDIT_EVENT = gql`
    mutation EditEvent($dayId: ID!, $eventId: ID!, $event: EventInput) {
  editEvent(dayId: $dayId, eventId: $eventId, event: $event) {
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
}
`

export const DELETE_EVENT = gql`
    mutation DeleteEvent($dayId: ID!, $eventId: ID!) {
  deleteEvent(dayId: $dayId, eventId: $eventId) {
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
}
`

export const ADD_ENTRY = gql`
    mutation AddEntry($date: String) {
  addEntry(date: $date) {
    _id
    date
    priorities {
      _id
    }
    habits {
      _id
    }
    gratitudes
    freeWrite
  }
}
`

export const EDIT_ENTRY = gql`
    mutation EditEntry($entryId: ID!, $gratitudes: String, $freeWrite: String) {
  editEntry(entryId: $entryId, gratitudes: $gratitudes, freeWrite: $freeWrite) {
    _id
    date
    gratitudes
    freeWrite
  }
}
`

export const ADD_PRIORITY = gql`
    mutation AddPriority($entryId: ID!, $priority: PriorityInput!) {
  addPriority(entryId: $entryId, priority: $priority) {
    _id
    date
    priorities {
      _id
      name
      isDone
    }
  }
}
`

export const EDIT_PRIORITY = gql`
    mutation EditPriority($entryId: ID!, $priorityId: ID!, $priority: PriorityInput!) {
  editPriority(entryId: $entryId, priorityId: $priorityId, priority: $priority) {
    _id
    date
    priorities {
      _id
      name
      isDone
    }
  }
}
`

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
  }
}
`

export const ADD_HABIT = gql`
    mutation AddHabit($entryId: ID!, $habit: HabitInput!) {
  addHabit(entryId: $entryId, habit: $habit) {
    _id
    date
    habits {
      _id
      name
      isDone
    }
  }
}
`

export const EDIT_HABIT = gql`
    mutation EditHabit($entryId: ID!, $habitId: ID!, $habit: HabitInput!) {
  editHabit(entryId: $entryId, habitId: $habitId, habit: $habit) {
    _id
    date
    habits {
      _id
      name
      isDone
    }
  }
}
`

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
  }
}
`