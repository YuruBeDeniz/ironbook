import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import users from './users.json'
import linkedinPic from './linkedin.png'

function App() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [userList, setUserList] =useState(users)
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [campus, setCampus] = useState();
  

  const handleSearch = event => {
    setSearch(event.target.value)
  }

  const handleIsStudentChange = event => {
    setIsStudent(event.target.checked)
    const checkIfStudent = userList.slice().filter(user => user.role === 'student')
    console.log(checkIfStudent)
    setUserList(checkIfStudent);
  }

  const handleIsTeacherChange = event => {
    setIsTeacher(event.target.checked)
    const checkIfTeacher = userList.slice().filter(user => user.role === 'teacher')
    setUserList(checkIfTeacher);
  }

  const handleCampusChange = event => {
    setCampus(event.target.value)
  }
   

  const filteredUsers = userList.slice().filter(user => {
    if(user.firstName.toLowerCase().includes(search.toLowerCase()) || user.lastName.toLowerCase().includes(search.toLowerCase())){
      return true;
    } 
  })

  const findCampuses = () => {
    let campusArray = [];
    userList.forEach(user => {
      if(!user.includes(user.campus)){
       campusArray.push(user.campus);
      }
    })
    return campusArray;
  }

  

  return (
    <div className="App">
    <h1>Iron Book</h1>

    
    <input type='text' value={search} onChange={handleSearch}/>


    <label>Teacher</label>
    <input type="checkbox" checked={isTeacher} onChange={handleIsTeacherChange} />
    <label>Student</label>
    <input type="checkbox" checked={isStudent} onChange={handleIsStudentChange} />
    

    <label>Campus:</label>
    <select>
    {userList.slice().map(user => (
      <option value={campus} onChange={handleCampusChange}>{user.campus}</option>
    ))}
    </select>


    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Campus</th>
          <th>Role</th>
          <th>Link</th>
        </tr>
      </thead>

      <tbody>
      {filteredUsers.map(user => (
        <tr key={user.id}>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.campus}</td>
          <td>{user.role}</td>
          <td>{user.linkedin ? <img height='16' src={linkedinPic}/> : ''}</td>
        </tr>
      ))}
      </tbody>
    </table>
    </div>
  )
}

export default App
