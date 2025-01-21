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
import { Button } from '@/components/ui/button';
import { SendHorizonal, LoaderCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useChat } from 'ai/react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';

const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit, setInput, isLoading } = useChat({
        api: String(import.meta.env.VITE_CHATBOT_URL)
    });

    const scrollContentRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        if (scrollContentRef.current) {
            console.log(scrollContentRef.current);
            scrollContentRef.current.scrollTo({
                top: scrollContentRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.keyCode == 13 && e.shiftKey == false && !isLoading) {
            e.preventDefault();
            handleSubmit();
        }
    };
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (!isLoading) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const clickExample = (text: string) => {
        if (!isLoading) {
            setInput(text);
            handleSubmit();
        }
    };

    const examples = [
        'O que é usinagem?',
        'Quais etapas para ligar a máquina CNC?',
        'Para o que serve o teste de tração uniaxial?',
    ];

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
                            <div ref={scrollContentRef} className='py-0 my-0 overflow-auto custom-scroll'>
                                <CardContent className='min-h-[200px] max-h-[420px] p-4'>
                                    {messages.length ? (
                                        messages.map(({ content, role, id }) => (
                                            <div
                                                key={id}
                                                className={cn('flex gap-2 mb-4', role !== 'user' ? 'justify-start' : 'justify-end' )}
                                                style={{ backgroundColor: role === 'user' ? '' : '', color: role === 'user' ? '' : '' }}
                                            >
                                                {role !== 'user' && (
                                                    <Avatar className='border-4 border-solid w-12 h-12 bg-white border-white'>
                                                        <AvatarFallback>U</AvatarFallback>
                                                        <AvatarImage style={{ objectFit: 'contain' }} src={UffLogo} alt='Logo da Uff'/>
                                                    </Avatar>
                                                )}
                                                <div
                                                    className='rounded-[12px] p-4 markdown-content'
                                                    style={{
                                                        backgroundColor: role !== 'user' ? 'var(--code-background)' : 'var(--white-background)',
                                                        color: role !== 'user' ? 'var(--primary-text)' : '#000',
                                                        maxWidth: '450px',
                                                    }}
                                                >
                                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div>
                                                <p className='text-1xl font-bold mb-2'>Exemplos:</p>
                                                { examples.map((example, index) => (
                                                    <Button key={index} onClick={() => clickExample(example)} variant='outline' className='w-full py-5 my-1'>{example}</Button>
                                                )) }
                                            </div>
                                        </>
                                    )
                                    }
                                </CardContent>
                            </div>
                            <Separator />
                            <form onSubmit={onFormSubmit}>
                                <CardFooter className='gap-2 p-4'>
                                    <Textarea
                                        className='resize-none min-h-[40px]'
                                        placeholder='Faça uma pergunta a IA'
                                        value={input}
                                        rows={1}
                                        onKeyDown={onEnterPress}
                                        onChange={handleInputChange}
                                    />
                                    <Button disabled={isLoading} type='submit'>
                                        {isLoading ? <LoaderCircle className='animate-spin' /> : <SendHorizonal />}
                                    </Button>
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