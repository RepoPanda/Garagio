import { useQuery } from "@apollo/client";
import { ADS } from "../utils/queries";
import { Link } from "react-router-dom";

function Home() {

    const { loading, data } = useQuery(ADS);
    const ads = data?.ads || [];

  console.log(ads);

    return (
        <>
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                ads.map((ads, index) => {
                    return (
                      <Link to={`/adpage/${ads._id}`} className="home-css" key={index}>
                        <h2>{ads.title}</h2>
                        <ul className="list">
                          <li>Description: {ads.description}</li>
                          <li>Image: {ads.description}</li>
                          <li>Price: ${ads.price}</li>
                          <li>Quantity: {ads.quantity}</li>
                          <li>Location: {ads.location}</li>
                        </ul>
                      </Link>
                    );
                })
            )}
        </div>
        </>

    )
}

export default Home;