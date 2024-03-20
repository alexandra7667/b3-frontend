import { useEffect, useContext } from "react";
import { UserContext, ProgramsContext, ExercisesContext } from "../App";

import "./index.css";
import ProgramsList from "./components/ProgramsList";

export default function Dashboard() {
  const { token, userId } = useContext(UserContext);
  const { programs, setPrograms } = useContext(ProgramsContext);
  const { privateExercises, setPrivateExercises, sharedExercises, setSharedExercises } = useContext(ExercisesContext);

  //Lägg in fetches för program, shared exercises, private exercises
    useEffect(() => {
    const fetchData = async () => {
      try {

        // Second fetch to retrieve programs
        const programsResponse = await fetch(`http://localhost:4000/users/${userId}/programs`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!programsResponse.ok) {
          throw new Error('Failed to fetch programs');
        }

        const programsData = await programsResponse.json();
        setPrograms(programsData.data);

        // Third fetch to retrieve shared exercises
        const sharedExercisesResponse = await fetch("http://localhost:4000/sharedexercises", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!sharedExercisesResponse.ok) {
          throw new Error('Failed to fetch shared exercises');
        }

        const sharedExercisesData = await sharedExercisesResponse.json();
        setSharedExercises(sharedExercisesData.data);

        // Fourth fetch to get private exercises
        const privateExercisesResponse = await fetch(`http://localhost:4000/users/${userId}/privateexercises`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!privateExercisesResponse.ok) {
          throw new Error('Failed to fetch private exercises');
        }

        const privateExercisesData = await privateExercisesResponse.json();
        setPrivateExercises(privateExercisesData.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

    return (
      <div className="programs_container">
        <ProgramsList />
      </div>
    );
}