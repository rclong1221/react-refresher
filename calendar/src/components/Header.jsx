import './Header.css';

function Header(props) {
    return (
        <nav className='navbar'>
            <div className='navbar-section'>
                <h2>Calendar</h2>
            </div>
            <div>
                <ul className='navbar-menu'>
                    <li><button>Add Event</button></li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;