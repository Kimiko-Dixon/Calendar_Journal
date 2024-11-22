import {
  ADD_GRATITUDE,
  EDIT_GRATITUDE,
  DELETE_GRATITUDE,
} from "../utils/mutations";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ENTRY } from "../utils/queries";
("use client");
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { Editable, IconButton, HStack } from "@chakra-ui/react";

const Gratitude = ({ entryId, loading, gratitude, date }) => {
  console.log(gratitude);
  const [addGratitude] = useMutation(ADD_GRATITUDE);
  const [editGratitude] = useMutation(EDIT_GRATITUDE);
  const [deleteGratitude] = useMutation(DELETE_GRATITUDE);
  const [text, setText] = useState("");

  useEffect(() => {
    if (gratitude) {
      setText(gratitude.text);
    }
  }, [loading]);

  const handleEditGratitude = async () => {
    try {
      await editGratitude({
        variables: { entryId, gratitudeId: gratitude._id, text},
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewGratitude = async () => {
    // add gratitude to the database and clear newGratitude
    if (text.trim() != "") {
      try {
        await addGratitude({
          variables: { entryId, text },
        });
        setText("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeleteGratitude = async () => {
    try {
      await deleteGratitude({
        variables: { entryId, gratitudeId: gratitude._id },
        refetchQueries: [{ query: GET_ENTRY, variables: { date } }],
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form id="gratitudes-form">
        <HStack>
        <Editable.Root
          value={text}
          onValueChange={(e) => setText(e.value)}
          onValueCommit={gratitude ? handleEditGratitude : handleNewGratitude}
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
        {gratitude ? (
          <IconButton variant="ghost" size="xs" onClick={handleDeleteGratitude}>
            <LuX />
          </IconButton>
        ) : null}
        </HStack>
      </form>
    </>
  );
};

export default Gratitude;
