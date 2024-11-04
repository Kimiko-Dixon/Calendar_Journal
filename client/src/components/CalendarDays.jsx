import {
  Button,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useState } from "react";
/* import { Dayjs } from "dayjs" */

const CalendarDays = ({ day }) => {
  const [open, setOpen] = useState(false);
  return (
    <PopoverRoot
      positioning={{ placement: "bottom-end" }}
      portalled={false}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <PopoverTrigger asChild>
        <Button variant="plain">{day}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>This is a popover</PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default CalendarDays;
