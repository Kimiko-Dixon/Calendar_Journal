const { User, Day, Entry } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      /* console.log(typeof value) */
      return new Date(value);
    },
    serialize(value) {
      /* console.log(typeof value) */
      return value;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(
          context.user._id
        ); /* .populate('journal').populate('schedule'); */
      }
      return AuthenticationError;
    },
    getDay: async (parent,{date}, context) => {
      if (context.user) {
        return await Day.findOne({user: context.user._id,date});
      }
      return AuthenticationError;
    },
    getEntry: async (parent,{date}, context) => {
      if (context.user) {
        return await Entry.findOne({user: context.user._id,date});
      }
      return AuthenticationError;
    },
  },
  Mutation: {
    signup: async (parent, { username, password }, context) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }, context) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw AuthenticationError;
      }

      const isPassword = await user.isCorrectPassword(password);

      if (!isPassword) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addDay: async (parent, { date }, context) => {
      if (context.user) {
        const user = await User.findById({ _id: context.user._id });
        const day = await Day.findOne({ user, date });
        if (day) {
          return day;
        }
        return await Day.create({ user, date });

        /* const day = await Day.create({ date });
        await User.findOneAndUpdate(
            {_id:userId},
            { $addToSet: { schedule: day } },
            { new: true }
        )
        return day */
      }
      throw AuthenticationError;
    },
    //Fix duplication
    addEvent: async (parent, { dayId, event }, context) => {
      if (context.user) {
        return await Day.findOneAndUpdate(
          { _id: dayId },
          { $addToSet: { events: event } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    editEvent: async (parent, { dayId, eventId, event }, context) => {
      if (context.user) {
        const day = await Day.findById({ _id: dayId });
        day.events.id(eventId).set(event)
        day.save();
        return day;
      }
      throw AuthenticationError;
    },
    deleteEvent: async (parent, { dayId, eventId }, context) => {
      if (context.user) {
        return await Day.findOneAndUpdate(
          { _id: dayId },
          { $pull: { events: { _id: eventId } } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    addEntry: async (parent, { date }, context) => {
      if (context.user) {
        const user = await User.findById({ _id: context.user._id });
        const entry = await Entry.findOne({ user, date });
        if (entry) {
          return entry;
        }
        return await Entry.create({ user, date });

        /* const entry = await Entry.create({ date });
        await User.findOneAndUpdate(
            {_id:userId},
            {$addToSet:{journal:entry}},
            {new:true}
        )
        return entry */
      }
      throw AuthenticationError;
    },
    editFreeWrite: async (parent, { entryId,freeWrite }, context) => {
      if (context.user) {
        return await Entry.findOneAndUpdate(
          { _id: entryId },
          {
            freeWrite,
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    //Fix duplication
    addGratitude: async (parent, { entryId, text }, context) => {
      if (context.user) {
        return await Entry.findOneAndUpdate(
          { _id: entryId },
          { $addToSet: { gratitudes: {text} } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    editGratitude: async (parent, { entryId,gratitudeId,text }, context) => {
      if (context.user) {
        const entry = await Entry.findById({ _id: entryId });
        entry.gratitudes.id(gratitudeId).text = text
        entry.markModified("gratitudes");
        entry.save();
        return entry;
      }
      throw AuthenticationError;
    },
    deleteGratitude: async (parent, { entryId, gratitudeId }, context) => {
      if (context.user) {
        return await Entry.findOneAndUpdate(
          { _id: entryId },
          { $pull: { gratitudes: { _id: gratitudeId } } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    //Fix duplication
    addPriority: async (parent, { entryId, name }, context) => {
      if (context.user) {
        return await Entry.findOneAndUpdate(
          { _id: entryId },
          { $addToSet: { priorities: {name} } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    editPriority: async (parent, { entryId,name,isDone, priorityId }, context) => {
      if (context.user) {
        const entry = await Entry.findById({ _id: entryId });
        if(name){
          entry.priorities.id(priorityId).name = name
        }
        if(isDone != null){
          entry.priorities.id(priorityId).isDone = isDone;
        }
        entry.markModified("priorities");
        entry.save();
        return entry;
      }
      throw AuthenticationError;
    },
    deletePriority: async (parent, { entryId, priorityId }, context) => {
      if (context.user) {
        return await Entry.findOneAndUpdate(
          { _id: entryId },
          { $pull: { priorities: { _id: priorityId } } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    //Fix duplication
    addHabit: async (parent, { entryId, name }, context) => {
      if (context.user) {
        return await Entry.findOneAndUpdate(
          { _id: entryId },
          { $addToSet: { habits: { name } } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    editHabit: async (parent, { entryId,name,isDone, habitId }, context) => {
      if (context.user) {
        const entry = await Entry.findById({ _id: entryId });
        if(name){
          entry.habits.id(habitId).name = name
        }
        if(isDone != null){
          entry.habits.id(habitId).isDone = isDone;
        }
        entry.markModified("habits");
        entry.save();
        return entry;
      }
      throw AuthenticationError;
    },
    deleteHabit: async (parent, { entryId, habitId }, context) => {
      if (context.user) {
        return await Entry.findOneAndUpdate(
          { _id: entryId },
          { $pull: { habits: { _id: habitId } } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
