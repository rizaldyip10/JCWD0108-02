import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export const PieChart = () => {
    const labels = ['Makanan', 'Minuman', 'Kebutuhan Dapur', 'Fashion', 'Electronic']

    const data = {
        labels: labels,
        datasets: [{
            label: "Sales this week",
            data: [50, 65, 60, 20, 5],
            backgroundColor: ["rgb(0, 128, 0)", "rgb(128, 0, 0)", "rgb(0, 0, 128)", "rgb(128, 128, 0)", "rgb(0, 128, 128)"],
            hoverOffset: 4
        }]
    }
    return (
        <Pie data={data} width="100px" height="100px" />
    )
}