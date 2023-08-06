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
                id: data.ads._id,
                title: data.ads.title,
                description: data.ads.description,
                image: data.ads.image,
                price: data.ads.price,
                quantity: data.ads.quantity,
                location: data.ads.quantity
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
       <div>
        <h1>Edit page</h1>
        <form onSubmit={handleSubmit}>
            <label>Title:
                <input type='text' name='title' value={formState.title} onChange={handleChange} />
            </label>
            <label>Description:
                <input type='text' name='description' value={formState.description} onChange={handleChange} />
            </label>
            <label>Image:
                <input type='text' name='image' value={formState.image} onChange={handleChange} />
            </label>
            <label>Price:
                <input type='number' name='price' value={formState.price} onChange={handleChange} />
            </label>
            <label>Quantity:
                <input type='number' name='quantity' value={formState.quantity} onChange={handleChange} />
            </label>
            <label>Location:
                <input type='text' name='location' value={formState.location} onChange={handleChange} />
            </label>
            <button type="submit">Save Changes</button>
        </form>
       </div>
    )
};




export default AdEditPage;