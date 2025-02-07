import { useSearchParams, useRouter } from 'next/navigation';

export const useGetUrlParams = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const getUrlParams = (param: string) => {
        return searchParams.get(param) || "";
    };

    return getUrlParams;
};