import React from "react";
import MainContainer from "./components/MainContainer";
import Typography from "@material-ui/core/Typography";
import Form from "./components/Form";
import Input from "./components/Input";
import {useForm} from "react-hook-form";
import PrimaryButton from "./components/PrimaryButton";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {useNavigate} from "react-router-dom";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import parsePhoneNumberFromString from "libphonenumber-js";
import {useData} from "./DataContext";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Email should have correct format")
        .required("Email is a required field"),
})

const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value)
    if (!phoneNumber) {
        return value
    }
    return phoneNumber.formatInternational()
}

export const Step2 = () => {
    const {data, setValues} = useData()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}, watch} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
        defaultValues: {email: data.email, hasPhone: data.hasPhone, phoneNumber: data.phoneNumber}
    })

    const hasPhone = watch('hasPhone', false)

    const onSubmit = (data) => {
        navigate("/step3")
        setValues(data)
    }

    return (
        <MainContainer>
            <Typography component={"h2"} variant={"h5"}> Step 2</Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    label="Email"
                    required
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            defaultValue={data.hasPhone}
                            defaultChecked={data.hasPhone}
                            id="hasPhone"
                            color="primary"
                            {...register("hasPhone")}
                        />}
                    label="Do you have a phone"
                />
                {
                    hasPhone && (
                        <Input
                            {...register("phoneNumber")}
                            id="phoneNumber"
                            type="tel"
                            label="Phone Number"
                            onChange={(e) => e.target.value = normalizePhoneNumber(e.target.value)}
                        />
                    )
                }
                <PrimaryButton>Next</PrimaryButton>
            </Form>
        </MainContainer>
    )
}