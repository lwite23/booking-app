import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";




const Header = () => {
    const {isLoggedIn} = useAppContext();
    return ( 
    <div className="bg-green-800 py-6">
       <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
            <Link to="/">HotelHelper.ru</Link>
        </span>
        <span className="flex space-x-2">
            {isLoggedIn ? (<>
                <Link className="flex items-center text-white px-3 font-bold hover:bg-green-600" to="/my-bookings">Мои заказы</Link>
                <Link className="flex items-center text-white px-3 font-bold hover:bg-green-600" to="/my-hotels">Мои отели</Link>
                <SignOutButton />
            </>
            ):( <Link to="/sign-in" className="flex bg-white items-center hover:bg-gray-300 text-green-800 font-bold py-2 px-4 rounded-full">Войти</Link>)}
            
        </span>
       </div>
    </div>
    );
};
export default Header;