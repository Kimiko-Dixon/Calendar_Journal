import Sidebar from "../components/Sidebar"
import { Navigate,useLocation,Outlet} from "react-router-dom";
import { Grid,GridItem } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_ME} from "../utils/queries";


const User = ({loggedIn}) => {
    const location = useLocation()
    const { data: userData } = useQuery(GET_ME);
    const user = userData?.me || {};

    return loggedIn ? (
        <Grid templateColumns="repeat(6, 1fr)"
    width='100%'>
      <GridItem colSpan={1}>
        <Sidebar user={user} />
      </GridItem>
      <GridItem colSpan={5}>
        <Outlet user={user}/>
      </GridItem>
        </Grid>
    ) : (<Navigate to='/login' replace  state={{from: location}} />)
}

export default User