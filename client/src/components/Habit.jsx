import { ADD_HABIT, EDIT_HABIT, DELETE_HABIT } from "../utils/mutations";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ENTRY } from "../utils/queries";
("use client");
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { Editable, IconButton } from "@chakra-ui/react";

const Habit = ({ entry, date }) => {
  const [addHabit] = useMutation(ADD_HABIT);
  const [editHabit] = useMutation(EDIT_HABIT);
  const [deleteHabit] = useMutation(DELETE_HABIT);
  const [newHabit, setNewHabit] = useState("");
  /* const { data: entryData } = useQuery(GET_ENTRY, {
    variables: { date },
  });
  const todaysEntry = entryData?.getEntry || []; */

  const handleEditHabit = async (habitId, isDone) => {
    try {
      await editHabit({
        variables: { entryId: entry._id, habitId, isDone: !isDone },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewHabit = async () => {
    // add habit to the database and clear newHabit
    if (newHabit.trim() != "") {
      try {
        await addHabit({
          variables: { entryId: entry._id, name: newHabit },
        });
        setNewHabit("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeleteHabit = async (habitId) => {
    try {
      await deleteHabit({
        variables: { entryId: entry._id, habitId },
        refetchQueries: [{ query: GET_ENTRY, variables: { date } }],
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form id="habits-form">
        {entry?.habits?.map((habit) => {
          return (
            <div key={habit._id}>
              <input
                type="checkbox"
                name={habit.name}
                id={habit._id}
                checked={habit.isDone}
                onChange={(e) => handleEditHabit(e.target.id, habit.isDone)}
              />
              <label htmlFor={habit.name}>{habit.name}</label>
              <IconButton
                variant="ghost"
                size="xs"
                onClick={() => handleDeleteHabit(habit._id)}
              >
                <LuX />
              </IconButton>
            </div>
          );
        })}
        <Editable.Root
          value={newHabit}
          onValueChange={(e) => setNewHabit(e.value)}
          onValueCommit={handleNewHabit}
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
      </form>
    </>
  );
};

export default Habit;
