'use client'
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
const ThemeSwitcher = () => {
    const [mount, setMount] = useState(false);
    const { theme, setTheme } = useTheme('light');
    useEffect(() => setMount(true), [])
    if (theme === 'dark') {
        return <MdLightMode className="cursor-pointer transition-all hover:translate-y-100 hover:scale-150 duration-500 text-3xl inline-block ml-2 mr-3 my-0.5" onClick={() => setTheme('light')} />
    }
    if (theme === 'light') {
        return <MdDarkMode onClick={() => setTheme('dark')} />
    }
}

export default ThemeSwitcher