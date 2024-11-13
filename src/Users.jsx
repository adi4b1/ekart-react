import { getallUsersContext } from "./context/Usersall";
import React, { useContext } from "react";

const Users = () => {
  const { allUsers } = useContext(getallUsersContext);

  return (
    <div>
      <h1>All users</h1>
      <div>
        <table className="tableprop">
          {!allUsers.load && allUsers.data && Array.isArray(allUsers.data) && allUsers.data.length > 0 && (
            <>
              <thead>
                <tr>
                  {/* Use Object.keys on the first item to generate the table headers */}
                  {Object.keys(allUsers.data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
              
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  );
};

export default Users;
