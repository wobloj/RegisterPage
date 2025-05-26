import { useRef, useState } from "react"
import { Button } from "../components/Button"
import {motion} from "framer-motion"
import useDeleteUser from "../features/useDeleteUser"

export const DeleteUser = () => {
  const checkbox = useRef<HTMLInputElement>(null)
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const {handleDelete} = useDeleteUser()

  const handleCheckbox = () =>{
    if(checkbox.current === null) return;
    
    if(checkbox.current.checked)
      setIsDisabled(false)
    else
      setIsDisabled(true)
  }

  const handleOnDelete = async (e: React.FormEvent) =>{
    e.preventDefault();
    if(checkbox.current === null || checkbox.current.checked === false) return

    try {
      setIsDeleting(true)
      await handleDelete();
    } catch (error) {
      console.log(error)
    }finally{
      setIsDeleting(false)
    }
  }

  return (
    <motion.form
     onSubmit={handleOnDelete} 
     initial={{opacity:0}} 
     animate={{opacity:1}} 
     className="bg-[url(../src/assets/blob-haikei.svg)] bg-no-repeat bg-center flex flex-col justify-center items-center w-[600px] h-[600px] p-10 ">
      <p className="font-bold text-2xl">Are you sure to delete your account?</p>
      <p>This action is permanet.</p>
      <div className="flex flex-row justify-center items-center gap-2 my-6">
        <input ref={checkbox} onChange={handleCheckbox} type="checkbox" name="confirm" id="confirm" className="checked:bg-green-700"/>
        <label htmlFor="confirm">I am sure to delete this account.</label>
      </div>
      <Button text={isDeleting?`Deleting...`:`Delete`} type="submit" disabled={isDisabled}/>
    </motion.form>
  )
}
