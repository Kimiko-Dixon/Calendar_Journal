import { Button, Tabs } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
/* import Calendar from '../pages/Calendar.jsx'
import Journal from '../pages/Journal.jsx' */
import { useLocation, Outlet } from "react-router-dom";
import Calendar from "../pages/Calendar";

const Nav = () => {

const location = useLocation()
/* const tabs = ['calendar', 'journal'] */
const [page, setPage] = useState('')
console.log(page)

useEffect(() => {
    location.pathname.includes('calendar') ? setPage('calendar') : setPage('journal')
    
},[page])

//   return (
//     <>
//       {/* <Button>logout</Button> */}
//       <Tabs.Root defaultValue={page} variant="outline">
//         <Tabs.List>
//           <Tabs.Trigger value="calendar" asChild>
//             {/* <Link unstyled href="/calendar"> */}
//               Calendar
//             {/* </Link> */}
//           </Tabs.Trigger>
//           <Tabs.Trigger value="journal" asChild>
//             {/* <Link unstyled href="/journal"> */}
//               Journal
//             {/* </Link> */}
//           </Tabs.Trigger>
//         </Tabs.List>
//         <Tabs.Content value={page}><Outlet/></Tabs.Content>
//         <Tabs.Content value={page === 'calendar' ? 'journal' : 'calendar'}>content</Tabs.Content>
//         {/* <Tabs.Content value={page}><Outlet/></Tabs.Content> */}
//       </Tabs.Root>
//     </>
//   );
return (
    <Tabs.Root value={page} /* onValueChange={() => setPage(page === 'calendar' ? 'journal' : 'calendar')} */>
      <Tabs.List>
        <Tabs.Trigger value="calendar" asChild>
          <Link unstyled href="/calendar">
            Calendar
          </Link>
        </Tabs.Trigger>
        <Tabs.Trigger value="journal" asChild>
          <Link unstyled href="/journal">
            Journal
          </Link>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value={page}><Outlet/></Tabs.Content>
      <Tabs.Content value={page === 'calendar' ? 'journal' : 'calendar'}>text</Tabs.Content>
    </Tabs.Root>
  )
};

export default Nav;
