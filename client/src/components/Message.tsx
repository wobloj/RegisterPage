import {FC} from 'react'
import {motion} from 'framer-motion'

interface MessageProps {
    type: 'error' | 'success' | 'info';
    children: React.ReactNode;
}

export const Message:FC<MessageProps> = ({type, children}) => {
  return (
      <motion.div
        initial={{scale:0}}
        animate={{scale:1}}
        exit={{scale:0}}
        className={`absolute font-bold text-xl bottom-8 left-1/2 transform -translate-x-1/2 rounded-xl py-10 px-20 border-4 bg-cream ${type==='success'&&'border-emerald-500 text-emerald-500'} ${type==='error'&&'border-red-400 text-red-400'} ${type==='info'&&'border-yellow-500 text-yellow-500'}`}>
          {children}
      </motion.div>
  )
}
