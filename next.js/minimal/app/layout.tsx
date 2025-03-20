import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'next-auth0-minimal',
    description: 'next-auth0-minimal sample',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}

