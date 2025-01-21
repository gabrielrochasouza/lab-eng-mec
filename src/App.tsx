import { ThemeProvider } from '@/components/theme-provider';
import Routes from '@/routes';
import Chat from './components/chat';
import { fetchAliveStatus } from '@/services/api';
import { useEffect, useState } from 'react';

function App() {
    const [showChat, setShowChat] = useState<boolean>(false);

    useEffect(() => {
        fetchAliveStatus().then(() => {
            setShowChat(true);
        }).catch((err) => console.log('err', err));
    }, []);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Routes />
            {showChat && <Chat />}
        </ThemeProvider>
    );
}

export default App;
