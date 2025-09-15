'use client'

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function page() {

    return (
        <div className="h-screen w-full bg-dark-cyan text-white flex items-center justify-center flex-col">
            <h1 className="text-4xl font-bold">Settings Page - Coming Soon!</h1>
            <Button onClick={() => redirect('/dashboard')} variant={'link'} className="text-blue-200 text-xl">Go to Dashboard</Button>
        </div>
    )
}