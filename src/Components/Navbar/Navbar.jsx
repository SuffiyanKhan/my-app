import './Navbar.css'
import logo from '../Images/logo.png'
import { auth } from '../../Config/FirebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
function AppNavbar() {
  const navigate = useNavigate()
  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Logout Successfully!",
          icon: "success"
        }).then((result)=>{
          if(result){
            auth.signOut().then(() => {
              navigate('/');
              window.location.reload()
            });
          }
        })
      }
    });
    
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-color px-5 border-bottom position-sticky">
  <div className="container-fluid">
    <img src={logo} className='navbar-brand img-fluid' style={{width : 70}} />
    <button className="navbar-toggler bg-primary outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <i className="fa-solid fa-bars text-light"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to={'/home'}>Home</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" style={{cursor : 'not-allowed'}} aria-current="page">About</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" style={{cursor : 'not-allowed'}} aria-current="page">Contact</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" style={{cursor : 'not-allowed'}} aria-current="page">Support</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active"style={{cursor : 'not-allowed'}}  aria-current="page">Classes</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" onClick={logout}>Logout</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default AppNavbar;