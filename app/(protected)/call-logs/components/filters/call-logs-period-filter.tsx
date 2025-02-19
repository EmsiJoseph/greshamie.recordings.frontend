import { CalendarClock } from "lucide-react";
import { useState } from "react";
import { PeriodTypes } from "@/constants/period-types";

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
    const [selectedPeriod, setSelectedPeriod] = useState(value || defaultPeriod || "");

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
            case "All":
                startDate = new Date(0);
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
                    <option value="" disabled>Select a period</option>
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