import React, {forwardRef} from "react";
import {TextField} from "@material-ui/core";

const Input = forwardRef(function Input(props, ref) {

    return (
        <TextField
            variant={"outlined"}
            margin={"normal"}
            ref={ref}
            fullWidth // растянуть на всю ширину контейнера
            {...props}
        />
    );
});

export default Input;