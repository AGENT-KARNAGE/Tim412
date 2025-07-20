import { useState } from 'react';
import { FaUserCircle, FaTimes } from 'react-icons/fa'; // Make sure to install react-icons
import "./userPanel.css";

function UserPanel({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload(); // or setUser(null);
  };

  if (!user) return null;

  return (
    <div className="user-panel-wrapper">
      <FaUserCircle
        className="user-icon"
        size={58}
        onClick={() => setIsOpen(!isOpen)}
        title="Click to view user panel"
      />

      {isOpen && (
        <div className="user-panel animate-slide-in">
            <FaTimes 
            title="Close"
            className="close-icon"
            onclick={()=>setIsOpen(!isOpen)} /> 
          <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Education:</strong> {user.education}</p>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default UserPanel;