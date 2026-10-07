import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '../shadcn/skeleton';
import { Suspense } from 'react';
import PublicHeaderAuth from './PublicHeaderAuth';

function PublicHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-muted bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
            <div className="container flex h-14 max-w-(--breakpoint-2xl) items-center justify-between px-4 mx-auto">
                <Link href='/' className="flex items-center gap-8">
                    <Image
                        width={240}
                        height={56}
                        src="/logo-light.svg"
                        alt="Company Logo"
                        loading='eager'
                        className="dark:hidden object-contain h-8 w-auto"
                    />

                    <Image
                        width={240}
                        height={56}
                        src="/logo-dark.svg"
                        alt="Company Logo"
                        loading='eager'
                        className="hidden dark:block object-contain h-8 w-auto"
                    />
                </Link>

                <div className="flex items-center gap-3">

                    <Link
                        href="/#how-it-works"
                        className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        How it works
                    </Link>
                    <Link
                        href="/pricing"
                        className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/contact"
                        className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Contact
                    </Link>

                    <Suspense fallback={<Skeleton className="h-12 w-12 rounded-full" />}>
                        <PublicHeaderAuth />
                    </Suspense>
                </div>
            </div>
        </header>
    )
}


export default PublicHeader