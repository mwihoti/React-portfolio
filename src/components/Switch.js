import React, {useContext} from "react";
import { ThemeContext, ThemeDispatchContext } from "../context/theme";

function Switch() {
    const dispatch = useContext(ThemeDispatchContext);
    const theme = useContext(ThemeContext);

    return (
        <div className='justify-center flex  text-2xl' onClick={() => dispatch({type: "toggle"})} >
            {theme ? '🌙 ' : '☾ '}
        </div>
    )
}

export default Switch;