'use client'

import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type ScoreStats = {
    good: number;
    hard: number;
    bad: number;
}

const computeReviewStats = (scores: { [key: number]: 'good' | 'hard' | 'bad' }): ScoreStats => {
    return Object.values(scores).reduce((acc, score) => {
        acc[score] = (acc[score] || 0) + 1;
        return acc;
    }, { good: 0, hard: 0, bad: 0 } as ScoreStats);
};

const StatisticsGraph = () => {
    const scores = useSelector((state: RootState) => state.review.scores);
    const totalCards = useSelector((state: RootState) => state.review.totalCards);
    
    const stats = computeReviewStats(scores);

    // Format data for Recharts
    const data = [
        { name: 'Good', value: stats.good, color: '#22c55e' },  // green-500
        { name: 'Hard', value: stats.hard, color: '#eab308' },  // yellow-500
        { name: 'Again', value: stats.bad, color: '#ef4444' },  // red-500
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 sm:p-8">
            <h2 className="text-2xl font-semibold mb-8">Review Complete!</h2>
            
            <div className="w-full max-w-md h-64 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis 
                            dataKey="name" 
                            stroke="#6b7280"
                            fontSize={14}
                        />
                        <YAxis 
                            stroke="#6b7280"
                            fontSize={14}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.5rem'
                            }}
                        />
                        <Bar 
                            dataKey="value" 
                            fill="#4b5563"
                            radius={[4, 4, 0, 0]}
                        >
                            {
                                data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="text-gray-600 text-center">
                <p>Total cards reviewed: {totalCards}</p>
                <p className="text-sm mt-2">
                    Good: {Math.round((stats.good / totalCards) * 100)}% | 
                    Hard: {Math.round((stats.hard / totalCards) * 100)}% | 
                    Again: {Math.round((stats.bad / totalCards) * 100)}%
                </p>
            </div>
        </div>
    );
};

export default StatisticsGraph;