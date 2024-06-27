import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Users() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999")
      .then((res) => {
        console.log("Response data:", res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async(id) => {
    try{
        await axios.delete('http://localhost:9999/delete/'+id)
        window.location.reload()
    }catch(err){
        console.log(err)
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded">
        <Link to="/create" className="btn btn-success">
          ADD
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map((data, i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                  <Link to={`update/${data.id}`} className="btn btn-primary">Update</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(data.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
