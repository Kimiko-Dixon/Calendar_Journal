import { Box, Button, Link, List, Stack, Text} from "@chakra-ui/react";
import Auth from '../utils/auth.js'
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
  } from './ui/drawer.jsx'
  import {
    Avatar, AvatarGroup 
  } from "./ui/avatar.jsx";
const Sidebar = ({user}) => {
    return (
        <Box>
            <Stack>
          <Avatar name={user.username}/> 
            <Link href="/">Home</Link>
            <Link href="/calendar">Calendar</Link>
            <Link href="/journal">Journal</Link>
            <Text onClick={Auth.logout}>Logout</Text>
          </Stack>
        </Box>
    )
  {/* return (
    <DrawerRoot placement="start" size='xs'>
      <DrawerBackdrop />
      <DrawerTrigger asChild >
        <Button>menu</Button>
      </DrawerTrigger>
      <DrawerContent  >
        
        <DrawerHeader>
          <DrawerTitle />
        </DrawerHeader>
        <DrawerBody>
          <Stack>
          <Avatar name={user.username}/> 
            <Link href="/">Home</Link>
            <Link href="/calendar">Calendar</Link>
            <Link href="/journal">Journal</Link>
            <Text onClick={Auth.logout}>Logout</Text>
          </Stack>
        </DrawerBody>
        <DrawerCloseTrigger/> 
      </DrawerContent>
    </DrawerRoot> 


  );*/}
};

export default Sidebar;
