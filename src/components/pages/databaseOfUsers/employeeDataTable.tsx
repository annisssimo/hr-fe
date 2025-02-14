import React, { useState, useEffect } from 'react';
import { Table, Column } from '../../common/Table/Table';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/ButtonComponent/ButtonComponent';
import { Typography } from '../../common/Typography/Typography';
import { Dropdown } from '../../common/Dropdown/Dropdown';
import { ReactComponent as SearchIcon } from '../../../assets/search.svg';
import * as styles from './employessDataTable.css.ts';
import { useDebounce } from '../../../hooks/useDebounce';
import { FILTER_STATES } from '../../../constants/filterVariants.ts';

export interface EmployeeData {
    rowNumber: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    managerFirstName: string | null;
}

interface UserDataTableProps {
    rows: EmployeeData[];
    columns: Column<EmployeeData>[];
    count: number;
    currentPage: number;
    rowsPerPage: number;
    isLoading: boolean;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (value: string) => void;
    onFilterClick: (value: FILTER_STATES) => void;
}

export const UserDataTable: React.FC<UserDataTableProps> = ({
    rows,
    columns,
    count,
    currentPage,
    rowsPerPage,
    isLoading,
    onPageChange,
    onRowsPerPageChange,
    onFilterClick,
}) => {
    const [isSearchDisplayed, setIsSearchDisplayed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            // Empty for now
        }
    }, [debouncedSearchTerm]);

    const toggleSearch = () => {
        setIsSearchDisplayed(!isSearchDisplayed);
    };

    const rowsPerPageOptions = [
        { label: '15', value: '15' },
        { label: '20', value: '20' },
        { label: '25', value: '25' },
    ];

    return (
        <>
            <div className={styles.tableHeader}>
                <div className={styles.partContainer}>
                    <Typography variant="h1" className={styles.pageTitle}>
                        Users data
                    </Typography>
                    <div className={styles.buttonRow}>
                        <Button
                            type="secondary"
                            buttonText="All"
                            onClick={() => onFilterClick(FILTER_STATES.ALL)}
                        />
                        <Button
                            type="secondary"
                            buttonText="Manager"
                            onClick={() => onFilterClick(FILTER_STATES.MANAGER)}
                        />
                        <Button
                            type="secondary"
                            buttonText="Employee"
                            onClick={() => onFilterClick(FILTER_STATES.EMPLOYEE)}
                        />
                    </div>
                </div>
                <div className={styles.rightPartContainer}>
                    <div
                        className={`${styles.searchContainer} ${isSearchDisplayed ? styles.hiddenBlock : ''}`}
                    >
                        <Input
                            value={searchTerm}
                            onChange={(value: string) => setSearchTerm(value)}
                        />
                    </div>
                    <button className={styles.searchButton} onClick={toggleSearch}>
                        <SearchIcon className={styles.searchIcon} />
                    </button>
                </div>
            </div>
            <Table
                columns={columns}
                rows={rows}
                count={count}
                onPageChange={onPageChange}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                isLoading={isLoading}
                additionalPaginationElement={
                    <div className={styles.dropdownAndText}>
                        <Typography variant="text">Rows per page</Typography>
                        <Dropdown
                            options={rowsPerPageOptions}
                            selected={String(rowsPerPage)}
                            onChange={onRowsPerPageChange}
                            variant="small"
                        />
                    </div>
                }
            />
        </>
    );
};
