import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { ru } from 'date-fns/locale/ru';


setDefaultLocale("ru")

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handleClear = (event: FormEvent) =>{
    event.preventDefault()
    setDestination('')
  }


  return (
    <form onSubmit={handleSubmit} className="-mt-8 p-3 bg-gray-400 rounded-lg shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
        <div className="flex flex-row items-center flex-1 bg-white p-2 rounded-lg">
            <MdTravelExplore size={25} className="mr-2"/>
            <input id="search"  placeholder="Куда вы хотите поехать?" className="text-md w-full focus:outline-none" value={destination} onChange={(event)=> setDestination(event.target.value)}/>
        </div>

        <div className="flex bg-white px-2 py-1 gap-2 rounded-lg">
            <label className="items-center flex">
                Взрослых:
                <input className="w-full p-1 focus:outline-none font-bold" type="number" min={1} max={20} value={adultCount} onChange={(event)=> setAdultCount(parseInt(event.target.value))}/>
            </label>
            <label className="items-center flex">
                Детей:
                <input className="w-full p-1 focus:outline-none font-bold" type="number" min={0} max={20} value={childCount} onChange={(event)=> setChildCount(parseInt(event.target.value))}/>
            </label>
        </div>
        <div >
            <DatePicker dateFormat="dd, MMMM, yyyy"  locale={ru} selected={checkIn} onChange={(date)=> setCheckIn(date as Date)} selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText="Выберите дату" className="min-w-full bg-white p-2 focus:outline-none rounded-lg" wrapperClassName="min-w-full"/>
        </div>
        <div>
            <DatePicker    dateFormat="dd, MMMM, yyyy" locale={ru} selected={checkOut} onChange={(date)=> setCheckOut(date as Date)} selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText="Выберите дату" className="min-w-full bg-white p-2 focus:outline-none rounded-lg" wrapperClassName="min-w-full"/>
        </div>
        <div className="flex gap-1">
            <button type="submit" className="w-2/3 h-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl p-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Найти
            </button>
            <button onClick={handleClear} className=" w-2/3 h-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl p-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            Очистить
            </button>
        </div>
    </form>
  )
}

export default SearchBar;