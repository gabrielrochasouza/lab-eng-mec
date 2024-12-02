import { Button } from '@/components/ui/button';
import { ModeToggle } from '../mode-toggle';
import UffLogo from '@/assets/uff-logo.svg';
import UffLogoBranca from '@/assets/uff-logo-branca.svg';
import { Link } from 'react-router-dom';
import { useTheme } from '../theme-provider';


export default function Header() {
    const { theme } = useTheme();

    return (
        <div className='fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-30 mx-auto'>
            <nav className='h-12 flex items-center justify-between px-4'>
                <div className='flex items-center gap-2 text-xs font-light'>
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
                    <Button variant='ghost' className='rounded-full w-12 h-12 p-0 m-0 relative border-0'>
                        <ModeToggle />
                    </Button>
                </div>
            </nav>
        </div>
    );
}