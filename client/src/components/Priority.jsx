import {
  ADD_PRIORITY,
  EDIT_PRIORITY,
  DELETE_PRIORITY,
} from "../utils/mutations";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ENTRY } from "../utils/queries";
("use client");
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { Editable, IconButton, HStack, Text } from "@chakra-ui/react";

const Priority = ({ entryId, loading, priority, date }) => {
  console.log(priority);
  const [addPriority] = useMutation(ADD_PRIORITY);
  const [editPriority] = useMutation(EDIT_PRIORITY);
  const [deletePriority] = useMutation(DELETE_PRIORITY);
  const [name, setName] = useState("");

  useEffect(() => {
    if (priority) {
      setName(priority.name);
    }
  }, [loading]);

  const handleEditPriority = async (editing) => {
    try {
      console.log(editing)
      if(editing === 'isDone'){
        await editPriority({
          variables: { entryId, priorityId: priority._id,isDone: !priority.isDone },
        });
      }
      else {
        await editPriority({
          variables: { entryId, priorityId: priority._id, name},
        });
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewPriority = async () => {
    // add priority to the database and clear newPriority
    if (name.trim() != "") {
      try {
        await addPriority({
          variables: { entryId, name },
        });
        setName("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeletePriority = async () => {
    try {
      await deletePriority({
        variables: { entryId, priorityId: priority._id },
        refetchQueries: [{ query: GET_ENTRY, variables: { date } }],
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form id="priorities-form">
        <HStack>
        {priority ? (
          <input
            type="checkbox"
            name="isDone"
            /* id={priority._id} */
            checked={priority.isDone}
            onChange={(e) => handleEditPriority(e.target.name)}
          />
        ) : null}

        <Editable.Root
          value={name}
          onValueChange={(e) => setName(e.value)}
          onValueCommit={priority ? handleEditPriority : handleNewPriority}
          placeholder=""
          autoResize={true}
        >
          <Editable.Preview />
          <Editable.Input/>
          <Editable.Control>
            {priority ? null : (<Editable.EditTrigger asChild>
              <IconButton variant="ghost" size="xs">
                <LuPencilLine />
              </IconButton>
            </Editable.EditTrigger>)}
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
        {priority ? (
          <IconButton variant="ghost" size="xs" onClick={handleDeletePriority}>
            <ion-icon name="trash-outline"></ion-icon>
          </IconButton>
        ) : null}
        </HStack>
      </form>
    </>
  );
};

export default Priority;
