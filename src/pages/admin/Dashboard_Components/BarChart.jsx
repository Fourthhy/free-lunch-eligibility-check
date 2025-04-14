import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '0',
        claimed: 4000,
    },
    {
        name: '1',
        claimed: 3000,
    },
    {
        name: '2',
        claimed: 2000,
    },
    {
        name: '3',
        claimed: 2780,
    }
];

export default class Chart extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/tiny-bar-chart-xzyy8g';

    render() {
        return (
            <ResponsiveContainer width="100%" height="95%">
                <BarChart width={150} height={40} data={data}>
                    <Bar dataKey="claimed" fill="#1F3463" barSize={50} />
                    <Tooltip />
                    <YAxis />
                    <XAxis dataKey="name" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
