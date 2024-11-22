import {
  ADD_HABIT,
  EDIT_HABIT,
  DELETE_HABIT,
} from "../utils/mutations";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ENTRY } from "../utils/queries";
("use client");
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { Editable, IconButton, HStack } from "@chakra-ui/react";

const Habit = ({ entryId, loading, habit, date }) => {
  console.log(habit);
  const [addHabit] = useMutation(ADD_HABIT);
  const [editHabit] = useMutation(EDIT_HABIT);
  const [deleteHabit] = useMutation(DELETE_HABIT);
  const [name, setName] = useState("");

  useEffect(() => {
    if (habit) {
      setName(habit.name);
    }
  }, [loading]);

  const handleEditHabit = async (editing) => {
    try {
      if(editing === 'isDone'){
      await editHabit({
        variables: { entryId, habitId: habit._id, isDone: !habit.isDone },
      });
      }
      else{
        await editHabit({
          variables: { entryId, habitId: habit._id, name },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewHabit = async () => {
    // add habit to the database and clear newHabit
    if (name.trim() != "") {
      try {
        await addHabit({
          variables: { entryId, name },
        });
        setName("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeleteHabit = async () => {
    try {
      await deleteHabit({
        variables: { entryId, habitId: habit._id },
        refetchQueries: [{ query: GET_ENTRY, variables: { date } }],
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form id="habits-form">
        <HStack>
        {habit ? (
          <input
            type="checkbox"
            name="isDone"
            /* id={habit._id} */
            checked={habit.isDone}
            onChange={(e) => handleEditHabit(e.target.name)}
          />
        ) : null}

        <Editable.Root
          value={name}
          onValueChange={(e) => setName(e.value)}
          onValueCommit={habit ? handleEditHabit : handleNewHabit}
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
        {habit ? (
          <IconButton variant="ghost" size="xs" onClick={handleDeleteHabit}>
            <LuX />
          </IconButton>
        ) : null}
        </HStack>
      </form>
    </>
  );
};

export default Habit;
