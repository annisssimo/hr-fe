import * as styles from './ConfirmationPage.css.ts';
import { Footer } from '../../components/common/Footer/Footer.tsx';
import { Typography } from '../../components/common/Typography/Typography.tsx';
import { Table } from '../../components/common/Table/Table.tsx';
import { Column } from '../../components/common/Table/Table.tsx';
import { Button } from '../../components/common/ButtonComponent/ButtonComponent.tsx';
import { useState, useEffect } from 'react';
import { Header } from '../../components/common/Header/Header.tsx';
import { Dropdown } from '../../components/common/Dropdown/Dropdown.tsx';
import { useGetUsersListMutation, useUpdateUserMutation } from '../../services/users.api.ts';
import axios from 'axios';
import { showErrorMessage } from '../../utils/UI/toastMessages.ts';

interface User {
    username: string;
    role: 'admin' | 'manager' | 'employee';
}

interface NewUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    actions: null;
}

interface AllUser {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
    statusAssignmentDate: Date;
}

export const ConfirmationPage = () => {
    const [allDisplayed, setAllDisplayed] = useState(true);
    const [newRequestsCount, setNewRequestsCount] = useState(0);
    const [newUsers, setNewUsers] = useState<NewUser[]>([]);
    const [allUsers, setAllUsers] = useState<AllUser[]>([]);
    const headerProp: User = { username: 'placeholder', role: 'admin' };
    const [updateUser] = useUpdateUserMutation();
    const [getUserList, { isLoading }] = useGetUsersListMutation();

    const fetchAllRequests = async () => {
        try {
            const response = await getUserList({
                limit: 10,
                offset: 0,
            }).unwrap();
            setAllUsers(response.data ?? []);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    showErrorMessage(
                        'Network error or server is unreachable. Please try again later.',
                    );
                } else {
                    switch (error.status) {
                        case 500:
                            showErrorMessage('Server Error, try again later');
                            break;
                        default:
                            showErrorMessage('Something went wrong. Please try again later');
                            break;
                    }
                }
            } else {
                console.error('Unexpected error: ', error);
                showErrorMessage('Unexpected error happened');
            }
        }
    };

    const fetchNewRequestsCount = async () => {
        try {
            const response = await getUserList({
                limit: 1,
                offset: 0,
                includeCount: true,
                filters: { status: ['pending'] },
            }).unwrap();
            setNewRequestsCount(response.metadata.count || 0);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    showErrorMessage(
                        'Network error or server is unreachable. Please try again later.',
                    );
                } else {
                    switch (error.status) {
                        case 500:
                            showErrorMessage('Server Error, try again later');
                            break;
                        default:
                            showErrorMessage('Something went wrong. Please try again later');
                            break;
                    }
                }
            } else {
                console.error('Unexpected error: ', error);
                showErrorMessage('Unexpected error happened');
            }
        }
    };

    const fetchNewRequestsTable = async () => {
        try {
            const response = await getUserList({
                limit: 10,
                offset: 0,
                filters: { status: ['pending'] },
            }).unwrap();
            setNewUsers(response.data ?? []);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    showErrorMessage(
                        'Network error or server is unreachable. Please try again later.',
                    );
                } else {
                    switch (error.status) {
                        case 500:
                            showErrorMessage('Server Error, try again later');
                            break;
                        default:
                            showErrorMessage('Something went wrong. Please try again later');
                            break;
                    }
                }
            } else {
                console.error('Unexpected error: ', error);
                showErrorMessage('Unexpected error happened');
            }
        }
    };

    const confirmUsers = async (id: string) => {
        const user = newUsers.find((u) => u.id === id);
        const selectedRole = (user?.role || 'employee') as 'admin' | 'manager' | 'employee';
        try {
            await updateUser({
                userId: id,
                body: {
                    status: 'active',
                    role: selectedRole,
                    statusAssignmentDate: new Date(),
                },
            }).unwrap();
            fetchNewRequestsCount();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    showErrorMessage(
                        'Network error or server is unreachable. Please try again later.',
                    );
                } else {
                    switch (error.status) {
                        case 500:
                            showErrorMessage('Server Error, try again later');
                            break;
                        default:
                            showErrorMessage('Something went wrong. Please try again later');
                            break;
                    }
                }
            } else {
                console.error('Unexpected error: ', error);
                showErrorMessage('Unexpected error happened');
            }
        }
    };

    const rejectUsers = async (id: string) => {
        try {
            await updateUser({
                userId: id,
                body: {
                    status: 'archived',
                    statusAssignmentDate: new Date(),
                },
            }).unwrap();
            fetchNewRequestsCount();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    showErrorMessage(
                        'Network error or server is unreachable. Please try again later.',
                    );
                } else {
                    switch (error.status) {
                        case 500:
                            showErrorMessage('Server Error, try again later');
                            break;
                        default:
                            showErrorMessage('Something went wrong. Please try again later');
                            break;
                    }
                }
            } else {
                console.error('Unexpected error: ', error);
                showErrorMessage('Unexpected error happened');
            }
        }
    };

    useEffect(() => {
        fetchAllRequests();
        fetchNewRequestsCount();
        fetchNewRequestsCount();
    }, []);

    const selectNewRequests = async () => {
        setAllDisplayed(false);
        fetchNewRequestsTable();
    };

    const selectAllRequests = async () => {
        setAllDisplayed(true);
        fetchAllRequests();
    };

    const handleRoleChange = (id: string, newRole: string) => {
        setNewUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === id ? { ...user, role: newRole } : user)),
        );
    };

    const newColumns: Column<NewUser>[] = [
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
            render: (role: string | null, record: NewUser) => (
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
            render: (_: string | number | null, record: NewUser) => (
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

    const allColumns: Column<AllUser>[] = [
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
            dataIndex: 'statusAssignmentDate',
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
                        <div onClick={selectAllRequests}>
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
                        <div onClick={selectNewRequests}>
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
                            <Table columns={allColumns} rows={allUsers} isLoading={isLoading} />
                        ) : (
                            <Table columns={newColumns} rows={newUsers} isLoading={isLoading} />
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
