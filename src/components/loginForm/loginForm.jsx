"use client";
import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import Link from 'next/link';
import styles from './loginForm.module.css'; // Import the CSS
import { handleGithubLogin } from '@/lib/action';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const handleGithubLogin = async () => {
        await signIn("github", { callbackUrl: "http://localhost:3000" });
    };
    const handleGoogleLogin = async () => {
        await signIn("google", { callbackUrl: "http://localhost:3000" });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("inside handle submit", formData.username, formData.password);

        const result = await signIn("credentials", {
            username: formData.username,
            password: formData.password,
            redirect: false,
        });
        console.log("result  ", result);

        if (result.error) {
            setError(result.error);
        } else {
            window.location.href = "/";
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
            <button className={styles.githubButton} onClick={handleGithubLogin}>Login with GitHub</button>
            <button className={styles.githubButton} onClick={handleGoogleLogin}>Login with Google</button> 
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className={styles.button}>Login with Credentials</button>
                </form>
                <div>
                    {error && <p >{error}</p>}
                    <p>Don't have an account? <Link href="/register" className={styles.link}>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
