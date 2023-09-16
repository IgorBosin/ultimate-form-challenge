import React from "react";
import MainContainer from "./components/MainContainer";
import Typography from "@material-ui/core/Typography";
import Form from "./components/Form";
import {useForm} from "react-hook-form";
import PrimaryButton from "./components/PrimaryButton";
import {useNavigate} from "react-router-dom";
import FileInput from "./components/FileInput";
import {useData} from "./DataContext";

export const Step3 = () => {
    const {data, setValues} = useData()
    const navigate = useNavigate()
    const {control, handleSubmit} = useForm({
        defaultValues:{files:data.files}
    })

    const onSubmit = (data) => {
        navigate("/result")
        setValues(data)
    }

    return (
        <MainContainer>
            <Typography component={"h2"} variant={"h5"}>
                Step 3
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FileInput name="files" control={control}/>
                <PrimaryButton>Next</PrimaryButton>
            </Form>
        </MainContainer>
    )
}