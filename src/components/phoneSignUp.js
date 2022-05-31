import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const PhoneSignUp = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const { setUpRecaptcha } = useUserAuth();
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState("");
  const navigate = useNavigate();

  const getOTP = async (e) => {
    e.preventDefault();
    if (number === "" || number === undefined) {
      return setError("Please enter a valid number");
    }
    try {
      const response = await setUpRecaptcha(number);
      console.log(response);
      setConfirmObj(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    console.log(otp);
    if (otp === "" || otp === null) return;
    try {
      setError("");
      await confirmObj.confirm(otp);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="p-4 box">
      <h2 className="mb-3">Firebase Phone Auth</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={getOTP} style={{ display: !flag ? "block" : "none" }}>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <PhoneInput
            placeholder="Enter phone number"
            value={number}
            onChange={setNumber}
          />
          <div id="recaptcha-container" />
        </Form.Group>
        <div className="button-right">
          <Link to="/">
            <Button variant="secondary">Cancel</Button>&nbsp;
          </Link>
          <Button variant="primary" type="submit">
            Send OTP
          </Button>
        </div>
      </Form>

      <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
        <Form.Group className="mb-3" controlId="formBasicOtp">
          <Form.Control
            placeholder="Enter OTP"
            type="otp"
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Group>
        <div id="recaptcha-container" />
        <div className="button-right">
          <Link to="/">
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button variant="primary" type="submit">
            Verify Otp
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PhoneSignUp;
