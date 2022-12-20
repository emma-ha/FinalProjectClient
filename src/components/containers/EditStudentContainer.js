import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import {editStudentThunk, fetchCampusThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
        firstname: "",
        lastname: "",
        campusId: null,
        redirect: false,
        redirectId: null,
    };
  }

  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);
}

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();  

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: this.state.campusId,
        id: this.state.studentId
    };
    
    
    await this.props.editCampus(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
        firstname: "", 
        lastname: "", 
        campusId: null, 
        redirect: true, 
        redirectId: this.state.studentId
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView 
          student = {this.state}
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchCampus: (campusId) => dispatch(fetchCampusThunk(campusId)),
        editCampus: (student) => dispatch(editStudentThunk(student)),
    })
}

const mapState = (state) => {
    return {
        student: state.student
    };
};


// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values whsen the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);