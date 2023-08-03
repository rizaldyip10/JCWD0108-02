import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import Axios from 'axios'
import { useEffect, useState } from 'react'

export const LineChart = () => {
    const [data, setData] = useState()
    const getData = async () => {
        try {
            const response = await Axios.get("http://localhost:8000/api/reports/daySales")
            setData(response.data)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getDay = (date) => {
        const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
        const dayIndex = date.getDay()
        return daysOfWeek[dayIndex]
    }

    const dataChart = {
        labels: data?.map(v => getDay(new Date(v.date))),
        datasets: [{
            label: "Sales this week",
            backgroundColor: "rgb(0, 0, 0)",
            borderColor: "rgb(0, 128, 0)",
            data: data?.map(v => v.totalAmount),
            tension: 0.4,
        }]
    }

    useEffect(() => {
        getData()
    },[])
    return (
        <Line data={dataChart} />
    )
}