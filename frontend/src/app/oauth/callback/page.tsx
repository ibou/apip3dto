'use client'

import {LitusOAuthCallback} from "@/utils/oauth";
import React, {Suspense, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import ErrorPage from "@/components/error/ErrorPage";
import LoadingPage from "@/components/common/LoadingPage";

export default function OAuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        (async () => {
            try {
                if (!searchParams.has('code')) {
                    throw new Error('Code is missing in search params');
                }
                if (!searchParams.has('state')) {
                    throw new Error('State is missing in search params');
                }

                await LitusOAuthCallback(router, searchParams);
            } catch (err: any) {
                setError(err);
            }
        })();
    }, [router, searchParams]);

    if (error) {
        return <ErrorPage detail={error.message} />;
    }

    return (
        // useSearchParams() needs to be wrapped in Suspense boundary
        // (https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout)
        <Suspense>
            <LoadingPage />
        </Suspense>
    );
}