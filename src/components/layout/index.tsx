import Header from '@/components/layout/header';
import { ReactNode, useState } from 'react';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { getStocksAndPosts } from '@/services/api';
import { IStocksAndPosts } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function Layout ({children}: { children: ReactNode}) {
    const [openCommand, setOpenCommand] = useState<boolean>(false);
    const { data: stocksAndPosts } = useQuery<IStocksAndPosts, Error>({
        queryKey: ['stocksAndPosts'],
        queryFn: getStocksAndPosts,
    });

    const posts = stocksAndPosts?.posts;
    const stocks = stocksAndPosts?.stocks;
    return (
        <main className='mx-auto max-w-screen-2xl relative'>
            <Header setOpenCommand={setOpenCommand} />
            <div className='min-h-80'>
                {children}
            </div>
            <CommandDialog open={openCommand} onOpenChange={(open) => setOpenCommand(open)} modal>
                <CommandInput placeholder="Digite a sua busca"/>
                <div className='w-full h-full'>
                    <CommandList className='custom-scroll'>
                        <CommandEmpty>Nada encontrado.</CommandEmpty>
                        <CommandGroup heading="Guia">
                            {posts?.map(({ title, slug, id }) => (
                                <Link key={`guia-rapido-${id}`} to={`/guia-rapido/${slug}`}>
                                    <CommandItem key={id}>
                                        <span>{title}</span>
                                    </CommandItem>
                                </Link>
                            ))}
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Inventário">
                            {stocks?.map(({ itemTitle, itemSlug, id }) => (
                                <Link key={`estoque-${id}`} to={`/estoque?item=${itemSlug}`}>
                                    <CommandItem key={id}>
                                        <span>{itemTitle}</span>
                                    </CommandItem>
                                </Link>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </div>
            </CommandDialog>
        </main>
    );
};