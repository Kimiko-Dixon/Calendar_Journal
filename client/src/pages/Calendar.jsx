import CalendarComp from "../components/Calendar"
import { GET_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

const Calendar = ()=>{
    const { data:userData } = useQuery(GET_ME);
    const user = userData?.me || {};
    console.log(user)
    return (
        <CalendarComp user={user} />
    )
}

export default Calendar