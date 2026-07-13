import Link from "next/link";

export default function AuthPage(){
    return(
        <main className="flex flex-col min-h-screen items-center justify-center">
            <h1 className="font-semibold text-2xl mb-6 text-[var(--text-color)]">
                Welcome to Job Board Portal
            </h1>
            <div className="flex gap-4">
            <Link href={'/login'}><button className="btn">Login</button></Link>
            <Link href={'/signup'}><button className="btn">Signup</button></Link>
            </div>
        </main>
    )
}