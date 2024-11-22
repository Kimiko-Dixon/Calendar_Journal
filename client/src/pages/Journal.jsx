import {
  ADD_ENTRY,
  EDIT_FREEWRITE,
} from "../utils/mutations";
import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_ME, GET_ENTRY } from "../utils/queries";
("use client");
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { Editable, IconButton } from "@chakra-ui/react";
import Priority from "../components/Priority";
import Habit from "../components/Habit";
import Gratitude from "../components/Gratitude";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc);

const Journal = () => {
  Auth.loggedIn() ? null : window.location.assign("/login");
  const [addEntry] = useMutation(ADD_ENTRY);
  const [editFreeWrite] = useMutation(EDIT_FREEWRITE)
  const { data:userData } = useQuery(GET_ME);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const { loading,data: entryData } = useQuery(GET_ENTRY, {
    variables: { date },
  });
  const [freeWrite,setFreeWrite] = useState("")
  console.log('freeWrite: ',freeWrite)
  
  const user = userData?.me || {};
  const todaysEntry = useMemo(() => entryData?.getEntry,[date,entryData]) 
  

  const handleNewEntry = async () => {
    try {
      const { data } = await addEntry({
        variables: { userId: user._id, date: date },
        refetchQueries: [{ query: GET_ENTRY, variables: { date } }],
      });
      setFreeWrite(data.addEntry.freeWrite === null ? '' : data.addEntry.freeWrite)
      console.log('data: ',data,'entry:', data.addEntry,'freewrite: ', data.addEntry.freeWrite)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (dayjs(date).utc().format('YYYY-MM-DD') != dayjs(todaysEntry?.date).utc().format('YYYY-MM-DD')) {
      handleNewEntry();
    }
  }, [date]);

  useEffect(()=>{
    setFreeWrite(todaysEntry?.freeWrite === null ? '' : todaysEntry?.freeWrite)
    console.log('entry: ',todaysEntry)
  },[todaysEntry])

  const handleFreeWriteEdit = async () => {
    try{
      await editFreeWrite({
        variables:{entryId: todaysEntry._id, freeWrite}
      })
    }catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <input
        type="date"
        name="date"
        id="date"
        defaultValue={date}
        onChange={(e) => {
          setDate(e.target.value);
          console.log(e.target.value);
        }}
      />
      {todaysEntry?.priorities?.map((priority)=>{
        return(
          <div key={priority._id}>
          <Priority entryId={todaysEntry?._id} loading = {loading} priority={priority} date={date} />
        </div>
        )
      })}
      <Priority entryId={todaysEntry?._id} loading = {loading} date={date} />

      {todaysEntry?.habits?.map((habit)=>{
        return(
          <div key={habit._id}>
          <Habit entryId={todaysEntry?._id} loading = {loading} habit={habit} date={date} />
        </div>
        )
      })}
      <Habit entryId={todaysEntry?._id} loading = {loading} date={date} />

      {todaysEntry?.gratitudes?.map((gratitude)=>{
        return(
          <div key={gratitude._id}>
          <Gratitude entryId={todaysEntry?._id} loading = {loading} gratitude={gratitude} date={date} />
        </div>
        )
      })}
      <Gratitude entryId={todaysEntry?._id} loading = {loading} date={date} />
      
        <form id="freewrite-form">
        <Editable.Root
            value={freeWrite}
            onValueChange={(e) => {setFreeWrite(e.value)}}
            onValueCommit={handleFreeWriteEdit}
            placeholder="Freewrite"
          >
            <Editable.Preview />
            <Editable.Textarea />
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
    </>
  );
};

export default Journal;
