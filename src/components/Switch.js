import React, {useContext} from "react";
import { ThemeContext, ThemeDispatchContext } from "../context/theme";

function Switch() {
    const dispatch = useContext(ThemeDispatchContext);
    const theme = useContext(ThemeContext);

    return (
        <div className='justify-center flex' onClick={() => dispatch({type: "toggle"})} >
            {theme ? '🌙 Dark Mode' : '☾ Light Mode'}
        </div>
    )
}

export default Switch;