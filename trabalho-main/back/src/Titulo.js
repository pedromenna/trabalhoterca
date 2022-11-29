import './Titulo.css'

function Titulo() {
  return (
    <div className="container-fluid bg-primary text-dark">
      <div className="row align-items-center">
        <div className="col-sm-4 col-md-12 text-center mt-3 mb-3">
          <img src="logo.png" alt="Logo da imob" className="logo" />
        </div>
      </div>
    </div>
  )
}

export default Titulo