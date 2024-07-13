'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const Callback = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        console.log("callback");

        const state = searchParams.get('state');
        const storedState = localStorage.getItem('oauth_state');

        // if (state !== storedState) {
        //     console.error('State mismatch: potential CSRF attack.');
        //     return;
        // }

        const code = searchParams.get('code');
        const codeVerifier = localStorage.getItem('code_verifier');
        const tokenUrl = process.env.NEXT_PUBLIC_LITUS_OAUTH_TOKEN;

        if (!tokenUrl) {
            throw new Error("Missing environment variables for OAuth flow");
        }

        console.log("code: ", code);
        console.log("codeVerifier: ", codeVerifier);

        if (code && codeVerifier) {
            console.log("code verified");
            axios.post(tokenUrl, {
                grant_type: 'authorization_code',
                code: code,
                client_id: process.env.NEXT_PUBLIC_LITUS_API_KEY,
                redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
                code_verifier: codeVerifier,
            })
                .then((response: { data: { accessToken: any; }; }) => {
                    const { accessToken } = response.data;
                    console.log("access_token: ", accessToken);

                    return axios.post(process.env.NEXT_PUBLIC_BACKEND_AUTH, { accessToken });
                })
                .then((response: { data: { jwt: any; }; }) => {
                    document.cookie = `jwt=${response.data.jwt}; path=/; HttpOnly; Secure`;

                    console.log("cookie: ", document.cookie);
                    router.push('/');
                })
                .catch((error: any) => {
                    console.error('Error during token exchange:', error);
                });
        }
    }, [searchParams, router]);

    return null;
};

export default Callback;
