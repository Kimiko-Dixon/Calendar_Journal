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
import { useState,useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_ME } from "../utils/queries";

const Journal = () => {
  Auth.loggedIn() ? null : window.location.assign("/login");
  const [addEntry] = useMutation(ADD_ENTRY)
//   const [editEntry] = useMutation(EDIT_ENTRY)
  const {loading,data} = useQuery(GET_ME)
  const [addPriority] = useMutation(ADD_PRIORITY)
  /* const [editPriority] = useMutation(EDIT_PRIORITY)
  const [deletePriority] = useMutation(DELETE_PRIORITY)
  const [addHabit] = useMutation(ADD_HABIT)
  const [editHabit] = useMutation(EDIT_HABIT)
  const [deleteHabit] = useMutation(DELETE_HABIT) */
  const [newPriority,setNewPriority] = useState('')
  const [date,setDate] = useState(new Date().toISOString().split('T')[0])
  console.log(date)
  const user = data?.me || {}
  const allEntries = user?.journal?.entry || []
  const todaysEntries = allEntries?.map(entry => entry.date === date)

  const handleNewEntry = async () => {
    try{
        const entry = user?.entries?.filter((entry) => entry.date === date)
        if(entry){
            return
        }
        console.log(user._id)
        await addEntry({
            variables:{userId:user._id,date:date}
        })

      }
      catch(err){
        console.log(err)
      }
  }

  useEffect(()=>{
    if(!loading){
      handleNewEntry()
    }
    return
  },[data])
  
  const handelNewPriority = async () => {
    // add priority to the database and clear newPriority
    try{
        await addPriority({
            variables:{name:newPriority}
        })
    }
    catch(err){
        console.log(err)
    }
  }
  return (
    <>
    <input type="date" name="date" id="date" value={date} onChange={(e) => {
        setDate(e.target.value)
        console.log(e.target.value)}}/>
    {/* {handleNewEntry()} */}
    {/* Priorities */}
    <form id="priorities-form">
        {todaysEntries?.priorities?.map((priority) => {
            <div key={priority._id}>
                <input type="checkbox" name={priority.name} id={priority.name} checked={priority.isDone}/>
                <label htmlFor={priority.name}>{priority.name}</label>
            </div>
        })}
        <input type="text" onChange={(e) => setNewPriority(e.target.value)} onBlur={handelNewPriority} value={newPriority}/>
    </form>
    {/* Habit Tracker */}
    {/* graditudes */}
    {/* freewrite */}
    </>
  );
};

export default Journal;
