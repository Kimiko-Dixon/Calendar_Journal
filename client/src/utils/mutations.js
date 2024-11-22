import { gql } from "@apollo/client";

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
`;
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
`;

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
`;
//✔ fix duplication on backend
export const ADD_EVENT = gql`
  mutation AddEvent($dayId: ID!, $event: EventInput) {
    addEvent(dayId: $dayId, event: $event) {
      _id
      date
      events {
        _id
        name
        start
        end
        location
      }
      user {
        _id
      }
    }
  }
`;
//✔
export const EDIT_EVENT = gql`
  mutation EditEvent($dayId: ID!, $eventId: ID!, $event: EventInput) {
    editEvent(dayId: $dayId, eventId: $eventId, event: $event) {
      _id
      date
      events {
        _id
        name
        start
        end
        location
      }
      user {
        _id
      }
    }
  }
`;
//✔
export const DELETE_EVENT = gql`
  mutation DeleteEvent($dayId: ID!, $eventId: ID!) {
    deleteEvent(dayId: $dayId, eventId: $eventId) {
      _id
      date
      events {
        _id
        name
        start
        end
        location
      }
      user {
        _id
      }
    }
  }
`;
//✔
export const ADD_ENTRY = gql`
  mutation AddEntry($date: Date!) {
    addEntry(date: $date) {
      _id
      date
      freeWrite
      gratitudes {
        _id
        text
      }
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
      user {
        _id
      }
    }
  }
`;
//✔
export const EDIT_FREEWRITE = gql`
  mutation EditEntry($entryId: ID!, $freeWrite: String) {
    editFreeWrite(entryId: $entryId, freeWrite: $freeWrite) {
      _id
      date
      freeWrite
      user {
        _id
      }
    }
  }
`;
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
`;
//✔
export const EDIT_PRIORITY = gql`
  mutation EditPriority(
    $entryId: ID!
    $priorityId: ID!
    $name: String
    $isDone: Boolean
  ) {
    editPriority(
      entryId: $entryId
      priorityId: $priorityId
      name: $name
      isDone: $isDone
    ) {
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
`;
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
`;
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
`;
//✔
export const EDIT_HABIT = gql`
  mutation EditHabit($entryId: ID!, $habitId: ID!, $isDone: Boolean) {
    editHabit(entryId: $entryId, habitId: $habitId, isDone: $isDone) {
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
`;
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
`;
export const ADD_GRATITUDE = gql`
  mutation AddGratitude($entryId: ID!, $text: String!) {
    addGratitude(entryId: $entryId, text: $text) {
      _id
      gratitudes {
        _id
        text
      }
      date
      user {
        _id
      }
    }
  }
`;
//✔
export const EDIT_GRATITUDE = gql`
  mutation EditGratitude($entryId: ID!, $gratitudeId: ID!, $text: String!) {
    editGratitude(entryId: $entryId, gratitudeId: $gratitudeId, text: $text) {
      _id
      date
      user {
        _id
      }
      gratitudes {
        _id
        text
      }
    }
  }
`;
//✔
export const DELETE_GRATITUDE = gql`
  mutation DeleteGratitude($entryId: ID!, $gratitudeId: ID!) {
    deleteGratitude(entryId: $entryId, gratitudeId: $gratitudeId) {
      _id
      date
      gratitudes {
        _id
        text
      }
      user {
        _id
      }
    }
  }
`;
