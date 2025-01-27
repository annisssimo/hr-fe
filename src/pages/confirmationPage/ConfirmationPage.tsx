import * as styles from './ConfirmationPage.css.ts';
import { Footer } from '../../components/common/Footer/Footer.tsx';
import { Typography } from '../../components/common/Typography/Typography.tsx';
import { Table } from '../../components/common/Table/Table.tsx';
import { Column } from '../../components/common/Table/Table.tsx';
import { Button } from '../../components/common/ButtonComponent/ButtonComponent.tsx';
import { useState } from 'react';
import { Header } from '../../components/common/Header/Header.tsx';
import { Dropdown } from '../../components/common/Dropdown/Dropdown.tsx';

interface User {
    username: string;
    role: 'admin' | 'manager' | 'employee';
}

interface newUsers {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    actions: null;
}

interface allUsers {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
    date: string;
}

export const ConfirmationPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allDisplayed, setAllDisplayed] = useState(true);
    const [newRequestsCount, setNewRequestsCount] = useState(0);
    const [users, setUsers] = useState<newUsers[]>([]);
    const headerProp: User = { username: 'placeholder', role: 'admin' };

    const selectNewRequests = () => {
        setAllDisplayed(false);
        fetchNewRequests();
    };

    const selectAllRequests = () => {
        setAllDisplayed(true);
        fetchAllRequests();
    };

    const fetchNewRequests = () => {
        setNewRequestsCount(0); // Placeholders so eslint wouldn't yell at me
        setIsLoading(true);
    };

    const fetchAllRequests = () => {
        // Implement fetching all requests here
    };

    const handleRoleChange = (id: string, newRole: string) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === id ? { ...user, role: newRole } : user)),
        );
    };

    //again placeholders cause eslint
    const confirmUsers = (id: string) => {
        console.log(id);
    };
    const rejectUsers = (id: string) => {
        console.log(id);
    };
    const newColumns: Column<newUsers>[] = [
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
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (role: string | null, record: newUsers) => (
                <Dropdown
                    label={'Role'}
                    options={[
                        { label: 'Employee', value: 'employee' },
                        { label: 'Manager', value: 'manager' },
                        { label: 'Admin', value: 'admin' },
                    ]}
                    onChange={(value) => handleRoleChange(record.id, value)}
                    selected={role || 'employee'}
                />
            ),
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_: string | number | null, record: newUsers) => (
                <div className={styles.buttonsCell}>
                    <Button
                        type="preferred"
                        buttonText="CONFIRM"
                        onClick={() => confirmUsers(record.id)}
                    />
                    <Button
                        type="critical"
                        buttonText="REJECT"
                        onClick={() => rejectUsers(record.id)}
                    />
                </div>
            ),
        },
    ];

    const allColumns: Column<allUsers>[] = [
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
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
    ];

    return (
        <div className={styles.confirmationPageWrapper}>
            <div className={styles.headerWrapper}>
                <Header user={headerProp} />
            </div>
            <div className={styles.confirmationPageContent}>
                <Typography variant={'h1'} className={styles.pageTitle}>
                    Requests
                </Typography>
                <div className={styles.tableAndMenuContainer}>
                    <div className={styles.tableMenu}>
                        <div onClick={() => selectAllRequests()}>
                            <Typography
                                variant={'h3'}
                                className={
                                    allDisplayed
                                        ? styles.tableMenuItemSelected
                                        : styles.tableMenuItem
                                }
                            >
                                ALL REQUESTS
                            </Typography>
                        </div>
                        <div onClick={() => selectNewRequests()}>
                            <Typography
                                variant={'h3'}
                                className={
                                    !allDisplayed
                                        ? styles.tableMenuItemSelected
                                        : styles.tableMenuItem
                                }
                            >
                                NEW REQUESTS ({newRequestsCount})
                            </Typography>
                        </div>
                    </div>
                    <div className={styles.tableWrapper}>
                        {allDisplayed ? (
                            <Table columns={allColumns} rows={[]} isLoading={isLoading} />
                        ) : (
                            <Table columns={newColumns} rows={users} isLoading={isLoading} />
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.confirmationPageFooter}>
                <Footer />
            </div>
        </div>
    );
};
