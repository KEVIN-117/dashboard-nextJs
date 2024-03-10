"use client"

import { createContext, useState, ReactNode, useEffect } from 'react'
import { Sun } from '@/assets/icons/Sun'
import { Moon } from '@/assets/icons/Moon'

export const ThemeContext = createContext({
    currenTheme: 'light',
    setTheme: (theme: string) =>{},
    icon: <Sun/>,
    handleTheme: ()=>{}
})


export function ThemeProvider({children}:{children: ReactNode}){
    const [currenTheme, setTheme] = useState('light')
    const [icon, setIcon] = useState(currenTheme !== 'light' ? <Moon/> : <Sun/>)

    useEffect(() => {
        const themeName = localStorage.getItem('theme')
        setTheme(themeName!!!)
    }, []);

    const handleTheme = ()=>{
        if (currenTheme === 'light'){
            setTheme('dark')
            setIcon(<Sun/>)
            localStorage.setItem('theme', 'dark')
        }else{
            setTheme('light')
            setIcon(<Moon/>)
            localStorage.setItem('theme', 'light')
        }
    }

    const value = { currenTheme, setTheme, icon, handleTheme}
    return(
        <ThemeContext.Provider value={value}>
            <div className={`${currenTheme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}