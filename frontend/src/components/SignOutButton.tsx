import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({message:"Вы вышли из аккаунта!", type: "SUCCESS"})
        },
        onError:(error: Error)=>{
            showToast({message: error.message, type: "ERROR"})
        },
    });

    const handleClick = () => {
        mutation.mutate();
    }

    return(
       <button onClick={handleClick} className="flex bg-white items-center hover:bg-gray-300 text-green-800 font-bold py-2 px-4 rounded-lg">Выйти</button> 
    );
};

export default SignOutButton;