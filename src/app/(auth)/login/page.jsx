// "use client";

// import { handleGithubLogin } from "@/lib/action";
// import React from "react";
// import { useState } from "react";

// const LoginPage = () => {
//     const [formData, setFormData] = useState({ username: "", password: "" });
//     const [message, setMessage] = useState("");

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const response = await fetch("/api/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(formData),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             setMessage(data.success);
//         } else {
//             setMessage(data.error);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     return (
//         <div>
//             <button onClick={handleGithubLogin}>Login with GitHub</button>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 />
//                 <button type="submit">Login with Credentials</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default LoginPage;
"use client";

import LoginForm from "@/components/loginForm/LoginForm";
import React from "react";
const LoginPage = () => {
    return (
        <div>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;
