import axios, { AxiosResponse } from "axios";
import { extractStringValues } from "../extract-string-values-in-nested-objs";
import { IBaseApiResponse, IParsedApiResponse } from "@/lib/interfaces/base-api-response-interface";

// Define a generic interface for the response
interface IHandleApiServerSideErrorResponseProps<T> {
    request: () => Promise<AxiosResponse<T>>; // Function that returns a promise of AxiosResponse with type T
    successMessage?: string; // Optional success message to be used when the operation succeeds
}

export const handleUseServerResponse = async <T>({
    request,
    successMessage = "Operation successful! 🎉",
}: IHandleApiServerSideErrorResponseProps<T>): Promise<
    IParsedApiResponse<T>
> => {
    try {
        // Perform the Axios request
        const response = await request();

        // Check if the response status is exactly 200
        if (response.status === 200) {
            return { successMessage: successMessage, data: response.data };
        }

        // Handle other 2xx (204, 201)
        return { errors: "Unexpected status code received.", data: response.data };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // The request was made and the server responded with a status code
            if (error.response) {
                // Handle 422 Error code
                if (error.response.status === 422) {
                    if (error.response?.data?.errors) {
                        const extractedStrings = extractStringValues(
                            error.response.data.errors
                        );
                        return { errors: extractedStrings };
                    }
                }

                // Check for unauthorized access
                if (error.response.status === 401) {
                    return {
                        errors:
                            error.response?.data?.message || "Warning! Unauthorized access.",
                    };
                }

                // Handle other specific errors that are not 500 or 404
                if (![500, 404].includes(error.response.status)) {
                    return {
                        errors:
                            error?.response?.data?.message ||
                            "Something went wrong. Try again later.",
                    };
                }

                // Handle server errors and not found errors
                if (error.response.status === 500) {
                    return { errors: "Internal server error. Please try again later." };
                }
                if (error.response.status === 404) {
                    return { errors: "Resource not found. Please check the URL or data." };
                }

                // Fallback for other errors with HTTP status
                return {
                    errors:
                        error.response.data?.message ||
                        "Failed to process request. Try again later.",
                };
            } else if (error.request) {
                // The request was made but no response was received
                return { errors: "Internal server error. Please try again later." };
            } else {
                // Fallback for other errors
                return { errors: "An unexpected error occurred." };
            }
        }

        // Handle cases where the error is not an Axios error
        return { errors: "An unexpected error occurred." };
    }
};