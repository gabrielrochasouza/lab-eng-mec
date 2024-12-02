import Header from '@/components/layout/header';
import { ReactNode } from 'react';

export default function Layout ({children}: { children: ReactNode}) {

    return (
        <main className='mx-auto'>
            <Header />
            <div className='min-h-80'>
                {children}
            </div>
        </main>
    );
};