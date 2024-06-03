import Header from "../components/Header";



interface Props{
    children: React.ReactNode;
}

const SignInPage = ({children}: Props) =>  {
    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto">
        {children}
        </div>
    </div>
    );   
};

export default SignInPage;