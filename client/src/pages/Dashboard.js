import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADS, ME } from "../utils/queries";
import { POST_AD } from "../utils/mutations";

function Dashboard() {
  const { loading, data } = useQuery(ME);
  const me = data?.me || {};

  const [postAd] = useMutation(POST_AD);
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

    const valueAsFloat = parseFloat(value);

    if (!Number.isNaN(valueAsFloat)) {
      value = valueAsFloat;
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await postAd({
      variables: formState,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
          />
        </label>

        <label>
          description:
          <input
            type="text"
            name="description"
            value={formState.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Image:
          <input
            type="text"
            name="image"
            value={formState.image}
            onChange={handleChange}
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formState.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formState.quantity}
            onChange={handleChange}
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formState.location}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Post New Ad</button>
      </form>
    </>
  );
}

export default Dashboard;
