/*********************************************************************************
 *  WEB422 – Assignment 3
 *  Name: Abdullah Hussain
 *  Student ID: 118095225
 *  Date: (set date)
 *********************************************************************************/

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { isAuthenticated } from "@/lib/authenticate";

// PUBLIC (no login required)
const PUBLIC_PATHS = ["/", "/about", "/search", "/login", "/register", "/_error"];

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // initial check on first load
        authCheck(router.asPath);

        // run on every route change
        const handleRouteChange = (url) => authCheck(url);
        router.events.on("routeChangeComplete", handleRouteChange);

        // cleanup
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        const path = url.split("?")[0]; // remove query string

        // not logged in & going to a non-public path → send to /login
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }

    // only render children when authorized
    return <>{authorized && props.children}</>;
}
