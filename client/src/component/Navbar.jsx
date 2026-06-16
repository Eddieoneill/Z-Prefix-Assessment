import "../App.css";

export default function Navbar() {
  return (
    <>
      <nav className="nav-container">
        <div className="left-container">
          <button className="left-buttons">Home</button>
        </div>
        <div className="info-container">
          <div className="info-text-container">
            <div>Name: </div>
          </div>
          <div className="info-button-container">
            <button>Your Items</button>
            <button>Log-out</button>
          </div>
        </div>
      </nav>
    </>
  );
}
