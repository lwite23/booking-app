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

    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Создайте аккаунт
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Имя{" "}
              </label>
              <div className="mt-2">
                <input
                  className="indent-[2%] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("firstName", {
                    required: "Это поле является обязательным",
                  })}
                ></input>
                {errors.firstName && (
                  <span className="text-red-500">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Фамилия{" "}
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="indent-[2%] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("lastName", {
                    required: "Это поле является обязательным",
                  })}
                ></input>
                {errors.lastName && (
                  <span className="text-red-500">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Почта{" "}
                </label>
              </div>

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
              Пароль{" "}
             
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
                <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
              Подтверждение пароля{" "}
              
            </label>
                </div>
                <div className="mt-2">
                <input
                type="password"
                className="indent-[2%] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("confirmPassword", {
                  validate: (val) => {
                    if (!val) {
                      return "Это поле является обязательным";
                    } else if (watch("password") !== val) {
                      return "Ваш пароль не совпадает";
                    }
                  },
                })}
              ></input>
              {errors.confirmPassword && (
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
                </div>
           
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {" "}
                Создать аккаунт
              </button>
            </div>
          </form>
        </div>
      </div>
    );

};
export default Register;