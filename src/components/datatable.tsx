/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { EyeIcon, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { IDatatable } from '@/interfaces';

const Datatable = ({ rows, headers, tableName }: IDatatable) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filteredRows, setFilteredRows] = useState<any>(rows);

    const filterRows = (input: string) => {
        const filtered = rows.filter((row: any) => {
            let result = false;
            Object.values(row).forEach((val) => {
                if (typeof val === 'string' && String(val).toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
                    result = true;
                }
            });

            return result;
        });
        setFilteredRows(filtered);
    };

    return (
        <>
            <Card className='mb-4'>
                {/* Parte do filtro */}
                <div className='mx-3 my-4 flex justify-between items-center gap-4'>
                    <h1 className='text-lg font-bold'>{tableName}</h1>
                    <Input placeholder='Procurar...' className='max-w-[240px] text-xs sm:text-base' onChange={(event) => filterRows(String(event.target.value))} />
                </div>
                {/* Parte da tabela */}
                <Table className='p-0'>
                    {/* HEADER */}
                    <TableHeader>
                        <TableRow>
                            {headers.map(({headerClassName, title}, headerIndex) => (
                                <TableHead key={headerIndex} className={`pt-2 pb-2 pl-2 pr-0 ${headerClassName}`}>{title}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    {/* BODY */}
                    <TableBody>
                        {filteredRows?.length ? (
                            filteredRows.slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage).map((row: any, rowIndex: number) => (
                                <TableRow key={`TableRow-${rowIndex}`} className='p-4'>
                                    {headers.map(({value, rowClassName, prefixText, action}, headerIndex) => (
                                        value === 'action' && action ? (
                                            // ACTION
                                            <TableCell
                                                key={`${value}-${rowIndex}-${headerIndex}`}
                                                className={`pt-2 pb-2 pl-2 pr-0 ${rowClassName}`}
                                            >
                                                <Button onClick={() => action(row)} className='m-0 p-0 h-6 w-6 ' variant={'ghost'}>
                                                    <EyeIcon className='m-2' />
                                                </Button>
                                            </TableCell>
                                        ) : (
                                            // CÉLULA NORMAL
                                            <TableCell
                                                key={`${value}-${rowIndex}-${headerIndex}`}
                                                className={`pt-2 pb-2 pl-2 pr-0 ${rowClassName}`}
                                            >
                                                {prefixText}{row[value]}
                                            </TableCell>
                                        )
                                    ))}
                                </TableRow>
                            ))
                        ): (<div className='p-4'>Lista vazia...</div>)}
                    </TableBody>
                </Table>
                <Separator className='m-0' />
                {/* Parte da paginação da tabela */}
                <div className='flex justify-between items-center my-0 p-4'>
                    <div className='flex items-center gap-4'>
                        <div>
                            {currentPage} de {Math.ceil(filteredRows.length / itemsPerPage) || 1} páginas - Total {rows.length}
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        {/* Select de ítens por página */}
                        <Select onValueChange={(value) => setItemsPerPage(Number(value))} value={String(itemsPerPage)}>
                            <SelectTrigger className="w-[80px]">
                                <SelectValue placeholder="Ítens por página" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                            </SelectContent>
                        </Select>
                        {/* Botões de navegação entre páginas */}
                        <Button
                            variant='outline'
                            className='p-2'
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft />
                        </Button>
                        <Button
                            variant='outline'
                            className='p-2'
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === (Math.ceil(filteredRows.length / itemsPerPage) || 1)}
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default Datatable;