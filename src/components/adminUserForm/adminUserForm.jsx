"use client";
import {  addUser } from '@/lib/action';
import React from 'react'
import { useFormState } from "react-dom"
import styles from "./adminUserForm.module.css";
const AdminUserForm = () => {
    const [state, formAction] = useFormState(addUser);

    return (
        <div>
            <form action={formAction} className={styles.container}>
                <h1>Add New User</h1>
                <input type="text" name="username" placeholder="Username" />
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder='Password' />
                <input type="text" name="img" placeholder="Image URL" />
                <select name="isAdmin">
                    <option value="false">IsAdmin</option>
                    <option value="false">No</option>
                    <option value = "true">Yes</option>
                </select>
                <button >Add User</button>
                {state && state.error}
            </form>
        </div>
    )
}

export default AdminUserForm
