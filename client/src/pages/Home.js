import { useQuery, useMutation } from "@apollo/client";
import { ADS } from "../utils/queries";

function Home() {

    const { loading, data } = useQuery(ADS);
    const ads = data?.ads || [];

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                ads.map((ads, index) => {
                    return (
                        <div key={index}>
                            <h2>
                              {ads.title}
                            </h2>
                            <ul>
                                <li>Description: {ads.description}</li>
                                <li>Image: {ads.description}</li>
                                <li>Price: ${ads.price}</li>
                                <li>Quantity: {ads.quantity}</li>
                                <li>Location: {ads.location}</li>
                            </ul>
                        </div>
                    )
                })
            )}
        </>

    )
}

export default Home;