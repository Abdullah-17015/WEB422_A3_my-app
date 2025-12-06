/*********************************************************************************
 *  WEB422 – Assignment 3
 *  Name: Abdullah Hussain
 *  Student ID: 118095225
 *  Date: 10th November 2025
 *********************************************************************************/

import { jwtDecode } from "jwt-decode";

// ✅ Base URL for the user-api
// Uses env if set, otherwise defaults to local API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

console.log("API_URL (frontend):", API_URL);

// ======== TOKEN HELPERS ========

export function setToken(token) {
    localStorage.setItem("access_token", token);
}

export function getToken() {
    return localStorage.getItem("access_token");
}

export function removeToken() {
    localStorage.removeItem("access_token");
}

export function readToken() {
    try {
        const token = getToken();
        return token ? jwtDecode(token) : null;
    } catch {
        return null;
    }
}

export function isAuthenticated() {
    return !!readToken();
}

// ======== LOGIN ========

export async function authenticateUser(userName, password) {
    const res = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        body: JSON.stringify({ userName, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
        if (data.token) {
            setToken(data.token);
            return true;
        }
        throw new Error("Login failed: token missing in response");
    } else {
        throw new Error(data.message || "Login failed");
    }
}

// ======== REGISTER ========

export async function registerUser(userName, password, password2) {
    const res = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        body: JSON.stringify({ userName, password, password2 }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
        // 200 response – registration success
        return true;
    } else {
        // Show backend message: "User Name already taken", "Passwords do not match", etc.
        throw new Error(data.message || "Registration failed");
    }
}
