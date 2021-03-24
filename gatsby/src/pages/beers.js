import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerSyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: block;
    display: grid;
    align-items: center;
    font-size: 10px;
    color: black;
  }
`;

function beersWithImages(beers) {
  return beers.filter((beer) => {
    const img = new Image();
    img.src = beer.image;
    return img.height !== 0;
  });
}

export default function BeerPage({ data }) {
  const beers = beersWithImages(data.beers.nodes);
  return (
    <>
      <h2 className="center">{`There are ${beers.length} beers!`}</h2>
      <p className="center">(We only have IPAs...)</p>
      <BeerGridStyles>
        {beers.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <SingleBeerSyles key={beer.id}>
              <h3>{beer.name}</h3>
              <img src={beer.image} alt={beer.name} />
              <p>Price: {beer.price}</p>
              <p title={`${rating} out of 5 stars`}>
                {`⭐`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐`.repeat(5 - rating)}
                </span>
                <span>{beer.rating.review}</span>
              </p>
            </SingleBeerSyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer(
      filter: { rating: { average: { gt: 2.9 } }, name: { regex: "/ipa/i" } }
    ) {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
