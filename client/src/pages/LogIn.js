import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';





function LogIn () {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [loginUser, { error }] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      try {
        const response = await loginUser({
          variables: { ...userFormData },
        });
        console.log(response);

        const { token, user } = await response.data.login;
        console.log(user);
        Auth.login(token);

      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }

      setUserFormData({
        email: '',
        password: '',
      });
    };

    if (Auth.loggedIn()) {
      window.location.assign('/');
    }

    return (
      <>
        <Card className="login-css">
          <Card.Body>
            <Form onSubmit= {handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control value={userFormData.email} name= "email" type="email" placeholder="Enter email" onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control value={userFormData.password} name= "password" type="password" placeholder="Password" onChange={handleInputChange} />
              </Form.Group>
              <Button
                // disabled={!(userFormData.email && userFormData.password)}
                type="submit"
                variant="success">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
}

export default LogIn