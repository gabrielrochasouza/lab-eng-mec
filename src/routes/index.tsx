import MainPage from '@/pages';
import Stock from '@/pages/estoque';
import PostPage from '@/pages/postPage';
import QuickGuide from '@/pages/quickGuide';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/estoque" element={<Stock />} />
                <Route path="/guia-rapido" element={<QuickGuide />} />
                <Route path="/guia-rapido/:categorySlugName/:postSlugName" element={<PostPage />} />
                <Route path="/*" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
}