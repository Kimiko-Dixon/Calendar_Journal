import { ADD_ENTRY, EDIT_FREEWRITE } from "../utils/mutations";
import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { /* GET_ME,  */GET_ENTRY } from "../utils/queries";
("use client");
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import {
  Box,
  Editable,
  IconButton,
  VStack,
  HStack,
  Grid,
  GridItem,
  Show,
  Button,
  Stack,
  Separator,
  Link,
  List,
  ListItem,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "../components/ui/avatar";
import Priority from "../components/Priority";
import Habit from "../components/Habit";
import Gratitude from "../components/Gratitude";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import "./css/journal.css";
import { SimpleGrid } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
/* import Header from "../components/Header"; */

const Journal = ({user}) => {
  const [open, setOpen] = useState(false);

  /* Auth.loggedIn() ? null : window.location.assign("/login"); */
  const [addEntry] = useMutation(ADD_ENTRY);
  const [editFreeWrite] = useMutation(EDIT_FREEWRITE);
  /* const { data: userData } = useQuery(GET_ME); */
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const { loading, data: entryData } = useQuery(GET_ENTRY, {
    variables: { date },
  });
  const [freeWrite, setFreeWrite] = useState("");
  console.log("freeWrite: ", freeWrite);

  /* const user = userData?.me || {}; */
  const todaysEntry = useMemo(() => entryData?.getEntry, [date, entryData]);

  const handleNewEntry = async () => {
    try {
      const { data } = await addEntry({
        variables: { userId: user._id, date: date },
        refetchQueries: [{ query: GET_ENTRY, variables: { date } }],
      });
      setFreeWrite(
        data.addEntry.freeWrite === null ? "" : data.addEntry.freeWrite
      );
      console.log(
        "data: ",
        data,
        "entry:",
        data.addEntry,
        "freewrite: ",
        data.addEntry.freeWrite
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      dayjs(date).utc().format("YYYY-MM-DD") !=
      dayjs(todaysEntry?.date).utc().format("YYYY-MM-DD")
    ) {
      handleNewEntry();
    }
  }, [date]);

  useEffect(() => {
    setFreeWrite(todaysEntry?.freeWrite === null ? "" : todaysEntry?.freeWrite);
    console.log("entry: ", todaysEntry);
  }, [todaysEntry]);

  const handleFreeWriteEdit = async () => {
    try {
      await editFreeWrite({
        variables: { entryId: todaysEntry._id, freeWrite },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
        <VStack>
        {/* <input
          type="date"
          name="date"
          id="date"
          defaultValue={date}
          onChange={(e) => {
            setDate(e.target.value);
            console.log(e.target.value);
          }}
        /> */}
        <HStack width='100%' justifyContent='space-between'>
          <HStack id="date">
          <Heading size='3xl'  id='day'>{dayjs(date).utc().format("DD")}</Heading>
          <Box id='dow-my'>
            <Text id='dayofweek'>{dayjs(date).utc().format("dddd")}</Text>
            <Text id='month-year'>{dayjs(date).utc().format("MMM YYYY")}</Text>
          </Box>
            
          </HStack>

          <Box id="date-nav">
            <Button onClick={() => setDate(dayjs(date).subtract(1, "day").format("YYYY-MM-DD"))} variant='ghost' /* borderRadius='100%' */ asChild>
            <ion-icon name="arrow-back-circle-outline"/>
            </Button>
            <Button onClick={() => setDate(dayjs(date).add(1, "day").format("YYYY-MM-DD"))} variant='ghost' width='fit-content' asChild>
              <ion-icon name="arrow-forward-circle-outline"/>
            </Button>
          </Box>
        </HStack>

        <Separator variant="solid"/>

        
          <Grid templateColumns="repeat(2, 1fr)" templateRows="repeat(2, 1fr)"  height="82vh" width="100%"gap={4}>
            <GridItem height='100%' width='50vw'>
              <h3>What are my top priorities?</h3>
              {todaysEntry?.priorities?.map((priority) => {
                return (
                  <div key={priority._id}>
                    <Priority
                      entryId={todaysEntry?._id}
                      loading={loading}
                      priority={priority}
                      date={date}
                    />
                  </div>
                );
              })}
              <Priority
                entryId={todaysEntry?._id}
                loading={loading}
                date={date}
              />
            </GridItem>

            <GridItem height='100%' width='50vw'>
              <h3>What habits do I want to implement?</h3>
              {todaysEntry?.habits?.map((habit) => {
                return (
                  <div key={habit._id}>
                    <Habit
                      entryId={todaysEntry?._id}
                      loading={loading}
                      habit={habit}
                      date={date}
                    />
                  </div>
                );
              })}
              <Habit entryId={todaysEntry?._id} loading={loading} date={date} />
            </GridItem>
            <GridItem height='100%' width='50vw'>
              <h3>What am I grateful for?</h3>
              {todaysEntry?.gratitudes?.map((gratitude) => {
                return (
                  <div key={gratitude._id}>
                    <Gratitude
                      entryId={todaysEntry?._id}
                      loading={loading}
                      gratitude={gratitude}
                      date={date}
                    />
                  </div>
                );
              })}
              <Gratitude
                entryId={todaysEntry?._id}
                loading={loading}
                date={date}
              />
            </GridItem>
            <GridItem height='100%' width='50vw'>
              <h3>What is on your mind?</h3>
              <form id="freewrite-form">
                <Editable.Root
                  value={freeWrite}
                  onValueChange={(e) => {
                    setFreeWrite(e.value);
                  }}
                  onValueCommit={handleFreeWriteEdit}
                  /* placeholder="Freewrite" */
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
            </GridItem>
          </Grid>
        {/* </Box> */}
      </VStack>
  );
};

export default Journal;
