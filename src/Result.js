import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import MainContainer from "./components/MainContainer";
import {useData} from "./DataContext";
import {
    List,
    ListItem, ListItemIcon, ListItemText, makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {InsertDriveFile} from "@material-ui/icons";
import PrimaryButton from "./components/PrimaryButton";
import Swal from "sweetalert2";
import ReactConfetti from "react-confetti";

const useStyles = makeStyles({
    root: {
        marginBottom: "30px",
    },
    table: {
        marginBottom: "30px",
    }
})

const Result = () => {
    const [success, setSuccess] = useState(false)
    const style = useStyles()
    const {data} = useData()
    const entries = Object.entries(data).filter(entry => entry[0] !== "files")
    const {files} = data

    const onSubmit = async () => {
        const formData = new FormData();
        if (data.files) {
            data.files.forEach((file) => {
                formData.append("files", file, file.name);
            });
        }

        entries.forEach((entry) => {
            formData.append(entry[0], entry[1]);
        });

        const res = await fetch("http://localhost:4000/", {
            method: "POST",
            body: formData,
        });

        if (res.status === 200) {
            Swal.fire("Great job!", "You've passed the challenge!", "success");
            setSuccess(true);
        }
    };

    if (success) {
        return <ReactConfetti />;
    }


    return (
        <MainContainer>
            <Typography component={"h2"} variant={"h5"}>Form Values</Typography>
            <TableContainer className={style.root} component={Paper}>
                <Table className={style.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Field</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map(entry => (
                            <TableRow key={entry[0]}>
                                <TableCell>{entry[0]}</TableCell>
                                <TableCell align="right">{entry[1] ? entry[1].toString() : null}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {files && (
                <>
                    <Typography component={"h2"} variant={"h5"}>Files</Typography>
                    <List>
                        {files.map((f, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <InsertDriveFile/>
                                </ListItemIcon>
                                <ListItemText primary={f.name} secondary={f.size}/>
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
            <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
            <Link to="/">Start over</Link>
        </MainContainer>
    );
};

export default Result;