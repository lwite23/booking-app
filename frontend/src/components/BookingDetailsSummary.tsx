import { setDefaultLocale } from "react-datepicker";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

setDefaultLocale("ru")

const BookingDetailsSummary = ({
    checkIn,
    checkOut,
    adultCount,
    childCount,
    numberOfNights,
    hotel,
  }: Props) => {
    return (
      <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
        <h2 className="text-xl font-bold">Ваши данные о бронировании</h2>
        <div className="border-b py-2">
        Местоположение:
          <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
        </div>
        <div className="flex justify-between">
          <div>
            Заезд
            <div className="font-bold"> {checkIn.toLocaleDateString('ru-RU')}</div>
          </div>
          <div>
            Отъезд
            <div className="font-bold"> {checkOut.toLocaleDateString()}</div>
          </div>
        </div>
        <div className="border-t border-b py-2">
          Общая продолжительность пребывания:
          <div className="font-bold">{numberOfNights} ночей</div>
        </div>
  
        <div>
          Гостей {" "}
          <div className="font-bold">
            {adultCount} взрослых и {childCount} детей
          </div>
        </div>
      </div>
    );
  };
  
  export default BookingDetailsSummary;