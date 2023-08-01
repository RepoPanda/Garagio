import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import { Form, Button, Alert} from 'react-bootstrap';

import Auth from '../utils/auth';

function SignUp () {

    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
        password: '',
      });
      // set state for form validation
      const [validated] = useState(false);
      // set state for alert
      const [showAlert, setShowAlert] = useState(false);
    
      const [createUser, { error }] = useMutation(CREATE_USER);

   
      const handleChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        setUserFormData({
            ...userFormData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
     const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        try {
          const { data } = await createUser({
            variables: { ...userFormData },
          });
          console.log(data);
          Auth.login(data.createUser.token);
        } catch (err) {
          console.error(err);
        }
    
        setUserFormData({
          username: '',
          email: '',
          password: '',
        });
      };
    
      return (
        <>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Alert
              dismissible
              onClose={() => setShowAlert(false)}
              show={showAlert}
              variant="danger"
            >
              Something went wrong with your signup!
            </Alert>
    
            <Form.Group className='mb-3'>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your username"
                name="username"
                onChange={handleChange}
                value={userFormData.username}
                required
              />
              <Form.Control.Feedback type="invalid">
                Username is required!
              </Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group className='mb-3'>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email address"
                name="email"
                onChange={handleChange}
                value={userFormData.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                Email is required!
              </Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group className='mb-3'>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your password"
                name="password"
                onChange={handleChange}
                value={userFormData.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              disabled={
                !(
                  userFormData.username &&
                  userFormData.email &&
                  userFormData.password
                )
              }
              type="submit"
              variant="success"
            >
              Submit
            </Button>
          </Form>
        </>
      );
    };

export default SignUp;