import React, { useState, useEffect } from 'react';
import { Header } from '../../components/common/Header/Header';
import { Footer } from '../../components/common/Footer/Footer';
import * as styles from './UserDataList.css';
import {
    UserDataTable,
    EmployeeData,
} from '../../components/pages/databaseOfUsers/employeeDataTable';
import { Column } from '../../components/common/Table/Table';
import { useGetUsersListMutation } from '../../services/users.api';
import { FILTER_STATES } from '../../constants/filterVariants.ts';

export const UserDataList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [filterValue, setFilterValue] = useState(FILTER_STATES.ALL);
    const [getUsersList, { isLoading }] = useGetUsersListMutation();

    const employeeColumns: Column<EmployeeData>[] = [
        { title: '#', dataIndex: 'rowNumber' },
        { title: 'First Name', dataIndex: 'firstName' },
        { title: 'Last Name', dataIndex: 'lastName' },
        {
            title: 'Email Address',
            dataIndex: 'email',
            render: (email) =>
                email ? (
                    <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
                        {email}
                    </a>
                ) : (
                    <span>N/A</span>
                ),
        },
        { title: 'Role', dataIndex: 'role' },
        { title: 'Manager', dataIndex: 'managerFirstName' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUsersList({
                    limit: rowsPerPage,
                    offset: (currentPage - 1) * rowsPerPage,
                    includeCount: true,
                    filtersOr:
                        filterValue === FILTER_STATES.ALL
                            ? { isEmployee: true, isManager: true }
                            : filterValue === FILTER_STATES.EMPLOYEE
                              ? { isEmployee: true }
                              : { isManager: true },
                    include: 'manager',
                }).unwrap();

                const employees: EmployeeData[] = response.data.map((emp, index) => ({
                    rowNumber: (currentPage - 1) * rowsPerPage + index + 1,
                    firstName: emp.firstName,
                    lastName: emp.lastName,
                    email: emp.email,
                    role: emp.role,
                    managerFirstName: emp.manager?.firstName || null,
                }));

                setEmployeeData(employees);
                setTotalCount(response.metadata.count);
            } catch (error) {
                console.error('Failed to fetch employee data:', error);
            }
        };

        fetchData();
    }, [currentPage, rowsPerPage, getUsersList, filterValue]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (value: string) => {
        const newRowsPerPage = Number(value);
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1);
    };

    const handleFilterChange = (value: FILTER_STATES) => {
        setFilterValue(value);
        console.log(filterValue);
    };

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.contentWrapper}>
                <UserDataTable
                    rows={employeeData}
                    columns={employeeColumns}
                    count={totalCount}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    isLoading={isLoading}
                    onFilterClick={handleFilterChange}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </div>
            <Footer />
        </div>
    );
};
