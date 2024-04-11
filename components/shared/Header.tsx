"use client"

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import Link from 'next/link'
import Langswitch from './Langswitch'

const Header = ({ lang, dict }: { lang: string; dict: any }) => {
    return (
        <header className="bg-white shadow-2xl position: fixed w-full">
            <nav className="mx-auto flex max-w-8xl items-center justify-between lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href={'/'} className="-m-1.5 p-1.5">
                        <img className="h-20 w-auto" src="/assets/images/Logo-Text.png" alt="Anime Maker" />
                    </a>
                </div>
                <div className="flex">
                    <div className='mr-5'>
                        <Langswitch />
                    </div>
                    <div>
                        <SignedIn>
                            <UserButton afterSignOutUrl='/' showName />
                        </SignedIn>
                        <SignedOut>
                            <Button asChild className="button bg-cover">
                                <Link href="/sign-in">Sign In</Link>
                            </Button>
                        </SignedOut>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header