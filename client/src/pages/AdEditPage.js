import { useQuery, useMutation } from '@apollo/client';
import { ADS } from '../utils/queries';
import { UPDATE_USER_AD } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function AdEditPage () {
    const [formState, setFormState] = useState({
        id: '',
        title: '',
        description: '',
        image: '',
        price: 0,
        quantity: 0,
        location: ''
    });
    
    const { userAdId } = useParams();
    const [updateUserAd] = useMutation(UPDATE_USER_AD);

    const { loading } = useQuery(ADS, {
        variables: { id: userAdId },
        onCompleted: data => {
            setFormState({
                id: data.userAd._id,
                title: data.userAd.title,
                description: data.userAd.description,
                image: data.userAd.image,
                price: data.userAd.price,
                quantity: data.userAd.quantity,
                location: data.user
            });
        }
    });

    const handleChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await updateUserAd({
            variable: formState
        });
        window.location.replace('/dashboard');
    };


	if (loading) {
		return <div>Loading...</div>
	}

    return (
       
    )
};




export default AdEditPage;