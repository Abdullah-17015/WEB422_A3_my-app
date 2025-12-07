import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";

import { isAuthenticated } from "@/lib/authenticate";
import { getFavourites } from "@/lib/userData";

const PUBLIC_PATHS = ["/login", "/register", "/about", "/_error"];

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [, setFavouritesList] = useAtom(favouritesAtom);

    async function updateAtom() {
        try {
            const favs = await getFavourites();
            setFavouritesList(favs);
        } catch (err) {
            setFavouritesList([]);
        }
    }

    useEffect(() => {
        authCheck(router.pathname);
        updateAtom();

        const hideContent = () => setAuthorized(false);
        const showContent = (url) => authCheck(url);

        router.events.on("routeChangeStart", hideContent);
        router.events.on("routeChangeComplete", showContent);

        return () => {
            router.events.off("routeChangeStart", hideContent);
            router.events.off("routeChangeComplete", showContent);
        };
    }, []);

    function authCheck(url) {
        const path = url.split("?")[0];

        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }

    return <>{authorized && props.children}</>;
}
