import { Link } from "react-router-dom";


const Header = () => {
    return ( 
    <div className="bg-green-800 py-6">
       <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
            <Link to="/">HotelHelper.ru</Link>
        </span>
        <span className="flex space-x-2">
            <Link to="/sign-in" className="flex bg-white items-center hover:bg-gray-300 text-green-800 font-bold py-2 px-4 rounded-full">Войти</Link>
        </span>
       </div>
    </div>
    );
};
export default Header;