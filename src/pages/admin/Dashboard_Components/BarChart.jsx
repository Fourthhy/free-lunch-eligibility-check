import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const RoundedTopBar = (props) => {
    const { x, y, width, height, fill } = props;
    const radius = 5; // corner radius
    // Prevent radius from being larger than half width or height
    const safeRadius = Math.min(radius, width / 2, height);
    // SVG path drawing a rect with rounded top corners only
    const path = `
      M${x},${y + height} 
      L${x},${y + safeRadius} 
      Q${x},${y} ${x + safeRadius},${y} 
      L${x + width - safeRadius},${y} 
      Q${x + width},${y} ${x + width},${y + safeRadius} 
      L${x + width},${y + height} 
      Z
    `;
    return <path d={path} fill={fill} />;
  };


const YAxisTicks = [];
const maxY = 1000;
for (let i = 0; i <= maxY; i += 100) {
  YAxisTicks.push(i);
}

export default class Chart extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/tiny-bar-chart-xzyy8g';
    
    render() {
        const { data } = this.props;
        return (
            <ResponsiveContainer width="100%" height="85%">
                <BarChart width={150} height={40} data={data}>
                    <Bar dataKey="claimed" fill="#5594E2" barSize={51} shape={<RoundedTopBar />}/>
                    <Bar dataKey="unclaimed" fill="#1F3463" barSize={51} shape={<RoundedTopBar />}/>
                    <Tooltip />
                    <YAxis ticks={YAxisTicks} />
                    <XAxis dataKey="name" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
