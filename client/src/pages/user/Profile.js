import React from "react";
import UserNav from "../../components/Navbar/UserNav";

const Profile = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <UserNav />
      </div>
      {/* <div className="col">user Profile page</div> */}
    </div>
  </div>
);

export default Profile;
