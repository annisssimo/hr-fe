import { Meta, StoryObj } from '@storybook/react';
import { Table, Column } from '../components/common/Table/Table';

const meta: Meta<typeof Table> = {
    title: 'Components/Table',
    component: Table,
};

export default meta;

const columns: Column<Data>[] = [
    { title: 'ID', dataIndex: 'id', width: '50px' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age', render: (value) => <strong>{value}</strong> },
];

export const Default: StoryObj<typeof Table<Data>> = {
    args: {
        columns,
        rows: [
            { id: 1, name: 'Alice', age: 25 },
            { id: 2, name: 'Bob', age: 30 },
        ],
        count: 10,
        currentPage: 1,
        rowsPerPage: 5,
        isLoading: false,
        onPageChange: (page) => console.log('Page changed to:', page),
    },
};

export const Loading: StoryObj<typeof Table<Data>> = {
    args: {
        ...Default.args,
        isLoading: true,
        rows: [],
    },
};

export const NoData: StoryObj<typeof Table<Data>> = {
    args: {
        ...Default.args,
        rows: [],
    },
};

interface Data {
    id: number;
    name: string;
    age: number;
}
