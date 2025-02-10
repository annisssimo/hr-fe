import React, { useState, useEffect } from 'react';
import { Header } from '../../components/common/Header/Header.tsx';
import { Footer } from '../../components/common/Footer/Footer.tsx';
import { Typography } from '../../components/common/Typography/Typography.tsx';
import * as styles from './UserDataList.css.ts';
import { Table, Column } from '../../components/common/Table/Table.tsx';
import { Button } from '../../components/common/ButtonComponent/ButtonComponent.tsx';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { Input } from '../../components/common/Input/Input.tsx';
import { useDebounce } from '../../hooks/useDebounce';
import { Dropdown } from '../../components/common/Dropdown/Dropdown';

interface employeeDatabaseColumns {
    rowNumber: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    managerFirstName: string | null;
}

export const UserDataList: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchDisplayed, setIsSearchDisplayed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            //search logic
            setIsLoading(true);
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [debouncedSearchTerm]);
    const placeholderEmployees: Omit<employeeDatabaseColumns, 'rowNumber'>[] = [];
    const paginatedRows = placeholderEmployees //placeholder logic
        .map((employee, index) => ({
            ...employee,
            rowNumber: (currentPage - 1) * rowsPerPage + index + 1,
        }));

    const employeeColumns: Column<employeeDatabaseColumns>[] = [
        {
            title: '#',
            dataIndex: 'rowNumber',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
        },
        {
            title: 'Email Address',
            dataIndex: 'email',
            render: (email: string | number | null) =>
                email ? (
                    <a
                        href={`mailto:${email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mailtoLink}
                    >
                        {email}
                    </a>
                ) : (
                    <span>N/A</span>
                ),
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Manager',
            dataIndex: 'managerFirstName',
        },
    ];

    const onSearch = (value: string) => {
        setSearchTerm(value);
    };

    const toggleSearch = () => {
        setIsSearchDisplayed(!isSearchDisplayed);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChangeDropdown = (value: string) => {
        const newRowsPerPage = Number(value);
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1);
    };

    const rowsPerPageOptions = [
        { label: '15', value: '15' },
        { label: '20', value: '20' },
        { label: '25', value: '25' },
    ];

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.headerWrapper}>
                <Header />
            </div>
            <div className={styles.contentWrapper}>
                <div className={styles.tableHeader}>
                    <div className={styles.partContainer}>
                        <Typography variant={'h1'} className={styles.pageTitle}>
                            Users data
                        </Typography>
                        <div className={styles.buttonRow}>
                            <Button type="secondary" buttonText="All" onClick={() => {}} />
                            <Button type="secondary" buttonText="Manager" onClick={() => {}} />
                            <Button type="secondary" buttonText="Employee" onClick={() => {}} />
                        </div>
                    </div>
                    <div className={`${styles.rightPartContainer}`}>
                        <div
                            className={`${styles.searchContainer} ${isSearchDisplayed ? styles.hiddenBlock : ''}`}
                        >
                            <Input value={searchTerm} onChange={onSearch} />
                        </div>
                        <button className={styles.searchButton} onClick={toggleSearch}>
                            <SearchIcon className={styles.searchIcon} />
                        </button>
                        <div></div>
                    </div>
                </div>
                <Table
                    columns={employeeColumns}
                    rows={paginatedRows}
                    count={placeholderEmployees.length}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    isLoading={isLoading}
                    additionalPaginationElement={
                        <div className={styles.dropdownAndText}>
                            <Typography variant={'text'}>Rows per page</Typography>
                            <Dropdown
                                options={rowsPerPageOptions}
                                selected={String(rowsPerPage)}
                                onChange={handleRowsPerPageChangeDropdown}
                                variant="small"
                            />
                        </div>
                    }
                />
            </div>
            <Footer />
        </div>
    );
};
