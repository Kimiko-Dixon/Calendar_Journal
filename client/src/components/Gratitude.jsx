import {
  ADD_GRATITUDE,
  EDIT_GRATITUDE,
  DELETE_GRATITUDE,
} from "../utils/mutations";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ENTRY } from "../utils/queries";
("use client");
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { Editable, IconButton } from "@chakra-ui/react";

const Gratitude = ({ entry, date }) => {
  const [addGratitude] = useMutation(ADD_GRATITUDE);
  const [editGratitude] = useMutation(EDIT_GRATITUDE);
  const [deleteGratitude] = useMutation(DELETE_GRATITUDE);
  const [newGratitude, setNewGratitude] = useState("");
  /* const { data: entryData } = useQuery(GET_ENTRY, {
    variables: { date },
  });
  const todaysEntry = entryData?.getEntry || []; */

  /* const handleEditGratitude = async (gratitudeId) => {
    if (newGratitude.trim() != "") {
      try {
        await editGratitude({
          variables: { entryId: entry._id, gratitudeId},
        });
      } catch (err) {
        console.log(err);
      }
    }
  }; */

  const handleNewGratitude = async () => {
    // add gratitude to the database and clear newGratitude
    if (newGratitude.trim() != "") {
      try {
        await addGratitude({
          variables: { entryId: entry._id, text: newGratitude },
        });
        setNewGratitude("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeleteGratitude = async (gratitudeId) => {
    try {
      await deleteGratitude({
        variables: { entryId: entry._id, gratitudeId },
        refetchQueries: [{ query: GET_ENTRY, variables: { date } }],
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form id="gratitudes-form">
        {entry?.gratitudes?.map((gratitude) => {
          return (
            <div key={gratitude._id}>
              {/* <input
                type="checkbox"
                name={gratitude.name}
                id={gratitude._id}
                checked={gratitude.isDone}
                onChange={(e) =>
                  handleEditGratitude(e.target.id, gratitude.isDone)
                }
              /> */}
              <label htmlFor={gratitude.text}>{gratitude.text}</label>
              <IconButton
                variant="ghost"
                size="xs"
                onClick={() => handleDeleteGratitude(gratitude._id)}
              >
                <LuX />
              </IconButton>
            </div>
          );
        })}
        <Editable.Root
          value={newGratitude}
          onValueChange={(e) => setNewGratitude(e.value)}
          onValueCommit={handleNewGratitude}
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

export default Gratitude;
