"use client";
import { useState } from "react";
import styles from "./register.module.css";
import React from "react";
import Link from "next/link";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
    });
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            setMessage(data.success);
            window.location.href = "/login";
        } else {
            setMessage(data.error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="passwordRepeat"
                        value={formData.passwordRepeat}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className={styles.button}>Register</button>
                    {message && <p>{message}</p>}
                </form>
                <span>
                    Already have an account?
                    <Link href="/login" className={styles.link}><b> Login</b></Link>
                </span>
            </div>
        </div>
    );
};

export default RegisterForm;
