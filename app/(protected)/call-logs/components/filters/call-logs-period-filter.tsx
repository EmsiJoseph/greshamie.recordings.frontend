import { CalendarClock } from "lucide-react";
import { useState } from "react";
import { PeriodTypes } from "@/constants/period-types";
import { useSearchParams } from "next/navigation";
import { url } from "inspector";

interface CallLogsPeriodFilter<T extends string> {
    onPeriodChange?: (startDate: Date, endDate: Date, selectedPeriod: string) => void;
    defaultPeriod?: string;
    value?: T;
}

export const CallLogsPeriodFilter = ({
    onPeriodChange = () => {},
    defaultPeriod,
    value,
}: CallLogsPeriodFilter<string>) => {
    const searchParams = useSearchParams();
    const urlStartDate = searchParams.get("startDate");
    const urlEndDate = searchParams.get("endDate");
    console.log(urlStartDate);
    console.log(urlEndDate);

    const calculatePeriodFromDates = (startDate: Date, endDate: Date) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const oneDay = 24 * 60 * 60 * 1000;

        if (endDate.getTime() === today.getTime() && startDate.getTime() === today.getTime() - oneDay) {
            return "Today";
        } else if (endDate.getTime() === today.getTime() && startDate.getTime() === today.getTime() - 7 * oneDay) {
            return "Last Week";
        } else if (endDate.getTime() === today.getTime() && startDate.getMonth() === today.getMonth() - 1) {
            return "Last Month";
        } else if (endDate.getTime() === today.getTime() && startDate.getFullYear() === today.getFullYear() - 1) {
            return "Last Year";
        } else {
            return "Custom";
        }
    };

    const initialPeriod = value || (urlStartDate && urlEndDate ? calculatePeriodFromDates(new Date(urlStartDate), new Date(urlEndDate)) : "") ||defaultPeriod ;

    const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);

    const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const period = event.target.value;
        setSelectedPeriod(period);

        const { startDate, endDate } = calculateDateRange(period);
        onPeriodChange(startDate, endDate, period);
    };

    const calculateDateRange = (period: string) => {
        const endDate = new Date();
        let startDate = new Date();

        switch (period) {
            case "Last Week":
                startDate.setDate(endDate.getDate() - 7);
                break;
            case "Last Month":
                startDate.setMonth(endDate.getMonth() - 1);
                break;
            case "Last Year":
                startDate.setFullYear(endDate.getFullYear() - 1);
                break;
            case "Today":
                startDate.setHours(endDate.getHours() - 24);
                break;
        }
        return { startDate, endDate };
    };

    return (
        <div>
            <div className="relative inline-block">
                <select
                    id="period-select"
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                    aria-label="Select period dropdown"
                    className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-black dark:text-white"
                >
                    {Object.entries(PeriodTypes).map(([key, value]) => (
                        <option key={value} value={value}>
                            {key}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CalendarClock className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};