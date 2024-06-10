import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";




const Header = () => {
    const {isLoggedIn} = useAppContext();
    return ( 
    <div className="bg-green-800 py-6">
       <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="/" className="flex items-center">
        <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
            BookAway
        </span>
        </a>
        <span className="flex space-x-2">
            {isLoggedIn ? (<>
                <Link className="flex items-center text-white px-3 font-bold hover:bg-green-600 rounded-lg " to="/my-bookings">Мои заказы</Link>
                <Link className="flex items-center text-white px-3 font-bold hover:bg-green-600 rounded-lg " to="/my-hotels">Мои отели</Link>
                <SignOutButton />
            </>
            ):(<> <Link to="/register" className="flex bg-white items-center hover:bg-gray-300 text-green-800 font-bold py-2 px-4 rounded-lg">Зарегистрироваться</Link>
            <Link to="/sign-in" className="flex bg-white items-center hover:bg-gray-300 text-green-800 font-bold py-2 px-4 rounded-lg">Войти</Link> </>) }
            
        </span>
       </div>
    </div>
    );
};
export default Header;