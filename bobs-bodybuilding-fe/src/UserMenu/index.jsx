import "./index.css";

export default function UserMenu() {
    return (
      <div className="menu_grid">
        <div className="left_column">
          <button className="menu_button">My Programs</button>
        </div>
        <div className="middle_column">
          <button className="menu_button">Create new Program</button>
        </div>
        <div className="right_column">
          <button className="menu_button">Create new Exercise</button>
        </div>
      </div>
    );
}