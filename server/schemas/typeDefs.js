const typeDefs = `

scalar Date

type User {
    _id:ID
    username:String!
    password:String!
}

type Day {
    _id:ID 
    date:Date!
    events:[Event]
    user:User
}

type Entry {
    _id:ID 
    date:Date!
    priorities:[Priority]
    habits:[Habit]
    gratitudes:String
    freeWrite:String
    user:User
}

type Event {
    _id:ID 
    name:String!
    startTime:Date!
    endTime:Date!
    location:String
}

type Priority {
    _id:ID 
    name:String!
    isDone:Boolean
}

type Habit {
    _id:ID 
    name:String!
    isDone:Boolean
}

input EventInput {
    _id:ID 
    name:String!
    startTime:Date!
    endTime:Date!
    location:String
}

input PriorityInput {
    _id:ID
    name:String!
    isDone:Boolean
}

input HabitInput {
    _id:ID 
    name:String!
    isDone:Boolean
}

type Auth {
    token:ID!
    user:User
}

type Query {
    me: User
    getDay(date:Date!): Day
    getEntry(date:Date!): Entry
}

type Mutation {
    signup(username:String!,password:String!): Auth
    login(username:String!,password:String!): Auth
    addDay(date:Date!):Day
    addEvent(dayId:ID!,event:EventInput):Day
    editEvent(dayId:ID!,eventId:ID!,event:EventInput):Day
    deleteEvent(dayId:ID!,eventId:ID!):Day
    addEntry(date:Date!):Entry
    editEntry(entryId:ID!,gratitudes:String,freeWrite:String):Entry
    addPriority(entryId:ID!,name:String!):Entry
    editPriority(entryId:ID!,priorityId:ID!,name:String,isDone:Boolean):Entry
    deletePriority(entryId:ID!,priorityId:ID!):Entry
    addHabit(entryId:ID!,name:String!):Entry
    editHabit(entryId:ID!,habitId:ID!,isDone:Boolean):Entry
    deleteHabit(entryId:ID!,habitId:ID!):Entry
}
`

module.exports = typeDefs