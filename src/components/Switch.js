import React, {useContext} from "react";
import { useTheme, useThemeUpdate } from "../context/theme";

function Switch() {
    const dispatch = useContext(useThemeUpdate);
    const theme = useContext(useTheme);

    return (
        <div className='justify-center flex  text-2xl' onClick={() => dispatch({type: "toggle"})} >
            {theme ? '🌙 ' : '☾ '}
        </div>
    )
}

export default Switch;