import {
  ADD_PRIORITY,
  EDIT_PRIORITY,
  DELETE_PRIORITY,
} from "../utils/mutations";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ENTRY } from "../utils/queries";
("use client");
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { Editable, IconButton } from "@chakra-ui/react";

const Priority = ({ entryId, date }) => {
  const [addPriority] = useMutation(ADD_PRIORITY);
  const [editPriority] = useMutation(EDIT_PRIORITY);
  const [deletePriority] = useMutation(DELETE_PRIORITY);
  const [newPriority, setNewPriority] = useState("");
  const { data: entryData } = useQuery(GET_ENTRY, {
    variables: { date },
  });
  const todaysEntry = entryData?.getEntry || [];

  const handleEditPriority = async (priorityId, isDone) => {
    try {
      await editPriority({
        variables: { entryId, priorityId, isDone: !isDone },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewPriority = async () => {
    // add priority to the database and clear newPriority
    if (newPriority.trim() != "") {
      try {
        await addPriority({
          variables: { entryId, name: newPriority },
        });
        setNewPriority("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeletePriority = async (priorityId) => {
    try {
      await deletePriority({
        variables: { entryId, priorityId },
        refetchQueries: [{ query: GET_ENTRY, variables: { date } }],
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form id="priorities-form">
        {todaysEntry?.priorities?.map((priority) => {
          return (
            <div key={priority._id}>
              <input
                type="checkbox"
                name={priority.name}
                id={priority._id}
                checked={priority.isDone}
                onChange={(e) =>
                  handleEditPriority(e.target.id, priority.isDone)
                }
              />
              <label htmlFor={priority.name}>{priority.name}</label>
              <IconButton
                variant="ghost"
                size="xs"
                onClick={() => handleDeletePriority(priority._id)}
              >
                <LuX />
              </IconButton>
            </div>
          );
        })}
        <Editable.Root
          value={newPriority}
          onValueChange={(e) => setNewPriority(e.value)}
          onValueCommit={handleNewPriority}
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

export default Priority;
