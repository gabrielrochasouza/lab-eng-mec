import Datatable from '@/components/datatable';
import Layout from '@/components/layout';
import { IStockItem, IStockItemResponse } from '@/interfaces';
import { getAllStockItems } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Separator } from '@radix-ui/react-separator';
import { useLocation } from 'react-router-dom';
import ImageWithLoader from '@/components/imageWithLoader';
import { LoaderCircle } from 'lucide-react';

export default function Stock () {
    const queryParams = new URLSearchParams(window.location.search);
    const itemSlugParam = queryParams.get('item');
    const { data: stockItems, isLoading } = useQuery<IStockItemResponse, Error>({
        queryKey: ['stocks'],
        queryFn: getAllStockItems,
    });
    const rows = stockItems?.stocks || [];
    const selectedStock = itemSlugParam ? rows.find(({ itemSlug }) => itemSlug === itemSlugParam) || {} as IStockItem : {} as IStockItem;

    const [selectedItem, setSelectedItem] = useState<IStockItem>(selectedStock as IStockItem);
    const [openDialog, setOpenDialog] = useState<boolean>(itemSlugParam ? true : false);

    const location = useLocation();
    useEffect(() => {
        if (itemSlugParam && selectedStock) {
            setOpenDialog(true);
            setSelectedItem(selectedStock);
        }
    }, [location.search, selectedStock]);

    if (isLoading) {
        return (
            <Layout>
                <div className='mt-6 pt-16 px-4 text-xs max-w-screen-2xl mx-auto'><LoaderCircle className='animate-spin' /></div>
            </Layout>
        );
    }

    const headers = [
        {
            title: 'Armário',
            value: 'cabinetNumber',
            prefixText: 'n°',
            rowClassName: 'max-w-[60px] truncate pl-4 text-xs sm:text-base',
            headerClassName: 'max-w-[60px] truncate pl-4 text-xs sm:text-base'
        },
        {
            title: 'Pratilheira',
            value: 'shelfNumber',
            prefixText: 'n°',
            rowClassName: 'max-w-[80px] truncate text-xs sm:text-base',
            headerClassName: 'max-w-[80px] truncate text-xs sm:text-base'
        },
        {
            title: 'Qtd',
            value: 'quantity',
            prefixText: '',
            rowClassName: 'max-w-[100px] truncate text-xs sm:text-base',
            headerClassName: 'max-w-[100px] truncate text-xs sm:text-base'
        },
        {
            title: 'Nome do Ítem',
            value: 'itemTitle',
            rowClassName: 'text-xs sm:text-base',
            headerClassName: 'text-xs sm:text-base'
        },
        {
            value: 'action',
            action: (stock: IStockItem) => {
                setOpenDialog(true);
                setSelectedItem(stock);
            },
            rowClassName: 'text-end pr-4 pl-0 max-w-[30px]',
        }
    ];
    return (
        <Layout>
            <div className='mt-6 pt-16 px-4 text-xs animate-in fade-in transition duration-700'>
                <Datatable rows={rows} headers={headers} tableName='Inventário' />
            </div>
            <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
                <DialogContent className="sm:max-w-[365px]">
                    <DialogHeader>
                        {selectedItem?.itemPicture?.url && (
                            <div className='p-0'>
                                <ImageWithLoader
                                    src={selectedItem?.itemPicture?.url}
                                    alt={selectedItem?.itemTitle}
                                    className='w-full max-h-96 min-h-80 rounded'
                                    sizeClassName='w-full max-h-96 min-h-80 rounded'
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        )}
                        <Separator />
                        <DialogTitle>{selectedItem?.itemTitle}</DialogTitle>
                        <DialogDescription>
                            <p>Descrição: {selectedItem?.itemDescription || '-'}</p>
                            <p>Armário: n° {selectedItem?.cabinetNumber}</p>
                            <p>Prateleira: n° {selectedItem?.shelfNumber}</p>
                            <p>Quantidade: {selectedItem?.quantity}</p>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </Layout>
    );
};
