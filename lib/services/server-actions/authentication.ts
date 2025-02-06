// "use server";

// import { AxiosResponse } from "axios";
// import { ILoginApiResponse } from "@/lib/interfaces/authentication-interfaces";
// import { flattenValidationErrors } from "next-safe-action";
// import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
// import { loginEndpoint } from "@/api/endpoints/auth-endpoints";
// import { LoginSchema } from "@/lib/schema/authentication-schema";
// import { actionClient } from "@/lib/config/safe-action";
// // import { loginUserUseCase } from "@/core/use-cases/users";
// import { cookies } from "next/headers";
// // import { loginRoute } from "@/config/api/backend-routes/auth-routes";
// import { handleUseServerResponse } from "@/lib/handlers/api-response-handlers/handle-use-server-response";
// import { setAuthCookie } from "@/lib/services/server-actions/cookie";

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
//         handleValidationErrorsShape: async (ve) =>
//             flattenValidationErrors(ve).fieldErrors,
//     })
//     .action(
//         async ({
//             parsedInput: { email, password},
//         }) => {
//             const request = async (): Promise<
//                 AxiosResponse<ILoginApiResponse>> => {
//                 let requestBody: { email: string; password: string; } = {
//                     email,
//                     password,
//                 };

//                 return GreshamAxiosConfig.post<ILoginApiResponse>(
//                     loginEndpoint,
//                     requestBody
//                 );
//             };

//             // Handle the response
//             const response = await handleUseServerResponse({
//                 request,
//                 successMessage: "Logged in successfully! 🎉",
//             });
            

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