import "./index.css";

export default function Dashboard() {
    return (
      <main className="dashboard_layout">
        <div className="dashboard_grid">
            <div className="program_column">
                <h3>My Programs</h3>
            </div>
            <div className="exercise_column">
                <h3>Name of Program</h3>
            </div>
        </div>
      </main>
    );
}