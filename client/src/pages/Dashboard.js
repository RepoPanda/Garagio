import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADS, ME } from "../utils/queries";
import { POST_AD, DELETE_AD } from '../utils/mutations';
import { Link } from 'react-router-dom';

function Dashboard() {
    const { loading, data } = useQuery(ME);
    const me = data?.me || {};

    const [postAd] = useMutation(POST_AD);
    const [deleteAd] = useMutation(DELETE_AD);

    const [formState, setFormState] = useState({
        title: "",
        description: "",
        image: "",
        price: 0,
        quantity: 0,
        location: "",
    });

    const handleChange = (event) => {
        event.preventDefault();

        let { name, value } = event.target;

        if (name === "price") {
            value = parseFloat(value);
        } else if (name === "quantity") {
            value = parseInt(value);
        }

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await postAd({
                variables: formState,
            });

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();

        const adId = event.target.id

        await deleteAd({
            variables: {
                id: adId
            }
        })
        window.location.reload();
    }

    return (
        <>
            <div className="form-css">
                <form onSubmit={handleSubmit}>

                    <h1>Item Posting</h1>


                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formState.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            id="description"
                            type="text"
                            name="description"
                            value={formState.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image:</label>
                        <input
                            id="image"
                            type="text"
                            name="image"
                            value={formState.image}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            id="price"
                            type="number"
                            name="price"
                            value={formState.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            id="quantity"
                            type="number"
                            name="quantity"
                            value={formState.quantity}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input
                            id="location"
                            type="text"
                            name="location"
                            value={formState.location}
                            onChange={handleChange}
                        />
                    </div>

                    <button className="submit-button" type="submit">Post New Ad</button>

                </form>
            </div>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    me.ads.map((userAd, index) => {
                        return (
                            <div className="ad-render" key={index}>
                                <Link to={userAd._id}>Edit</Link>
                                <h2>{userAd.title}</h2>
                                <ul>
                                    <li>Description: {userAd.description}</li>
                                    <li>Image Here: {userAd.image}</li>
                                    <li>Price: {userAd.price}</li>
                                    <li>Quantity: {userAd.quantity}</li>
                                    <li>Location: {userAd.location}</li>
                                </ul>
                                <button id={userAd._id} onClick={handleDelete}>Delete</button>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
}

export default Dashboard;
