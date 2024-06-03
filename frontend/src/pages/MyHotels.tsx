import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client"
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
    const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
        onError: ()=> {

        }
    })

    if(!hotelData){
       return <span>Отели не найдены</span> 
    }

    return (
    <div className="space-y-5">
        <span className="flex justify-between">
            <h1 className="text-3xl font-bold">
                Мои отели
            </h1>
            <Link to="/add-hotel" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Добавить отель</Link>
        </span>
        <div className="grid grid-cols-1 gap-8">
           {hotelData.map((hotel)=>(
                <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
                    <h2 className="text-2xl font-bold">{hotel.name}</h2>
                    <div className="whitespace-pre-line">{hotel.description}</div>
                    <div className="grid grid-cols-5 gap-2">
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BsMap className="mr-1"/>
                             { hotel.city}, {hotel.country}
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BsBuilding className="mr-1"/>
                             { hotel.type}
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BiMoney className="mr-1"/>
                             { hotel.pricePerNight}₽ за ночь
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BiHotel className="mr-1"/>
                            {hotel.adultCount} взрослых, {hotel.childCount} детей
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BiStar className="mr-1"/>
                             { hotel.starRating} звезд
                        </div>
                    </div>
                    <span className="flex justify-end">
                     <Link to={`/edit-hotel/${hotel._id}`} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Подробнее</Link>   
                     </span>
                </div>

           ))}     
        </div> 
    </div>
    )
};
export default MyHotels;