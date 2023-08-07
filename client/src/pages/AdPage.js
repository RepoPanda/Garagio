import { useQuery } from "@apollo/client";
import { AD } from "../utils/queries";
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import BuyButtonComponent from "./BuyButtonComponent";

function AdPage() {
  const { adId } = useParams();
  const { loading, data } = useQuery(AD, {
    variables: { id: adId },
  });

  const ad = data?.ad || {};

    return (
      <>
       <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
              <Container className="soloAd">
                <header className="flex-row space-between">
                <h1>{ad.title}</h1>
                </header>
                <div className="adImage">
                  <Image src={ad.image}></Image>
                </div>
                <div className="adInfo">
                  <p>Price:{ad.price}</p>
                  <p>Item Location:{ad.location}</p>
                  <p>Quantity Available:{ad.quantity}</p>
                  <p>Item Description:{ad.description}</p>
                </div>

                {/* <button className="btn btn-primary">Purchase Item</button> */}
<BuyButtonComponent></BuyButtonComponent>

              </Container>
            )}
        </div>
      </>
    );
}

export default AdPage;