import { useUser } from "../context/UserContext"
import axios from "axios";
import { useNavigate } from "react-router";

export const ProfileView = () => {
    const {username, clearUserContext} = useUser();
    const navigate = useNavigate()

    const logOut = async () =>{
      try {
        const res = await axios.post("http://localhost:5000/auth/logout",
          {},
          {withCredentials:true,
            headers: {
              'Content-Type': 'application/json'
          }
          });

          if (res.status === 200){
            clearUserContext();
            navigate("/")
          }
        
      } catch (error) {
        console.log(error)
      }
        
    }

  return (
    <div className="absolute px-8 py-4 top-0 left-0 flex flex-col items-center justify-center border-2 rounded-2xl border-indigo-300 bg-indigo-500 m-4">
        <p className="">Hi <span className="font-bold">{username}</span>!</p>
        <a href="/" onClick={logOut} className="text-center font-bold text-white hover:text-indigo-200">Log out!</a>
    </div>
  )
}
