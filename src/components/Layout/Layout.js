import TopNavigation from "./TopNavigation";
import Footer from "./Footer"

export default function Layout({children}){
    return(
        <>
        <TopNavigation/>
        {children}
        <Footer/>
        </>
    )
}
