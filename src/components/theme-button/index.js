import { useContext } from 'react';
import { ThemeContext } from '../../App';
import './styles.css'

const ThemeButton = () => {
    const {theme, setTheme} = useContext(ThemeContext)
    console.log(theme, setTheme)
    return (
        <button style={theme ? {backgroundColor : 'gray'} : {}} onClick={() => setTheme(!theme)} className="theme-btn">Change Theme</button>
    )
}

export default ThemeButton;