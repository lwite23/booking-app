import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
    const {register, formState: {errors}} = useFormContext<HotelFormData>();

    return(
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Добавить отель</h1>
            <label className="text-gray-700 text-sm font-bold flex-1">Название <input type="Text" className="border rounded w-full py-1 px-2 font-normal" {...register("name",{required: "Это поле является обязательным"})} ></input>{errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
            )}</label>

            <div className="flex gap-4">
            <label className="text-gray-700 text-sm font-bold flex-1">Город <input type="Text" className="border rounded w-full py-1 px-2 font-normal" {...register("city",{required: "Это поле является обязательным"})} ></input>{errors.city && (
                <span className="text-red-500">{errors.city.message}</span>
            )}</label>
            <label className="text-gray-700 text-sm font-bold flex-1">Страна <input type="Text" className="border rounded w-full py-1 px-2 font-normal" {...register("country",{required: "Это поле является обязательным"})} ></input>{errors.country && (
                <span className="text-red-500">{errors.country.message}</span>
            )}</label>
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">Описание <textarea rows={10} className="border rounded w-full py-1 px-2 font-normal" {...register("description",{required: "Это поле является обязательным"})} ></textarea>{errors.description && (
                <span className="text-red-500">{errors.description.message}</span>
            )}</label>
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">Цена за ночь <input type="number" min={1} className="border rounded w-full py-1 px-2 font-normal" {...register("pricePerNight",{required: "Это поле является обязательным"})} ></input>{errors.pricePerNight && (
                <span className="text-red-500">{errors.pricePerNight.message}</span>
            )}</label>
             <label className="text-gray-700 text-sm font-bold max-w-[50%]">Звездный рейтинг 
             <select {...register("starRating", {required: "Это поле является обязательным"}

             )} className="border rounded w-full p-2 text-gray-700 font-normal"
             >
                <option value="" className="text-sm font-bold">
                    Выберите рейтинг
                </option>
                {[1,2,3,4,5].map((num)=>(
                    <option value={num}>
                        {num}
                    </option>
                ))}
             </select>
             {errors.starRating && (
                <span className="text-red-500">{errors.starRating.message}</span>
            )}</label>

        </div>
    )
};

export default FacilitiesSection;