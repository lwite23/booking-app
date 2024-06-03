import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from "../api-client"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () =>{
    const {hotelId} = useParams();
    const {showToast} = useAppContext();
    const { data: hotel } = useQuery("fetchMyHotelById", ()=> apiClient.fetchMyHotelById(hotelId || ''),{
        enabled: !!hotelId,
    })

    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        onSuccess: ()=>{
            showToast({message: "Отель сохранен!", type: "SUCCESS"})
        },
        onError: ()=>{
            showToast({message: "Ошибка сохранения", type: "ERROR"})
        },
    })

    const handlSave = ( hotelFormData: FormData) => {
        mutate(hotelFormData)
    }

    return( <ManageHotelForm hotel={hotel} onSave={handlSave} isLoading={isLoading}/>
    )
}

export default EditHotel;