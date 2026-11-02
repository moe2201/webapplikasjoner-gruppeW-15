export function Navbar() {
    return (
        <nav className = "flex items-center justify-between border-b bg-white px-8 py-4">
            <h2 className= "text-2xl font-bold text-purple-700" >Booking Portal</h2>
            <ul className = "flex gap-8 list-none text-purple-700">
                <li><a href="/">Home</a></li>
                <li><a href="/services">Tjenester</a></li>
                <li><a href="/portfolio">Portfolio</a></li>
                <li><a href="/booking">Booking</a></li>
            </ul>
    </nav>
    );
}