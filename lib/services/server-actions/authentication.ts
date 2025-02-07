// "use server";

// import { AxiosResponse } from "axios";
// import { ILoginApiResponse } from "@/lib/interfaces/authenticationInterfaces";
// import { flattenValidationErrors } from "next-safe-action";
// import { GreshamAxiosConfig } from "../main-backend-axios-config";
// import { loginEndpoint } from "@/api/endpoints/auth-endpoints";
// // import { LoginSchema } from "@/lib/form-schemas/login-schemas";
// // import { actionClient } from "@/lib/safe-action";
// // import { loginUserUseCase } from "@/core/use-cases/users";
// // import { cookies } from "next/headers";
// // import { ILoginApiResponse } from "@/lib/interfaces";
// // import { AxiosResponse } from "axios";
// // import { loginRoute } from "@/config/api/backend-routes/auth-routes";
// // import { PahiramAxiosConfig } from "@/config/api/BackendAxiosConfig";
// // import { handleApiServerSideErrorResponse } from "@/core/handle-api-server-side-error-response";
// // import { setAuthCookie } from "@/core/data-access/cookies";

// // TODO: Implement zsa
// /**
//  * Handles login action.
//  *
//  * @remarks
//  * This action is used to handle login request from the client.
//  * It uses the {@link loginUserUseCase} use case to perform the business logic for logging in.
//  *
//  * @param {LoginInput} input - The login input.
//  * @returns {Promise<LoginOutput>} - The login output.
//  */
// export const loginUserAction = actionClient
//     .schema(LoginSchema, {
//         handleValidationErrorsShape: (ve) =>
//             flattenValidationErrors(ve).fieldErrors,
//     })
//     .action(
//         async ({
//             parsedInput: { email, password, remember },
//         }) => {
//             const request = async (): Promise<
//                 AxiosResponse<ILoginApiResponse>> => {
//                 let requestBody: { email: string; password: string; remember_me: boolean | undefined } = {
//                     email,
//                     password,
//                     remember_me: remember
//                 };

//                 return GreshamAxiosConfig.post<ILoginApiResponse>(
//                     loginEndpoint,
//                     requestBody
//                 );
//             };

//             // Handle the response
//             const response = await handleApiServerSideErrorResponse({
//                 request,
//                 successMessage: "Logged in successfully! 🎉",
//             });
//             if (response?.data?.status) {
//                 const isSetSuccessfully = await setAuthCookie(response?.data);
//                 if (!isSetSuccessfully) {
//                     throw new Error("Failed to set auth cookie");
//                 }
//             }

//             return response;
//         }
//     );

// export const logoutUserAction = actionClient.action(async () => {
//     return new Promise((resolve, reject) => {
//         try {
//             const cookiesToDelete = cookies().getAll();
//             cookiesToDelete.forEach((cookie) => {
//                 cookies().delete(cookie.name);
//             });
//             setTimeout(() => {
//                 resolve(!cookies().has("auth"));
//             }, 100);
//         } catch (error) {
//             reject(error);
//         }
//     });
// });