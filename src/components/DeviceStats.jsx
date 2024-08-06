import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const COLORS = ['#8884d8', '#475569', '#FFBB28',];

const DeviceStats = ({ stats }) => {

    const deviceCount = stats.reduce((acc, item) => {
        if (!acc[item.device]) {
            acc[item.device] = 0;
        }
        acc[item.device]++;
        return acc;
    }, {});

    const result = Object.keys(deviceCount).map((device) => ({
        device,
        count: deviceCount[device],
    }))


    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <PieChart width={700} height={400}>
                    <Pie
                        data={result}
                        label={({device,percent})=> `${device}:${(percent * 100).toFixed(0)}%`}
                        dataKey="count"
                        fill="#8884d8"
                    >
                        {result.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>

    )
}

export default DeviceStats