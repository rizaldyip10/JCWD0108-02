import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export const LineChart = () => {
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const data = {
        labels: labels,
        datasets: [{
            label: "Sales this week",
            backgroundColor: "rgb(0, 0, 0)",
            borderColor: "rgb(0, 128, 0)",
            data: [50, 45, 55, 60, 75, 95, 100]
        }]
    }
    return (
        <Line data={data} />
    )
}