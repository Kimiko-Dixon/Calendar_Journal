const typeDefs = `

type User {
    _id:ID
    username:String!
    password:String!
    schedual:[Day]
    journal:[Entry]
}

type Day {
    _id:ID 
    date:String!
    events:[Event]
}

type Entry {
    _id:ID 
    date:String!
    priorities:[Priority]
    habits:[Habit]
    gratitudes:String
    freeWrite:String
}

type Event {
    _id:ID 
    name:String!
    startTime:String!
    endTime:String!
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
    startTime:String!
    endTime:String!
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
}

type Mutation {
    signup(username:String!,password:String!): Auth
    login(username:String!,password:String!): Auth
    addDay(date:String!):Day
    addEvent(dayId:ID!,event:EventInput):Day
    editEvent(dayId:ID!,eventId:ID!,event:EventInput):Day
    deleteEvent(dayId:ID!,eventId:ID!):Day
    addEntry(date:String,gratitudes:String,freeWrite:String):Entry
    editEntry(entryId:ID!,gratitudes:String,freeWrite:String):Entry
    addPriority(entryId:ID!,priority:PriorityInput!)
    editPriority(entryId:ID!,priorityId:ID!,priority:PriorityInput!)
    deletePriority(entryId:ID!,priorityId:ID!)
    addHabit(entryId:ID!,habit:HabitInput!)
    editHabit(entryId:ID!,habitId:ID!,habit:HabitInput!)
    editHabit(entryId:ID!,habitId:ID!)
}
`

module.exports = typeDefs