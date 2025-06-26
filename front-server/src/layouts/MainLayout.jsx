import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'

const MainLayout = ({ children }) => {
    return (
        <div>
            <Header/>
            <main>{children}</main>
            <Footer/>
            
        </div>
    )
}

export default MainLayout