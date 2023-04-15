import React from 'react';

function formatDatetime(datetime) {
    const date = new Date(datetime);
    const year = new Intl.DateTimeFormat('vi', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('vi', { month: 'long' }).format(date);
    const day = new Intl.DateTimeFormat('vi', { day: '2-digit' }).format(date);
    const weekday = new Intl.DateTimeFormat('vi', { weekday: 'long' }).format(date);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const result = `${hours} giờ ${minutes} phút - ${weekday}, Ngày ${day}, ${month}, ${year} `;
    return (
        <>
            <span className="text-gray-800">vào lúc {result}</span>
        </>
    );
}

export default formatDatetime;
