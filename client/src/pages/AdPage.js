import { useQuery, useMutation } from "@apollo/client";
import { AD } from "../utils/queries";
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

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
                  <image src={ad.image} alt={ad.title} />
                </div>
                <div className="adInfo">
                  <p>Price:{ad.price}</p>
                  <p>Item Description:{ad.description}</p>
                  <p>Item Location:{ad.location}</p>
                  <p>Quantity Available:{ad.quantity}</p>
                </div>

                <button className="btn btn-primary">Purchase Item</button>

              </Container>
            )}
        </div>
      </>
    );
}

export default AdPage;