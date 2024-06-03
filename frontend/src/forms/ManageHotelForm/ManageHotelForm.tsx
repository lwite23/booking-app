import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
  };

  type Props ={
    hotel?: HotelType;
    onSave: (hotelFormData: FormData)=>void
    isLoading: boolean
  }


const ManageHotelForm = ({onSave, isLoading, hotel}: Props) => {
    const formMethods = useForm<HotelFormData>();
    const {handleSubmit, reset} = formMethods;

    useEffect(()=>{
      reset(hotel);
    }, [hotel, reset])

    const onSubmit = handleSubmit((formDataJson: HotelFormData)=>{
        const formData = new FormData();
        if(hotel){
          formData.append("hotelId", hotel._id)
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
          });

          if(formDataJson.imageUrls){
            formDataJson.imageUrls.forEach((url, index)=>{
              formData.append(`imageUrls[${index}]`, url)
            })
          }

          Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
          });

          onSave(formData)
    })
    return (
    <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
            <DetailsSection/>
            <TypeSection/>
            <FacilitiesSection/>
            <GuestsSection/>
            <ImagesSection/>
            <span className="flex justify-end">
                <button disabled={isLoading} type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 disabled:bg-gray-500">
                    {isLoading? "Сохранение..." : "Сохранить"}
                </button>
            </span>
        </form>
        </FormProvider>
    );
};

export default ManageHotelForm;