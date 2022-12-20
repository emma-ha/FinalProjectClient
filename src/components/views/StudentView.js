import { useHistory, Link} from "react-router-dom";



const StudentView = (props) => {
  const { student } = props;
  const update = useHistory();


  // Render a single Student view 
  return (
      <div>
        <h1>{student.firstname + " " + student.lastname}</h1>
        <h3>{student.campus ? student.campus.name : <p>Student is not enrolled in a campus</p>}</h3>
        <h3>{student.email}</h3>
        {student.campus ? (<Link to={`/campus/${student.campus.id}`}>{student.campus.name}</Link>) : (<p>No campus on record</p>)}
        <br>
        </br>
        <br>
        </br>
        <button onClick={() => {update.push(`/student/${student.id}/edit`);}}>Edit Student Info</button>
      </div> 
  );

};

export default StudentView;