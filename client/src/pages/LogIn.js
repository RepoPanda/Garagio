import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Form, Button, Alert} from 'react-bootstrap';





function LogIn () {


    return(
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                </Form.Group>
                <Form.Group></Form.Group>
                <Button></Button>
            </Form>
         
        </>
    )
}

export default LogIn