import React, { useState } from "react";
import Navigation from "./Navigation";
import { auth } from "../../firebase";
import { message, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const PasswordUpdate = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await auth.currentUser.updatePassword(password);
      message.success("Password is updated");
      setLoading(false);
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="colmd-2">
          <Navigation />
        </div>
        <div className="col">
          <h4>Password Update</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group " style={{ width: "60%" }}>
              <label>Your Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onFocus
                disabled={loading}
              />
              <Button
                onClick={handleSubmit}
                type="primary"
                className="mt-3"
                block
                shape="round"
                icon={<MailOutlined />}
                size="large"
                disabled={password.length < 6}
                loading={loading}
              >
                Change Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdate;
