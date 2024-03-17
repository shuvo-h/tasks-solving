/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { downloadChartById } from '../../xlsxToCharUtils';

type CustomPluginOptions = {
    customCanvasBackgroundColor?: {
        color: string;
    };
};

type TBarType = {
    groupBy: string;
    key: string;
    hasCount: number;
    notHasCount: number;
}

type TBarChartProps = {
    data: TBarType[];
}

const BarChart: React.FC<TBarChartProps> = ({ data }) => {
    const chartContainer = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart>();
    const [caption, setCaption] = useState("Type The Chart Caption");

    useEffect(() => {
        if (!data || data.length === 0 || !chartContainer.current) return;

        const labels = data.map(item => item.groupBy);
        const hasCounts = data.map(item => item.hasCount);
        const notHasCounts = data.map(item => item.notHasCount);

        const customCanvasBackgroundColorPlugin = {
            id: 'customCanvasBackgroundColor',
            beforeDraw: (chart: Chart, args: any[], options: { color?: string }) => {
                const { ctx } = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color || '#99ffff';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        };

        const config: ChartConfiguration<'bar',CustomPluginOptions> = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Has Count',
                        data: hasCounts as any,
                        backgroundColor: 'rgba(0, 255, 0, 0.5)', // Green with 50% opacity
                    },
                    {
                        label: 'Not Has Count',
                        data: notHasCounts,
                        backgroundColor: 'rgba(255, 0, 0, 0.5)', // Red with 50% opacity
                    },
                ],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: caption,
                    },
                    customCanvasBackgroundColor: {
                        color: '#99ffff' // Custom background color
                    }
                },
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                    },
                },
            },
            plugins: [customCanvasBackgroundColorPlugin]
        };

        chartInstance.current = new Chart(chartContainer.current, config);

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, caption]);

    return (
        <div style={{ border: "1px solid blue", maxWidth: "700px", position: "relative" }}>
            <input
                style={{
                    width: "100%",
                    height: "22px"
                }}
                onBlur={e => setCaption(e.target.value)}
                type="text"
                placeholder='Type the caption'
            />
            <canvas ref={chartContainer} id='stackedBArChartId' />
            <button onClick={() => downloadChartById('stackedBArChartId', caption)}>Download</button>
        </div>
    );
};

export default BarChart;
