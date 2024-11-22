import {
  Button
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Event from "./Event";
import dayjs from "dayjs";
import { GET_DAY } from "../utils/queries";
import { useQuery } from "@apollo/client";

/* import { Dayjs } from "dayjs" */

const CalendarDays = ( {date, day, user} ) => {
  console.log(user)
  const {loading,data} = useQuery(GET_DAY,{
    variables:{date}
  })

  const [addEventButton,setAddEventButton] = useState(false)
  console.log("calendarDays: ",addEventButton)
  /* useEffect(()=>{

  },[addEventButton]) */
  return (
    <>
      <Button
          h="10svh"
          variant="plain"
          display="flex"
          justifyContent="left"
          alignItems="flex-start"
          onDoubleClick={() => setAddEventButton(true)}
        >
          {day}
          
        
        </Button>
        {data?.getDay?.events?.map((event)=>{
          return (
            <div key={event._id}>
               <Event event={event} user={user} date={date} day={data?.getDay} loading={loading} />
            </div>
          )
        })}
        {addEventButton ? (<Event addEventButton={addEventButton} setAddEventButton={setAddEventButton} user={user} date={date} day={data?.getDay} loading={loading}/>) : null}
    </>
  );
};

export default CalendarDays;
