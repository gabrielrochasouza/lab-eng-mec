import UffLogo from '@/assets/uff-logo-azul.svg';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

const Chat = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='flex items-center p-1 fixed bottom-2 right-2 w-[40px] h-[40px] rounded-full border-solid border-2 border-sky-500 bg-white cursor-pointer'>
                        <img src={UffLogo} className='w-full' />
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-[600px] p-0">
                    <DialogDescription>
                        <Card className='border-0'>
                            <DialogHeader className='p-4'>
                                <DialogTitle className='pb-0 inline-block'>Faça uma pergunta</DialogTitle>
                            </DialogHeader>
                            <Separator />
                            <ScrollArea className='py-0'>
                                <CardContent className='min-h-[200px] max-h-[420px] p-4'>
                                    <div className='flex gap-2 flex-start mb-2'>
                                        <Avatar className='border-4 border-solid w-12 h-12 bg-white'>
                                            <AvatarFallback>U</AvatarFallback>
                                            <AvatarImage style={{ objectFit: 'contain' }} src={UffLogo} alt='Logo da Uff'/>
                                        </Avatar>
                                        <div className='rounded-[12px] p-4' style={{ backgroundColor: 'var(--code-background)' }}>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
                                            temporibus possimus? Aspernatur exercitationem veritatis dolorem ab,
                                            sint rerum voluptatem ex doloremque. Sed possimus tempora unde adipisci
                                            ipsam, accusantium dolores! Praesentium!
                                        </div>
                                    </div>
                                </CardContent>
                            </ScrollArea>
                            <Separator />
                            <form>
                                <CardFooter className='gap-2 p-4'>
                                    <Input placeholder='Faça uma pergunta a IA' />
                                    <Button><SendHorizonal /></Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Chat;