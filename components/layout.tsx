import Footer from "./footer"
import Navbar from "./navbar"


const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray">
            <Navbar />
            <main className="grow">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout

//Types
type Props = {
    children?: React.ReactNode
}