import React, {useState, useRef} from 'react'
import {FC} from 'react'
import {motion} from 'framer-motion'

interface TabsListProps {
    tabList: string[];
    onTabChange: (form:string) => void;
    activeTab: string;
}

interface TabProps {
    children: React.ReactNode;
    isActive: boolean;
    setPosition: React.Dispatch<React.SetStateAction<{
        left: number,
        width: number,
        opacity: number
    }>>;
    onClick: () => void;
}

interface CursorProps {
    position: {
        left: number;
        width: number;
        opacity: number;
    }
}

export const TabsList:FC<TabsListProps> = ({tabList, onTabChange, activeTab}) => {
    const [position, setPosition] = useState({
        left:0,
        width:0,
        opacity:0,
    });

  return (
    <ul 
    onMouseLeave={() =>{setPosition(pv =>({
        ...pv,
        opacity:0,
    }))}} 
    className='flex flex-row gap-10 text-black font-bold text-3xl'>
        {tabList.map((tab, index) => (
            <Tab
            setPosition={setPosition}
            isActive={activeTab === tab.toLowerCase()} 
            onClick={() => onTabChange(tab)} 
            key={index}>
                {tab}
            </Tab>
        ))}
        <Cursor position={position}/>
    </ul>
  )
}

export const Tab:FC<TabProps> = ({children, isActive, setPosition, onClick}) => {
    const ref = useRef<HTMLLIElement>(null);
  return (
    <li
    ref={ref}
    onMouseEnter={() => {
        if(!ref.current) return;

        const {width} = ref.current.getBoundingClientRect();
        
        setPosition({
            width,
            left: ref.current.offsetLeft,
            opacity:1,
        })
    }}
    onClick={onClick} 
    className={`cursor-pointer block relative z-10 py-2 px-4 transition-colors ${isActive && 'text-indigo-500 '}`}>
        {children}
    </li>
  )
}

export const Cursor:FC<CursorProps> = ({position}) =>{
    return(
        <motion.li
        animate={position}
        className='absolute h-[52px] w-30 z-0 border-4 border-indigo-500 rounded-full'></motion.li>
    )
}
