'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

interface DualRangeSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
    labelPosition?: 'top' | 'bottom';
    label?: (value: number | undefined) => React.ReactNode;
}

const DualRangeSlider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    DualRangeSliderProps
>(({ className, label = (value) => `${value}`, ...props }, ref) => {
    const initialValue = Array.isArray(props.value) ? props.value : [props.min, props.max];

    return (
        <div className="flex flex-col items-center w-full space-y-2">
            <SliderPrimitive.Root
                ref={ref}
                className={cn('relative flex w-full touch-none select-none items-center', className)}
                {...props}
            >
                <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-400">
                    <SliderPrimitive.Range className="absolute h-full bg-slate-600" />
                </SliderPrimitive.Track>
                {initialValue.map((value, index) => (
                    <React.Fragment key={index}>
                        <SliderPrimitive.Thumb className="relative block h-7 w-7 rounded-full bg-slate-600 border-4 border-white focus-visible:ring-2 focus-visible:ring-slate-600">
                        </SliderPrimitive.Thumb>
                    </React.Fragment>
                ))}
            </SliderPrimitive.Root>
            <div className="h-1"></div>
            <div className="flex w-1/2 justify-between text-[15px] text-gray-800 space-x-1">
                <span className="border px-2 py-1 rounded">{label(initialValue[0])}</span>
                <span className="text-gray-800">—</span>
                <span className="border px-2 py-1 rounded">{label(initialValue[1])}</span>
            </div>
        </div>
    );
});
DualRangeSlider.displayName = 'DualRangeSlider';

const DualRangeSliderCustomLabel = ({ onDurationChange }: { onDurationChange: (values: number[]) => void }) => {
    const [values, setValues] = React.useState([0, 3600]);

    React.useEffect(() => {
        onDurationChange(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, values);

    return (
        <div className="w-full space-y-5 px-10">
            <DualRangeSlider
                label={(value) => `${Math.floor((value ?? 0) / 60)} min`}
                value={values}
                onValueChange={setValues}
                min={0}
                max={3600} // 60 minutes * 60 seconds
                step={60} // Step by 1 minute
            />
        </div>
    );
};

export { DualRangeSlider, DualRangeSliderCustomLabel };
