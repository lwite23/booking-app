import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const{showToast} = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, formState: {errors}, handleSubmit } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
           showToast({message: "Вы вошли в аккаунт!", type: "SUCCESS"});
           await queryClient.invalidateQueries("validateToken");
           navigate("/")
        },
        onError: (error: Error)=>{
            showToast({message: error.message, type: "ERROR"})
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
      });

    return(
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Войти</h2>

            <label className="text-gray-700 text-sm font-bold flex-1">Email <input type="email" className="border rounded w-full py-1 px-2 font-normal" {...register("email",{required: "Это поле является обязательным"})} ></input>{errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
            )}</label>
        <label className="text-gray-700 text-sm font-bold flex-1">Пароль <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("password",{required: "Это поле является обязательным", minLength: {value:6, message: "Пароль должен содержать не менее 6 символов"}, })} ></input>{errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
            )}</label>
             <span className="flex items-center justify-between">
                <span className="text-sm">
                    Не зарегистрированы? <Link className="underline" to="/register">Создайте аккаунт здесь</Link>
                </span>
            <button type="submit" className="bg-green-800 text-white p-2 font-bold hover:bg-green-700 text-xl rounded-full"> Авторизоваться</button>
        </span> 
        </form>
    )
};
export default SignIn;