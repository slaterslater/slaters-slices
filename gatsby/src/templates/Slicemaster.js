import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const SlicemasterGrid = styled.div`
  h2 {
    margin-bottom: -1rem;
    z-index: 2;
    position: relative;
    text-align: center;
    transform: rotate(-3deg);
  }
  p {
    text-align: center;
  }
`;

export default function SinglePizzaPage({ data: { slicemaster } }) {
  return (
    <>
      <SEO
        title={slicemaster.name}
        image={slicemaster.image?.asset?.fluid?.src}
      />
      <SlicemasterGrid>
        <h2>
          <span className="mark">{slicemaster.name}</span>
        </h2>
        <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
        <p>{slicemaster.description}</p>
      </SlicemasterGrid>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      description
      image {
        asset {
          fluid(maxWidth: 400, maxHeight: 300) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
