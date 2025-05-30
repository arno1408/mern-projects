import { useState, useEffect } from "react";

const SetTheme = () => {
    const [theme, setTheme] = useState(null);
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) { setTheme('dark'); }
        else { setTheme('light'); }
    }, [])

    useEffect(() => {
        if (theme === "dark") { document.documentElement.classList.add("dark"); }
        else { document.documentElement.classList.remove("dark"); }
    }, [theme]);

    return (
        <>
            <button type="button" className="dark:text-white" onClick={() => { setTheme(theme === "dark" ? "light" : "dark"); }} >toggle</button>
        </>
    )
}

export default SetTheme