import { Footer } from '../../components/common/Footer/Footer';
import { FullScreenLoader } from '../../components/common/FullScreenLoader/FullScreenLoader';
import { Header } from '../../components/common/Header/Header';
import { Typography } from '../../components/common/Typography/Typography';
import { sources } from '../../components/pages/vacancies/types';
import { useGetApplicationsQuery } from '../../services/applications.api';
import { pageWrapper, contentWrapper } from '../VacanciesListPage/VacanciesListPage.css';
import { gridContainer, chartContainer } from './AnalyticsPage.css';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Line,
    BarChart,
    Bar,
    Treemap,
} from 'recharts';

const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#A28CFF',
    '#FF6666',
    '#66FF99',
    '#FF99CC',
    '#FFCC66',
    '#99CCFF',
];

export const AnalyticsPage = () => {
    const { data: applications, isLoading } = useGetApplicationsQuery();

    if (isLoading) return <FullScreenLoader />;
    if (!applications || applications.length === 0) return <p>Нет данных для отображения</p>;

    const sourceCounts: Record<string, number> = applications.reduce(
        (acc, app) => {
            if (app.source) {
                acc[app.source] = (acc[app.source] || 0) + 1;
            }
            return acc;
        },
        {} as Record<string, number>,
    );

    const chartData = Object.keys(sourceCounts).map((sourceId) => {
        const source = sources.find((s) => s.value === sourceId);
        return {
            name: source ? source.label : 'Неизвестно',
            value: sourceCounts[sourceId],
        };
    });

    const applicationsByDate: Record<string, number> = applications.reduce(
        (acc, app) => {
            acc[app.createdAt] = (acc[app.createdAt] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>,
    );

    const dateChartData = Object.keys(applicationsByDate).map((date) => ({
        date,
        count: applicationsByDate[date],
    }));

    const salaryBySource: Record<string, { total: number; count: number }> = applications.reduce(
        (acc, app) => {
            if (app.source) {
                if (!acc[app.source]) {
                    acc[app.source] = { total: 0, count: 0 };
                }
                acc[app.source].total += parseInt(app.salary);
                acc[app.source].count += 1;
            }
            return acc;
        },
        {} as Record<string, { total: number; count: number }>,
    );

    const salaryData = Object.keys(salaryBySource).map((sourceId) => {
        const source = sources.find((s) => s.value === sourceId)?.label || 'Прочие';
        const avgSalary =
            salaryBySource[sourceId].count > 0
                ? Math.round(salaryBySource[sourceId].total / salaryBySource[sourceId].count)
                : 0; // Если count = 0, возвращаем 0
        return {
            source,
            avgSalary,
        };
    });

    const vacancyCounts: Record<string, number> = applications.reduce(
        (acc, app) => {
            acc[app.vacancyTitle] = (acc[app.vacancyTitle] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>,
    );

    const vacancyData = Object.keys(vacancyCounts).map((title) => ({
        name: title,
        size: vacancyCounts[title],
    }));

    const locationCounts: Record<string, number> = applications.reduce(
        (acc, app) => {
            acc[app.location] = (acc[app.location] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>,
    );

    const locationData = Object.keys(locationCounts).map((location) => ({
        name: location,
        value: locationCounts[location],
    }));

    return (
        <div className={pageWrapper}>
            <Header />
            <div className={contentWrapper}>
                <Typography variant="h1">Аналитика по источникам заявок</Typography>
                <div className={gridContainer}>
                    {/* Круговая диаграмма источников заявок */}
                    <div className={chartContainer}>
                        <Typography variant="h3">Распределение по источникам</Typography>
                        {chartData.length > 0 ? (
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        ) : (
                            <p>Нет данных для построения диаграммы</p>
                        )}
                    </div>

                    {/* Динамика заявок по дням (Line Chart) */}
                    <div className={chartContainer}>
                        <Typography variant="h3">Динамика заявок по дням</Typography>
                        <LineChart width={500} height={300} data={dateChartData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#ccc" />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" />
                        </LineChart>
                    </div>

                    {/* Средняя зарплата кандидатов по источникам (Bar Chart) */}
                    <div className={chartContainer}>
                        <Typography variant="h3">Средняя зарплата по источникам</Typography>
                        <BarChart width={500} height={300} data={salaryData}>
                            <XAxis dataKey="source" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="avgSalary" fill="#FFBB28" />
                        </BarChart>
                    </div>

                    {/* Популярность вакансий (Treemap) */}
                    <div className={chartContainer}>
                        <Typography variant="h3">Популярность вакансий</Typography>
                        <Treemap
                            width={500}
                            height={300}
                            data={vacancyData}
                            dataKey="size"
                            stroke="#fff"
                            fill="#8884d8"
                        />
                    </div>

                    {/* Распределение по локации (Pie Chart) */}
                    <div className={chartContainer}>
                        <Typography variant="h3">Распределение по локациям</Typography>

                        <PieChart width={400} height={400}>
                            <Pie
                                data={locationData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#82ca9d"
                                dataKey="value"
                            >
                                {locationData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
