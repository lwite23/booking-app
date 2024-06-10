import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const{showToast} = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const location = useLocation();

    const { register, formState: {errors}, handleSubmit } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
           showToast({message: "Вы вошли в аккаунт!", type: "SUCCESS"});
           await queryClient.invalidateQueries("validateToken");
           navigate(location.state?.from?.pathname || "/")
        },
        onError: (error: Error)=>{
            showToast({message: error.message, type: "ERROR"})
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
      });

    return (
        
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Войдите в свой аккаунт
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Почта
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  className="indent-[2%] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("email", {
                    required: "Это поле является обязательным",
                  })}
                ></input>
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
            </div>
            <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Пароль
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                className="indent-[2%] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("password", {
                  required: "Это поле является обязательным",
                  minLength: {
                    value: 6,
                    message: "Пароль должен содержать не менее 6 символов",
                  },
                })}
              ></input>
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {" "}
                Авторизоваться
              </button>
            </div>
          </form>
          <span className="mt-10 text-center text-sm text-gray-500">
            Не зарегистрированы?{" "}
            <Link className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" to="/register">
              Создайте аккаунт сейчас
            </Link>
          </span>
        </div>
      </div>
    );
    
};
export default SignIn;