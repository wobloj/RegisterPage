import useFetchUsers from "../features/useFetchUsers";
import {motion} from "framer-motion";

import { Button } from "../components/Button"
import { Table } from "../components/Table";


export const FetchUsers = () => {
    const {users, isLoading, MessageComponent, fetchUsers} = useFetchUsers();

  return (
    <>
      <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}>
          <div className="flex flex-col justify-center items-center gap-4">
              <Button text={isLoading?"Fetching...":"Fetch users"} type="button" disabled={false} className="bg-indigo-500" onClick={fetchUsers}/>
          </div>
          <div className="flex flex-col justify-center items-center mt-8">
              {users.length > 0 && <Table data={users} />}
          </div>
          <MessageComponent/>
      </motion.div>
    </>
  )
}
