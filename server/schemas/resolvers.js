const {User,Day,Entry} = require('../models')
const {signToken,AuthenticationError} = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent,args,context) => {
            if (context.user){
                return await User.findById(context.user._id)
            }
            return AuthenticationError
        }
    },
    Mutation: {
        signup: async (parent,{username,password},context) => {
            const user = await User.create({username,password})
            const token = signToken(user)
            return{token,user}
            
        },
        login: async (parent,{username,password},context) => {
            const user = await User.findOne({username})
            if (!user){
                throw AuthenticationError
            }

            const isPassword = await user.isCorrectPassword(password)

            if(!isPassword){
                throw AuthenticationError
            }

            const token = signToken(user)
            return{token,user}
        },
        addDay: async (parent,{date},context) => {
            if (context.user){
                return await Day.create({date})
            }
            throw AuthenticationError
        },
        addEvent:async (parent,{dayId,event},context) => {
            if (context.user){
                return await Day.findOneAndUpdate(
                    {_id:dayId},
                    {$addToSet:{events:event}},
                    {new:true}
                )
            }
            throw AuthenticationError
        },
        editEvent: async (parent,{dayId,eventId,event},context) => {
            if (context.user){
                const day = await Day.findById({_id:dayId})
                day.events.set({eventId},{event})
                day.save()
                return day
            }
            throw AuthenticationError
        },
        deleteEvent:async (parent,{dayId,eventId},context) => {
            if (context.user){
                return await Day.findOneAndUpdate(
                    {_id:dayId},
                    {$pull:{events:{eventId}}},
                    {new:true}
                )
            }
            throw AuthenticationError
        },
        addEntry: async (parent,{date},context) => {
            if (context.user){
                return await Entry.create({date})
            }
            throw AuthenticationError
        },
        editEntry: async (parent,{entryId,gratitudes,freeWrite},context) => {
            if (context.user){
                return await Entry.findOneAndUpdate(
                    {_id:entryId},
                    {
                        gratitudes,
                        freeWrite
                    }
                )
            }
            throw AuthenticationError
        },
        addPriority: async (parent,{entryId,priority},context) => {
            if (context.user){
                return await Entry.findOneAndUpdate(
                    {_id:entryId},
                    {$addToSet:{priorities:priority}},
                    {new:true}
                )
            }
            throw AuthenticationError
        },
        editPriority: async (parent,{entryId,priority,priorityId},context) => {
            if (context.user){
                const entry = await Entry.findById({_id:entryId})
                entry.priorities.set({priorityId},{priority})
                entry.save()
                return entry
            }
            throw AuthenticationError
        },
        deletePriority: async (parent,{entryId,priorityId},context) => {
            if (context.user){
                return await Entry.findOneAndUpdate(
                    {_id:entryId},
                    {$pull:{priorities:{priorityId}}},
                    {new:true}
                )
            }
            throw AuthenticationError
        },
        addHabit: async (parent,{entryId,habit},context) => {
            if (context.user){
                return await Entry.findOneAndUpdate(
                    {_id:entryId},
                    {$addToSet:{habits:habit}},
                    {new:true}
                )
            }
            throw AuthenticationError
        },
        editHabit: async (parent,{entryId,habit,habitId},context) => {
            if (context.user){
                const entry = await Entry.findById({_id:entryId})
                entry.habits.set({habitId},{habit})
                entry.save()
                return entry
            }
            throw AuthenticationError
        },
        deleteHabit: async (parent,{entryId,habitId},context) => {
            if (context.user){
                return await Entry.findOneAndUpdate(
                    {_id:entryId},
                    {$pull:{habits:{habitId}}},
                    {new:true}
                )
            }
            throw AuthenticationError
        },
    }
}

module.exports = resolvers