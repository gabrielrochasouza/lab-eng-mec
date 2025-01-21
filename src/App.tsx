import { ThemeProvider } from '@/components/theme-provider';
import Routes from '@/routes';
import Chat from './components/chat';

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Routes />
            <Chat />
        </ThemeProvider>
    );
}

export default App;
