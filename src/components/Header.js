import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";

const useStales = makeStyles((theme) => ({
    root: {
        fontFamily: "Permanent Marker",
        margin: theme.spacing(3, 0, 2), //сетка margin эл-тов(верх,право,низ,лево)
        textAlign: "center",
        fontSize: "40px",
        color: "deeppink",
        textShadow: "1px 1px darkmagenta"
    }
}))

export const Header = () => {

    const styles = useStales()

    return <Typography className={styles.root} component="h1" variant={"h5"}>Ultimate React Form Challenge</Typography>
}
// Typography обертка для управления текстом