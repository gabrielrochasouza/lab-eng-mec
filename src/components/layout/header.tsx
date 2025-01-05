import { Button } from '@/components/ui/button';
import { ModeToggle } from '../mode-toggle';
import UffLogo from '@/assets/uff-logo-azul.svg';
import UffLogoBranca from '@/assets/uff-logo-branca.svg';
import { Link } from 'react-router-dom';
import { useTheme } from '../theme-provider';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { MenuIcon, Search } from 'lucide-react';


export default function Header() {
    const { theme } = useTheme();

    return (
        <>
            <div className='fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-30 mx-auto'>
                <nav className='h-12 flex items-center justify-between px-4'>
                    <div className='items-center md:hidden gap-2 text-xs font-light'>
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant="ghost" className='py-4 px-2'>
                                    <MenuIcon style={{ width: '24px', height: '24px' }} />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className='h-5/6'>
                                <div className="mx-auto w-full max-w-sm text-center text-3xl h-full flex gap-20 font-bold" style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                    <div>
                                        <Link to={'/'}>Home</Link>
                                    </div>
                                    <div>
                                        <Link to={'/estoque'}>Inventário Armário</Link>
                                    </div>
                                    <div>
                                        <Link to={'/guia-rapido'}>Guia Rápido</Link>
                                    </div>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                    <div className='items-center flex md:hidden gap-2 text-xs font-light flex-1'>
                        <Button
                            variant={'outline'}
                            className='px-2 m-0 min-w-[200px] h-[30px] justify-start'
                            style={{
                                color: 'hsl(var(--muted-foreground))',
                                background: 'var(--input-background)',
                                margin: '0 auto',
                                width: '95%',
                            }}
                        >
                            <Search />
                            Procurar...
                        </Button>
                    </div>
                    <div className='md:flex hidden items-center gap-2 text-xs font-light'>
                        <Link to={'/'}>
                            <Button variant='link' className='rounded-full w-12 h-12 p-0 mr-6'>
                                <img src={theme === 'light' ? UffLogo : UffLogoBranca} alt='Logo da Universidade Federal Fluminense' />
                            </Button>
                        </Link>
                        <div className='mx-4'>
                            <Link to={'/estoque'}>
                                Inventário Armário
                            </Link>
                        </div>
                        <div>
                            <Link to={'/guia-rapido'}>
                                Guia Rápido
                            </Link>
                        </div>
                    </div>
                    <div className='lg:mr-4 flex gap-2 item-center'>
                        <Button
                            variant={'outline'}
                            className='md:flex hidden px-2 m-0 min-w-[200px] h-[30px] justify-start w-4/5'
                            style={{
                                color: 'hsl(var(--muted-foreground))',
                                background: 'var(--input-background)',
                            }}
                        >
                            <Search />
                            Procurar...
                        </Button>
                        <Button variant='ghost' className='rounded-full w-7 h-7 p-0 m-0 relative border-0'>
                            <ModeToggle />
                        </Button>
                    </div>
                </nav>
            </div>
        </>
    );
}