import {
  Button,
  Editable,
  Fieldset,
  HStack,
  Input,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
  Stack,
} from "@chakra-ui/react";

import {
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  ADD_DAY,
} from "../utils/mutations";
import { useEffect, useState } from "react";
import { Field } from "./ui/field";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DAY } from "../utils/queries";
import dayjs from "dayjs";
/* import utc from 'dayjs/plugin/utc'
dayjs.extend(utc) */

const Event = ({
  date,
  addEventButton,
  setAddEventButton,
  event,
  user,
  day,
  loading,
}) => {
  console.log("event: ", addEventButton);
  console.log(day);
  const [addDay] = useMutation(ADD_DAY);
  const [open, setOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState({
    name: "",
    startDay: dayjs(date).format("YYYY-MM-DD"),
    startTime: dayjs().format("HH:mm"),
    endDay: dayjs(date).format("YYYY-MM-DD"),
    endTime: dayjs().add(1, "hour").format("HH:mm"),
    location: "",
  });
  const [addEvent] = useMutation(ADD_EVENT);
  const [editEvent] = useMutation(EDIT_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const handleNewDay = async () => {
    try {
      await addDay({
        variables: { userId: user._id, date },
        refetchQueries: [{ query: GET_DAY, variables: { date } }],
      });
      console.log("event2: ", addEventButton);
      addEventButton ? setOpen(true) : setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleNewDay();
    if (event) {
      const { name, start, end, location } = event;
      setEventInfo({
        name,
        startDay: dayjs(start).format("YYYY-MM-DD"),
        startTime: dayjs(start).format("HH:mm"),
        endDay: dayjs(end).format("YYYY-MM-DD"),
        endTime: dayjs(end).format("HH:mm"),
        location,
      });
    }
  }, [loading]);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const { name, startDay, startTime, endDay, endTime, location } = eventInfo;
    const start = dayjs(startDay)
      .set("hour", parseInt(startTime.substring(0, 2)))
      .set("minute", parseInt(startTime.substring(3, 5)))
      .set("second", 0)
      .toISOString();
    const end = dayjs(endDay)
      .set("hour", parseInt(endTime.substring(0, 2)))
      .set("minute", parseInt(endTime.substring(3, 5)))
      .set("second", 0)
      .toISOString();
    /* console.log(formatStart) */

    try {
      const { data } = await addEvent({
        variables: { dayId: day._id, event: { name, start, end, location } },
      });
      console.log(data);
      //needed?
      setEventInfo({
        name: "",
        startDay: dayjs(date).format("YYYY-MM-DD"),
        startTime: dayjs().format("HH:mm"),
        endDay: dayjs(date).format("YYYY-MM-DD"),
        endTime: dayjs().add(1, "hour").format("HH:mm"),
        location: "",
      });
      setAddEventButton(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditEvent = async (e) => {
    try{
    e.preventDefault();
    const { name, startDay, startTime, endDay, endTime, location } = eventInfo;
    const start = dayjs(startDay)
      .set("hour", parseInt(startTime.substring(0, 2)))
      .set("minute", parseInt(startTime.substring(3, 5)))
      .set("second", 0)
      .toISOString();
    const end = dayjs(endDay)
      .set("hour", parseInt(endTime.substring(0, 2)))
      .set("minute", parseInt(endTime.substring(3, 5)))
      .set("second", 0)
      .toISOString();
      await editEvent({
        variables: { dayId: day._id, eventId: event._id, event: { name, start, end, location }}
      })
      setOpen(false)
    }
    catch(err){
      console.log(err)
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent({
        variables: { dayId: day._id, eventId: event._id },
      });
      //needed?
      setEventInfo({
        name: "",
        startDay: dayjs(date).format("YYYY-MM-DD"),
        startTime: dayjs().format("HH:mm"),
        endDay: dayjs(date).format("YYYY-MM-DD"),
        endTime: dayjs().add(1, "hour").format("HH:mm"),
        location: "",
      });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PopoverRoot
      /* positioning={{ placement: "bottom-end" }} 
        portalled={false}*/
      lazyMount
      unmountOnExit
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        if (open) {
          addEventButton ? setAddEventButton(false) : null;
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
        /*h="10svh"
            variant="outline"
             display="flex"
            justifyContent="left"
            alignItems="flex-start" */
        >
          {event?.name ? event?.name : "New Event"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <form onSubmit={event ? handleEditEvent : handleAddEvent}>
            <Stack gap="4">
              <Field label="Event">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={eventInfo.name}
                  onChange={(e) => {
                    setEventInfo({
                      ...eventInfo,
                      name: e.target.value,
                    });
                    console.log(e.target.value);
                  }}
                />
              </Field>

              <Fieldset.Root>
                <Fieldset.Legend>Start</Fieldset.Legend>
                <Fieldset.Content>
                  <HStack>
                    <Field>
                      <input
                        type="date"
                        name="startDay"
                        id="startDay"
                        value={eventInfo.startDay}
                        onChange={(e) => {
                          setEventInfo({
                            ...eventInfo,
                            startDay: e.target.value,
                          });
                          console.log(e.target.value);
                        }}
                      />
                    </Field>
                    <Field>
                      <input
                        type="time"
                        name="startTime"
                        id="startTime"
                        value={eventInfo.startTime}
                        onChange={(e) => {
                          setEventInfo({
                            ...eventInfo,
                            startTime: e.target.value,
                          });
                          /* console.log(
                            dayjs(eventInfo.startDay).set('hour', parseInt(eventInfo.startTime.substring(0,2))).set('minute', parseInt(eventInfo.startTime.substring(3,5))).set('second', 0).format("YYYY-MM-DDTHH:mm:ssZ[Z]")
                          ); */
                        }}
                      />
                    </Field>
                  </HStack>
                </Fieldset.Content>
              </Fieldset.Root>

              <Fieldset.Root>
                <Fieldset.Legend>End</Fieldset.Legend>
                <Fieldset.Content>
                  <HStack>
                    <Field>
                      <input
                        type="date"
                        name="endDay"
                        id="endDay"
                        value={eventInfo.endDay}
                        onChange={(e) => {
                          setEventInfo({
                            ...eventInfo,
                            endDay: e.target.value,
                          });
                          console.log(e.target.value);
                        }}
                      />
                    </Field>
                    <Field>
                      <input
                        type="time"
                        name="endTime"
                        id="endTime"
                        value={eventInfo.endTime}
                        onChange={(e) => {
                          setEventInfo({
                            ...eventInfo,
                            endTime: e.target.value,
                          });
                          console.log(e.target.value);
                        }}
                      />
                    </Field>
                  </HStack>
                </Fieldset.Content>
              </Fieldset.Root>

              <Field label="Location">
                <Input
                  type="text"
                  name="location"
                  id="location"
                  value={eventInfo.location}
                  onChange={(e) => {
                    setEventInfo({ ...eventInfo, location: e.target.value });
                    console.log(e.target.value);
                  }}
                />
              </Field>
              <HStack display="flex" justifyContent="center">
                <Button type="submit">Save Event</Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                    addEventButton ? setAddEventButton(false) : null;
                  }}
                >
                  Cancel
                </Button>
              </HStack>
              {event ? (
                <Button onClick={handleDeleteEvent}>Delete Event</Button>
              ) : null}
            </Stack>
          </form>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default Event;
