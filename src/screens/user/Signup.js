import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { addUser } from '../../features/user/userSlice';

const Signup = () => {
    const [user, setUser] = useState({ tz: "", name: "", password: "", telephone: "", email: "" });
    const dispatch = useDispatch();
    const nav = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, dirtyFields },
    } = useForm({ mode: 'onBlur' });

    const onSubmit = (data) => {
        dispatch(addUser({ tz: data.tz, name: data.name, password: data.password, telephone: data.telephone, email: data.email }));
        console.log("add user");
        nav('/user');
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <TextField
                        id="tz"
                        label="ID:"
                        variant="filled"
                        error={!!errors.tz}
                        helperText={errors.tz ? errors.tz.message : ""}
                        onChange={(e) => setUser({ ...user, tz: e.target.value })}
                        {...register("tz", { required: "Field is required", pattern: { value: /^\d{9}$/, message: "The ID number is incorrect" } })}
                    />
                </div>
                <br />
                <div>
                    <TextField
                        id="name"
                        label="Name:"
                        variant="filled"
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        {...register("name", {
                            required: "Field is required",
                            pattern: { value: /^[A-Za-z]+$/, message: "Enter in English" }
                        })}
                    />
                </div>
                <br />
                <div>
                    <TextField
                        id="password"
                        label="Password:"
                        type="password"
                        variant="filled"
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ""}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                        {...register("password", { required: "Field is required" })}
                    />
                </div>
                <br />
                <div>
                    <TextField
                        id="telephone"
                        label="Telephone:"
                        type="tel"
                        variant="filled"
                        error={!!errors.telephone}
                        helperText={errors.telephone ? errors.telephone.message : ""}
                        onChange={(e) => setUser({ ...user, telephone: e.target.value })}
                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                        {...register("telephone", {
                            required: "Enter a phone number",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "The phone number is incorrect",
                            },
                        })}
                    />
                </div>
                <br />
                <div>
                    <TextField
                        id="email"
                        label="Email:"
                        type="email"
                        variant="filled"
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        {...register("email", {
                            required: "Field is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "The email address is invalid",
                            },
                        })}
                    />
                </div>
                <br />
                <div>
                    <TextField
                        id="confirmEmail"
                        label="Confirm Email:"
                        type="email"
                        variant="filled"
                        error={!!errors.confirmEmail}
                        helperText={errors.confirmEmail ? errors.confirmEmail.message : ""}
                        {...register("confirmEmail", {
                            required: "Field is required",
                            validate: value => value === getValues('email') || "Emails do not match"
                        })}
                    />
                </div>
                <br />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </form>
        </>
    );
}

export default Signup;
