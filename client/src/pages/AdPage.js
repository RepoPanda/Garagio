import { useQuery, useMutation } from "@apollo/client";
import { ADS } from "../utils/queries";
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function AdPage() {
const [formState, setFormState] = useState({
    id: '',
    title: '',
    description: '',
    image: '',
    price: 0,
    quantity: 0,
    location: '',

});

  const { adId } = useParams();


    const { loading } = useQuery(ADS,{variables: {id: adId },
    onCompleted: data => {
      setFormState({
        id: data.ads._id,
        title: data.ads.title,
        description: data.ads.description,
        image: data.ads.image,
        price: data.ads.price,
        quantity: data.ads.quantity,
        location: data.ads.location,
      })
    }
    });

    return (
      <>
       <div>
            {loading ? (
                <div>Loading...</div>
            ) : (<h1></h1>)}
        </div>
      </>
    );
}

export default AdPage;