import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import WhiteGrid from '@/assets/whiteGrid.svg';
import BlackGrid from '@/assets/blackGrid.svg';
import DarkShadowEllipsis from '@/assets/darkShadowEllipsis.svg';
import WhiteShadowEllipsis from '@/assets/whiteShadowEllipsis.svg';
import { useTheme } from '@/components/theme-provider';

export default function MainPage () {
    const {theme} = useTheme();
    const grid = theme === 'dark' ? WhiteGrid : BlackGrid;
    const ellipsis = theme === 'dark' ? DarkShadowEllipsis : WhiteShadowEllipsis;
    return (
        <Layout>
            <div className='pt-16 px-8 overflow-x-hidden'>
                <img style={{ zIndex: '-1', objectFit: 'cover', minHeight: '800px', maxWidth: '100%' }} src={ellipsis} alt='shadow ellipsis' className='absolute top-0 left-0' />
                <div style={{ backgroundImage: `url(${grid})`, height: '80vh', minHeight: '400px', maxHeight: '670px', backgroundSize: '2000px' }} className='text-center bg-center min-h-80 flex flex-col justify-center items-center animate-in fade-in transition duration-700'>
                    <span>Universidade Federal Fluminense</span>
                    <h1 className='font-bold leading-tight tracking-tighter text-3xl md:text-6xl lg:text-7xl lg:leading-[1.1] max-w-3xl'>
                        Laboratório de Mecânica Aplicada - Sala A-27
                    </h1>
                    <div className='max-w-2xl font-light text-foreground my-4 md:text-md mx-auto'>
                        EEIMVR - ESCOLA DE ENGENHARIA INDUSTRIAL METALÚRGICA DE VOLTA REDONDA
                    </div>
                    <div className='flex gap-2 justify-center'>
                        {/* <Button variant='default'>Agendar Visita</Button> */}
                        <Link to='/guia-rapido'>
                            <Button variant='outline'>Ver Guia Rápido</Button>
                        </Link>
                    </div>
                </div>
                {/* <Separator className='mt-12' /> */}
            </div>
            <section className='py-8 px-8 mt-20'>
                <h2 className='font-bold text-2xl mb-4'>Perguntas Frequentes</h2>
                <Card className='overflow-hidden bg-transparent'>
                    <Accordion type="single" collapsible className="w-full bg-transparent">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='px-4'>Que tipos de ensaios é possível fazer no laboratório?</AccordionTrigger>
                            <AccordionContent className='px-4'>
                                Ensaios de tração e compressão.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className='px-4'>Quais equipamentos há no laboratório?</AccordionTrigger>
                            <AccordionContent className='px-4'>
                                Há uma CNC fanuc 0i ROMI D800, uma Máquina Universal de Ensaios Mecânicos EMIC DL 2000 de 20KN e Maquina Universal De Ensaios 600KN Emic
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className='px-4'>O que preciso para agendar uma visita?</AccordionTrigger>
                            <AccordionContent className='px-4'>
                                É necessário entrar em contato com o técnico responsável do laboratório de mecânica aplicada.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card>
            </section>
        </Layout>
    );
};
