import { useQuery, useMutation } from "@apollo/client";
import { AD } from "../utils/queries";
import { useParams } from 'react-router-dom';
import { useState } from 'react'; 

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
            ) : (<h1>{ad.title}</h1>)}
        </div>
      </>
    );
}

export default AdPage;