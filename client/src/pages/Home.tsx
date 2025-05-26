import { useState } from "react"
import { useUser } from "../context/UserContext";
import { TabsList } from "../components/TabsList";
import { FetchUsers } from "./FetchUsers";
import { UpdateUser } from "./UpdateUser";
import { DeleteUser } from "./DeleteUser";
import { ProfileView } from "../components/ProfileView";
import { Auth } from "../components/Auth";

export const Home = () => {

    const [form, setForm] = useState<string>('fetch users');

    const { userId } = useUser()

    const handleTabChange = (selectedForm: string) => {
      setForm(selectedForm.toLowerCase() as string);
      console.log(form);
    }

    if (!userId) {
      return <>
        <Auth/>
      </>
  }

  return (
    <div className="relative flex flex-col items-center justify-start gap-10 h-screen">
      <ProfileView/>
      <p className="text-indigo-500 font-bold text-4xl my-4 text-center">Home</p>
        <TabsList activeTab={form} tabList={["FETCH USERS", "UPDATE USER", "DELETE USER"]} onTabChange={handleTabChange}/>
        {form === "fetch users" && (
          <>
            <FetchUsers/>
          </>
          )}
        {form === "update user" && (
          <>
            <UpdateUser/>
          </>
          )}
        {form === "delete user" &&(
          <>
            <DeleteUser/>
          </>
        )}
    </div>
  )
}
