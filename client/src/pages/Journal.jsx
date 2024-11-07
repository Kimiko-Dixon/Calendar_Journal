import {
  ADD_ENTRY,
  EDIT_ENTRY,
  ADD_HABIT,
  EDIT_HABIT,
  DELETE_HABIT,
} from "../utils/mutations";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_ME, GET_ENTRY } from "../utils/queries";
("use client");
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { Editable, IconButton } from "@chakra-ui/react";
import Priority from "../components/Priority";
import Habit from "../components/Habit";

const Journal = () => {
  Auth.loggedIn() ? null : window.location.assign("/login");
  const [addEntry] = useMutation(ADD_ENTRY);
  const [editEntry] = useMutation(EDIT_ENTRY)
  const { data } = useQuery(GET_ME);
  const [editableEntryData,setEntryData] = useState({graditude:'',freeWrite:''})
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const { loading,data: entryData } = useQuery(GET_ENTRY, {
    variables: { date },
  });
  const user = data?.me || {};
  const todaysEntry = entryData?.getEntry || [];
  const [entryId, setEntryId] = useState();

  const handleNewEntry = async () => {
    try {
      const { data } = await addEntry({
        variables: { userId: user._id, date: date },
        refetchQueries: [{ query: GET_ENTRY, variables: { date } }],
      });
      setEntryId(data.addEntry._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (todaysEntry) {
      handleNewEntry();
    }
  }, [date]);

  useEffect(()=>{
    setEntryData({...editableEntryData,freeWrite:todaysEntry.freeWrite})
  },[loading])

  const handleEntryEdit = async () => {
    try{
      await editEntry({
        variables:{entryId,/* graditude:editableEntryData.graditude */freeWrite:editableEntryData.freeWrite}
      })
      /* setEntryData({graditude:''}) */
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
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          console.log(e.target.value);
        }}
      />
      <Priority entryId={entryId} date={date} />
      <Habit entryId={entryId} date={date} />
      {/* graditudes */}
      {/* <form id="graditudes-form">
      <Editable.Root
          value={editableEntryData.graditude}
          onValueChange={(e) => setEntryData({...editableEntryData,graditude:e.value})}
          onValueCommit={handleEntryEdit}
          placeholder=""
        >
          <Editable.Preview />
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
      </form> */}
      {/* freewrite */}
      <form id="freewrite-form">
      <Editable.Root
          value={editableEntryData.freeWrite}
          onValueChange={(e) => setEntryData({...editableEntryData,freeWrite:e.value})}
          onValueCommit={handleEntryEdit}
          placeholder="Freewrite"
        >
          <Editable.Preview />
          <Editable.Textarea />
          <Editable.Control>
            {/* <Editable.EditTrigger asChild>
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
            </Editable.SubmitTrigger> */}
          </Editable.Control>
        </Editable.Root>
      </form>
    </>
  );
};

export default Journal;
