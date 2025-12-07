import { jwtDecode } from "jwt-decode";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


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
        return true;
    } else {
        throw new Error(data.message || "Registration failed");
    }
}
