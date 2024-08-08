import Footer from './Footer';
import Header from './Header';
import LeftSidebar from './LeftSidebar';


export default function Layout({ children }) {
    return (
        <>
        <div className="drawer drawer-mobile">
            <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    <Header />

                    <main className="flex-1 overflow-y-auto pt-8 px-6  bg-base-200">
                        {children}
                        <div className="h-16"></div>
                    </main>

                    <Footer />
                </div>
                <LeftSidebar />
            </div>
        </>
    )
}
