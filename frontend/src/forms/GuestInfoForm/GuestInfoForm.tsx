import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { ru } from 'date-fns/locale/ru';
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  
    const search = useSearchContext();
    const {isLoggedIn} = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const {
      watch,
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<GuestInfoFormData>({
        defaultValues: {
          checkIn: search.checkIn,
          checkOut: search.checkOut,
          adultCount: search.adultCount,
          childCount: search.childCount,
        },
});

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues(
          "",
          data.checkIn,
          data.checkOut,
          data.adultCount,
          data.childCount
        );
        navigate("/sign-in", { state: { from: location } });
      };

      const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues(
          "",
          data.checkIn,
          data.checkOut,
          data.adultCount,
          data.childCount
        );
        navigate(`/hotel/${hotelId}/booking`);
      };

    return (
      <div className="flex flex-col p-4 bg-green-200 gap-4">
        <h3 className="text-md font-bold">{pricePerNight} ₽ /за ночь</h3>
        <form onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }>
          <div className="grid grid-cols-1 gap-4 items-center">
            <div>
              <DatePicker
                required
                dateFormat="d/MM/yyyy"
                locale={ru}
                selected={checkIn}
                onChange={(date) => setValue("checkIn", date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Выберите дату"
                className="min-w-full bg-white p-2 focus:outline-none rounded-lg"
                wrapperClassName="min-w-full"
              />
            </div>
            <div>
              <DatePicker
                required
                dateFormat="d/MM/yyyy"
                locale={ru}
                selected={checkOut}
                onChange={(date) => setValue("checkOut", date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Выберите дату"
                className="min-w-full bg-white p-2 focus:outline-none rounded-lg"
                wrapperClassName="min-w-full"
              />
            </div>
            <div className="flex bg-white px-2 py-1 gap-2 rounded-lg">
              <label className="items-center flex">
                Взрослых:
                <input
                  className="w-full p-1 focus:outline-none font-bold"
                  type="number"
                  min={1}
                  max={20}
                  {...register("adultCount",{
                    required: "Это поле обязательно",
                    min: { 
                        value: 1,
                        message: "Должен быть хотя бы 1 взрослый"
                    },
                    valueAsNumber: true,

                  })}
                />
              </label>
              <label className="items-center flex">
                Детей:
                <input
                  className="w-full p-1 focus:outline-none font-bold"
                  type="number"
                  min={0}
                  max={20}
                  {...register("childCount", {
                    valueAsNumber:true
                  })}
                />
              </label>
              {errors.adultCount && (
                <span className="text-red-500 font-semibold text-sm">
                    {errors.adultCount.message}
                </span>
              )}
            </div>
            {isLoggedIn ? (<button className="h-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl p-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Забронировать</button>) :
             (<button className="h-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl p-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Войти в аккаунт</button>)}
          </div>
        </form>
      </div>
    );
}

export default GuestInfoForm;