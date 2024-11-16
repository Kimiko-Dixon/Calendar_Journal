import { Box, Button, HStack, VStack, Grid, GridItem, /* PaginationRoot, PaginationNextTrigger,PaginationPrevTrigger */} from "@chakra-ui/react";
import CalendarDays from "./CalendarDays";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const CalendarComp = () => {
  /* console.log(dayjs().month(0).format('MMMM')); */

  /* const [page,setPage] = useState(dayjs().month()+1) */
  const [month, setMonth] = useState(dayjs().month());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [year, setYear] = useState(dayjs().year())
  const [offsetDay, setOffsetDay] = useState(0);

  useEffect(() => {
    const days = []
    for (let i = 0; i < dayjs(`${month + 1}/1/${year}`).daysInMonth(); i++) {
        days.push(i + 1);
    }
    const dayOfWeek = dayjs(`${month + 1}/1/${year}`).day()
    setOffsetDay(dayOfWeek)
    setDaysInMonth(days);
  }, [month]);
  /*useEffect(()=>{

    },[month]) */
    const changeMonth = (direction) => {
        // console.log('offsetDay:',offsetDay)
        console.log('direction',direction)
        let m = 0
        let y = 0
        switch(direction){
            case 'prev':
                m = month === 0 ? 11 : month - 1
                y = month === 0 ? year - 1 : year
                break
            case 'next':
                m = month === 11 ? 0 : month + 1
                y = month === 11 ? year + 1 : year
                break
        }
        console.log('month',m,'year',y,'offset',offsetDay)
        setMonth(m)
        setYear(y)
    }
  return (
    <Box>
      <VStack>
        <HStack>
          <Box>{dayjs().month(month).format('MMMM')} {year}</Box>
          <Box>
            <Button
                onClick={(e) => changeMonth(e.target.id)}
                id="prev"
               /*  disabled={true} */
                variant="ghost"
            >
                {"<"}
            </Button>
            <Button
                onClick={(e) => changeMonth(e.target.id)}
                id="next"
            >
                {">"}
            </Button>
          </Box>
        </HStack>
        <Box border="1px,solid, black">
          <Grid templateColumns="repeat(7, 1fr)" gap="6">
            {/* figure out fr and gap */}
            <GridItem>
                Sunday
            </GridItem>
            <GridItem>
                Monday
            </GridItem>
            <GridItem>
                Tuesday
            </GridItem>
            <GridItem>
                Wednesday
            </GridItem>
            <GridItem>
                Thursday
            </GridItem>
            <GridItem>
                Friday
            </GridItem>
            <GridItem>
                Saturday
            </GridItem>
            {offsetDay > 0 ? <GridItem colSpan={offsetDay}/> : null}
            {daysInMonth.map((day) => {
                return (
                    <CalendarDays key={day} day={day}/>
                )
            })}  
          </Grid>
        </Box>
      </VStack>
    </Box>
  );
};

export default CalendarComp;
