import { LoadingGameGrid } from '@/components/LoadingGameGrid';
import React from 'react';

export default function DebugLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LoadingGameGrid/>
    );
}