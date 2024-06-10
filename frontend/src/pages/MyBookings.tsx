import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { Link } from "react-router-dom";



const MyBookings = () => {
  const { data: hotels } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!hotels || hotels.length === 0) {
    return <span>Бронирования не найдены</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Мои бронирования</h1>
      {hotels.map((hotel) => (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">
              {hotel.name}
              <div className="text-xs font-normal">
                {hotel.city}, {hotel.country}
              </div>
            </div>
            {hotel.bookings.map((booking) => (
              <div>
                <div>
                  <span className="font-bold mr-2">Даты: </span>
                  <span>
                    {new Date(booking.checkIn).toLocaleDateString()} -
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Гости:</span>
                  <span>
                    {booking.adultCount} взрослых, {booking.childCount} детей
                  </span>
                  <span className="flex justify mt-3">
                     <Link to={'/'} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Отменить бронирование</Link>   
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
       
    </div>
  );
};

export default MyBookings;