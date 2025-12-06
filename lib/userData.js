import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Generic authenticated request helper
async function authenticatedFetch(path, method = "GET") {
    const token = getToken();

    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `jwt ${token}`,
        },
    });

    let data = null;
    try {
        data = await res.json();
    } catch { }

    if (!res.ok) {
        throw new Error(data?.message || "Request failed");
    }

    return data;
}

/* ===========================
      FAVOURITES (Assignment)
   =========================== */

// GET /api/user/favourites
export function getFavourites() {
    return authenticatedFetch("/api/user/favourites");
}

// PUT /api/user/favourites/:id
export function addToFavourites(id) {
    return authenticatedFetch(`/api/user/favourites/${id}`, "PUT");
}

// DELETE /api/user/favourites/:id
export function removeFromFavourites(id) {
    return authenticatedFetch(`/api/user/favourites/${id}`, "DELETE");
}

/* ===========================
      HISTORY (Assignment)
   =========================== */

export function getHistory() {
    return authenticatedFetch("/api/user/history");
}

export function addHistory(q) {
    return authenticatedFetch(`/api/user/history/${encodeURIComponent(q)}`, "PUT");
}

export function removeHistory(q) {
    return authenticatedFetch(`/api/user/history/${encodeURIComponent(q)}`, "DELETE");
}
