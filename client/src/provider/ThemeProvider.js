import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
    const [pattern, setPattern] = useState("") 

    useEffect(() => {
        setPattern("https://i.pinimg.com/564x/14/05/b3/1405b33a082c28c4cf83bc4cf7f24a5e.jpg")
    }, [])

    return (
        <ThemeContext.Provider value={{ pattern, setPattern }}>
            { children }
        </ThemeContext.Provider>
    )
}