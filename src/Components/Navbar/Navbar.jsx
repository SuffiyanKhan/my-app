import './Navbar.css'
import image from '../Images/download-removebg-preview.png'

function AppNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 border-bottom">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img src={image} className='img-fluid' style={{width : 70}} /></a>
    <button className="navbar-toggler bg-primary outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <i className="fa-solid fa-bars text-light"></i>
      {/* <span className="navbar-toggler-icon"></span> */}
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Contact</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Support</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Logout</a>
        </li>
      </ul>
       {/* <button className="btn btn-primary">Get started</button> */}
    </div>
  </div>
</nav>
  );
}

export default AppNavbar;