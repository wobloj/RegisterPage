import { Button } from "./Button"
import { motion } from "motion/react"
import { useNavigate } from "react-router"

export const Auth = () => {
    const navigate = useNavigate()
  return (
    <motion.div 
    initial={{opacity: 0}} 
    animate={{opacity: 1}} 
    className="bg-[url(../src/assets/blob-haikei.svg)] bg-no-repeat bg-center w-screen h-screen text-white flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-4xl">Access denied</h1>
        <p>You need to log in to get access to home page.</p>
        <Button text="Return" type="button" disabled={false} onClick={() => navigate('/')}></Button>
    </motion.div>
  )
}
