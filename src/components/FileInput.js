import React from 'react';
import {Controller} from "react-hook-form";
import Dropzone from "react-dropzone";
import {List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper} from "@material-ui/core";
import {CloudUpload, InsertDriveFile} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "20px",
        textAlign: "center",
        backgroundColor: "#eee",
        cursor: "pointer",
        color: "#333",
        padding: "10px",
    },
    icon: {
        marginTop: "16px",
        color: "#888",
        fontSize: "42px"
    }
}))


const FileInput = ({control, name}) => {

    const styles = useStyles()

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={[]}
            render={({field: {onChange, onBlur, value}}) => <>
                <Dropzone onDrop={onChange}>
                    {
                        ({getRootProps, getInputProps}) => (
                            <Paper className={styles.root} {...getRootProps()}>
                                <CloudUpload className={styles.icon}/>
                                <input name={name} onBlur={onBlur} {...getInputProps()}/>
                                <p>Drag and drop files here, or click on select files</p>
                            </Paper>)
                    }
                </Dropzone>
                <List>
                    {
                        value.map((f, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <InsertDriveFile/>
                                </ListItemIcon>
                                <ListItemText primary={f.name} secondary={f.size}/>
                            </ListItem>
                        ))
                    }
                </List>
            </>}
        />


    );
};

export default FileInput;