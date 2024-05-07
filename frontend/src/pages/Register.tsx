import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

 export type RegisterFormData = {
    firstName: string,
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
      } = useForm<RegisterFormData>();
    

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({message: "Регистрация успешна!", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken")
            navigate("/");
        },
        onError:(error: Error)=> {
            showToast({message: error.message, type: "ERROR"})
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
      });

    return ( <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Создать аккаунт</h2>
        <div className="flex flex-col md:flex-row gap-5">
            <label className="text-gray-700 text-sm font-bold flex-1">Имя <input className="border rounded w-full py-1 px-2 font-normal" {...register("firstName",{required: "Это поле является обязательным"})}></input>{errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
            )}</label>
            <label className="text-gray-700 text-sm font-bold flex-1">Фамилия <input className="border rounded w-full py-1 px-2 font-normal" {...register("lastName",{required: "Это поле является обязательным"})} ></input>{errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
            )}</label>
        </div>
        <label className="text-gray-700 text-sm font-bold flex-1">Email <input type="email" className="border rounded w-full py-1 px-2 font-normal" {...register("email",{required: "Это поле является обязательным"})} ></input>{errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
            )}</label>
        <label className="text-gray-700 text-sm font-bold flex-1">Пароль <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("password",{required: "Это поле является обязательным", minLength: {value:6, message: "Пароль должен содержать не менее 6 символов"}, })} ></input>{errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
            )}</label>
        <label className="text-gray-700 text-sm font-bold flex-1">Подтверждение пароля <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("confirmPassword",{validate:(val)=>{
            if(!val){
                return "Это поле является обязательным";
            } else if (watch("password") !== val){
                return "Ваш пароль не совпадает";
            }
        },
    })} ></input>{errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}</label>
        <span>
            <button type="submit" className="bg-green-800 text-white p-2 font-bold hover:bg-green-700 text-xl rounded-full"> Создать аккаунт</button>
        </span> 
    </form>
    );

};
export default Register;