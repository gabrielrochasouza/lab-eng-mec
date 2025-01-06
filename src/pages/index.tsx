import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function MainPage () {
    return (
        <Layout>
            <div className='pt-12 px-8'>
                <div className='mt-20'>
                    <span>Universidade Federal Fluminense</span>
                    <h1 className='font-bold leading-tight tracking-tighter text-3xl lg:leading-[1.1]'>
                        Laboratório de Mecânica Aplicada - Sala A-27
                    </h1>
                    <div className='max-w-2xl font-light text-foreground my-4 md:text-md'>
                        EEIMVR - ESCOLA DE ENGENHARIA INDUSTRIAL METALÚRGICA DE VOLTA REDONDA
                    </div>
                    <div className='flex gap-2'>
                        {/* <Button variant='default'>Agendar Visita</Button> */}
                        <Link to='/guia-rapido'>
                            <Button variant='outline'>Ver Guia Rápido</Button>
                        </Link>
                    </div>
                </div>
                <Separator className='mt-12' />
            </div>
            <section className='py-8 px-8'>
                <h2 className='font-bold text-2xl mb-4'>Perguntas Frequentes</h2>
                <Card className='overflow-hidden'>
                    <Accordion type="single" collapsible className="w-full">
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
