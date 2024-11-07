import {
  ADD_ENTRY,
  EDIT_ENTRY,
  ADD_PRIORITY,
  EDIT_PRIORITY,
  DELETE_PRIORITY,
  ADD_HABIT,
  EDIT_HABIT,
  DELETE_HABIT,
} from "../utils/mutations";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_ME, GET_ENTRY } from "../utils/queries";
("use client");
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"
import { Editable,IconButton } from "@chakra-ui/react";

const Journal = () => {
  Auth.loggedIn() ? null : window.location.assign("/login");
  const [addEntry] = useMutation(ADD_ENTRY);
  //   const [editEntry] = useMutation(EDIT_ENTRY)
  const { data } = useQuery(GET_ME);
  const [addPriority] = useMutation(ADD_PRIORITY);
  const [editPriority] = useMutation(EDIT_PRIORITY)
  const [deletePriority] = useMutation(DELETE_PRIORITY)
  /*const [addHabit] = useMutation(ADD_HABIT)
  const [editHabit] = useMutation(EDIT_HABIT)
  const [deleteHabit] = useMutation(DELETE_HABIT) */
  const [newPriority, setNewPriority] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const {data:entryData} = useQuery(GET_ENTRY, {
    variables: {date}
  })
  const user = data?.me || {};
  const todaysEntry = entryData?.getEntry || [];
  const [entryId,setEntryId] = useState()

  const handleNewEntry = async () => {
    try {
      const {data} = await addEntry({
        variables: { userId: user._id, date: date },
        refetchQueries:[{query:GET_ENTRY,variables: {date}}]
      });
      setEntryId(data.addEntry._id)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
      if(todaysEntry){
        handleNewEntry();
      }
  }, [date]);

  const handleEditPriority = async (priorityId,isDone) => {
    try{
      await editPriority({
        variables:{entryId,priorityId,isDone:!isDone}
      })
      
    }
    catch (err) {
      console.log(err);
    }
  }

  const handelNewPriority = async (/* entry */) => {
    // add priority to the database and clear newPriority
    try {
      await addPriority({
        variables: { entryId, name: newPriority },
      });
      setNewPriority("")
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePriority = async (priorityId) => {
    try {
      await deletePriority({
        variables: { entryId, priorityId},
        refetchQueries:[{query:GET_ENTRY,variables: {date}}]
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <input
        type="date"
        name="date"
        id="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          console.log(e.target.value);
        }}
      />
      {/* {handleNewEntry()} */}
      {/* Priorities */}
      <form id="priorities-form">
        {todaysEntry?.priorities?.map((priority) => {
          return (
            <div key={priority._id}>
            <input
              type="checkbox"
              name={priority.name}
              id={priority._id}
              checked={priority.isDone}
              onChange={(e) =>  handleEditPriority(e.target.id,priority.isDone)}
            />
            <label htmlFor={priority.name}>{priority.name}</label>
            <IconButton variant="ghost" size="xs" onClick={() => handleDeletePriority(priority._id)}>
            <LuX />
          </IconButton>
          </div>
          )
        })}
        {/* <input type="text" onChange={(e) => setNewPriority(e.target.value)} onBlur={handelNewPriority} value={newPriority}/> */}
        <Editable.Root
          value={newPriority}
          onValueChange={(e) => setNewPriority(e.value)}
          onValueCommit={handelNewPriority}
          placeholder=""
        >
          <Editable.Preview/>
          <Editable.Input />
          <Editable.Control>
        <Editable.EditTrigger asChild>
          <IconButton variant="ghost" size="xs">
            <LuPencilLine />
          </IconButton>
        </Editable.EditTrigger>
        <Editable.CancelTrigger asChild>
          <IconButton variant="outline" size="xs">
            <LuX />
          </IconButton>
        </Editable.CancelTrigger>
        <Editable.SubmitTrigger asChild>
          <IconButton variant="outline" size="xs">
            <LuCheck />
          </IconButton>
        </Editable.SubmitTrigger>
      </Editable.Control>
        </Editable.Root>
      </form>
      {/* Habit Tracker */}
      {/* graditudes */}
      {/* freewrite */}
    </>
  );
};

export default Journal;
