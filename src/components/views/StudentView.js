/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link} from "react-router-dom";



const StudentView = (props) => {
  const { student } = props;


  // Render a single Student view 
  return (
      <div>
        <h1>{student.firstname + " " + student.lastname}</h1>
        <h3>{student.campus ? student.campus.name : <p>Student is not enrolled in a campus</p>}</h3>
        <h3>{student.email}</h3>
        <h3>GPA: {student.gpa}</h3>
        {student.campus ? (<Link to={`/campus/${student.campus.id}`}>{student.campus.name}</Link>) : (<p>No Campus Listed</p>)}
        <br>
        </br>
      </div> 
  );

};

export default StudentView;