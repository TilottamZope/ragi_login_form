import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className ="navbar-brand" to="/">Navbar</Link>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        
                        <form className="d-flex">
                            
                            <Link to="/ragistration">Ragistration</Link>
                        </form>
                    </div>
                </div>
            </nav>
    </div>
  )
}

export default Navbar
