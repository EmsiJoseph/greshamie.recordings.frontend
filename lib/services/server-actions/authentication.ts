"use server";

import { AxiosResponse } from "axios";
import { ILoginApiResponse } from "@/lib/interfaces/authentication-interfaces";
import { flattenValidationErrors } from "next-safe-action";
import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { loginEndpoint, logoutEndpoint } from "@/api/endpoints/auth-endpoints";
import { LoginSchema } from "@/lib/schema/authentication-schema";
// import { cookies } from "next/headers";
import { actionClient } from "@/lib/config/safe-action";
import { deleteAuthCookie, setAuthCookie } from "./cookie";
import { handleUseServerResponse } from "@/lib/handlers/api-response-handlers/handle-use-server-response";
// import { loginUserUseCase } from "@/core/use-cases/users";
// import { loginRoute } from "@/config/api/backend-routes/auth-routes";

// TODO: Implement zsa
/**
 * Handles login action.
 *
 * @remarks
 * This action is used to handle login request from the client.
 * It uses the {@link loginUserUseCase} use case to perform the business logic for logging in.
 *
 * @param {LoginInput} input - The login input.
 * @returns {Promise<LoginOutput>} - The login output.
 */
export const loginUserAction = actionClient
    .schema(LoginSchema, {
        handleValidationErrorsShape: async (ve) =>
            flattenValidationErrors(ve).fieldErrors,
    })
    .action(
        async ({ parsedInput: { username, password } }) => {
            const request = async (): Promise<AxiosResponse<ILoginApiResponse>> => {
                // eslint-disable-next-line prefer-const
                let requestBody = { username, password };

                return GreshamAxiosConfig.post<ILoginApiResponse>(loginEndpoint, requestBody);
            };

            // Handle the response
            const response = await handleUseServerResponse({
                request,
                successMessage: "Logged in successfully! 🎉",
            });

            if (response?.data?.access_token) {
                const isSetSuccessfully = await setAuthCookie(response?.data);
                if (!isSetSuccessfully) {
                    throw new Error("Failed to set auth cookie");
                }
            }
            return response;
        }
    );

export const logoutUserAction = actionClient.action(async () => {
    try {
        const response = await GreshamAxiosConfig.post(logoutEndpoint);

        if (response.status === 200) {
            await deleteAuthCookie(); // Ensure it's a server action
            return true;
        } else {
            throw new Error("Failed to log out");
        }
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
});