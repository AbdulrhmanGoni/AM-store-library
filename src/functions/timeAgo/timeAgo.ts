const timeAgo = (theTime: string): string => {
    const
        allDate = new Date().getTime(),
        startDate = new Date(`${theTime}`).getTime(),
        time = allDate - startDate;

    const formatTime = (num: number, type: string) => {
        const time = Math.floor(num);
        let s = time === 1 ? "" : "s";
        return `${time} ${type}${s} ago`;
    }

    const
        seconds = time / 1000,
        minutes = seconds / 60,
        hours = minutes / 60,
        days = hours / 24,
        week = days / 7,
        months = days / 28,
        years = months / 12;

    return seconds <= 60 ? "Just Yet"
        : minutes <= 60 ? formatTime(minutes, "minute")
            : hours <= 24 ? formatTime(hours, "hour")
                : days <= 14 ? formatTime(days, "day")
                    : week <= 4 ? formatTime(week, "week")
                        : months <= 12 ? formatTime(months, "month")
                            : formatTime(years, "year")

}

export default timeAgo