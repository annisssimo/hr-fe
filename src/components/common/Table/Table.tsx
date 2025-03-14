import { ReactNode } from 'react';
import * as styles from './TableStyle.css.ts';
import { Loader } from '../Loader/Loader.tsx';
import { Button } from '../ButtonComponent/ButtonComponent.tsx';
import { Typography } from '../Typography/Typography.tsx';

interface TableProps<T> {
    columns: Column<T>[];
    rows: T[];
    count?: number;
    additionalPaginationElement?: ReactNode;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    rowsPerPage?: number;
    isLoading: boolean;
    onRowClick?: (row: T) => void;
}

export interface Column<T> {
    title: string;
    dataIndex: keyof T;
    width?: string;
    render?: (value: T[keyof T], record: T, index: number) => ReactNode;
}

export const Table = <T,>({
    columns,
    rows,
    count,
    onPageChange,
    currentPage,
    rowsPerPage = 100,
    isLoading,
    additionalPaginationElement,
    onRowClick,
}: TableProps<T>) => {
    const paginationRender = () => {
        return count && onPageChange && currentPage ? (
            <div className={styles.paginationBar}>
                {additionalPaginationElement}
                <div className={styles.buttonWrapper}>
                    <Button
                        type={currentPage === 1 ? 'disabled' : 'secondary'}
                        onClick={previousPageClick}
                        buttonText="<"
                    />
                </div>
                <Typography variant="text" className={styles.paginationCounter}>
                    {currentPage}
                </Typography>
                <div className={styles.buttonWrapper}>
                    <Button
                        type={
                            (currentPage >= Math.ceil(count / rowsPerPage) ||
                                rows.length < rowsPerPage) &&
                            !isLoading
                                ? 'disabled'
                                : 'preferred'
                        }
                        onClick={nextPageClick}
                        buttonText=">"
                    />
                </div>
            </div>
        ) : (
            <></>
        );
    };

    const getNoDataMessage = () => (currentPage === 1 ? 'Нет данных' : 'Больше нет данных');

    const previousPageClick = () => {
        if (onPageChange && currentPage) {
            onPageChange(currentPage - 1);
        }
    };

    const nextPageClick = () => {
        if (onPageChange && currentPage) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHeader}>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                style={{ width: col.width || 'auto' }}
                                className={styles.tableCellHeader}
                            >
                                <Typography variant="text">{col.title}</Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={styles.tableRow}
                                onClick={() => onRowClick?.(row)}
                            >
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className={styles.tableCell}>
                                        {col.render ? (
                                            col.render(row[col.dataIndex], row, rowIndex)
                                        ) : (
                                            <Typography variant="text">
                                                {row[col.dataIndex] as ReactNode}
                                            </Typography>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={styles.tableFooter}>
                {!isLoading && rows.length < 1 ? (
                    <Typography variant="text">{getNoDataMessage()}</Typography>
                ) : (
                    <>{paginationRender()}</>
                )}
            </div>
            {isLoading && (
                <div className={styles.loaderContainer}>
                    <Loader customWidth={40} customHeight={40} />
                </div>
            )}
        </div>
    );
};
