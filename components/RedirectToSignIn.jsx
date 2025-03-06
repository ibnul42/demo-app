'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Redirects to "/sign-in" after a delay.
 * @param {number} delay - Time in milliseconds before redirecting (default: 5000ms)
 */
const RedirectToSignIn = ({ delay = 5000 }) => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/welcome");
        }, delay);

        return () => clearTimeout(timer);
    }, [router, delay]);

    return null;
};

export default RedirectToSignIn;