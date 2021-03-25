import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* grid-template-columns: fit-content(50%) fit-content(50%); */
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  p {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(-1deg);
    text-align: center;
  }
`;

export default function SlicemastersPage({ data, pageContext }) {
  // console.table(data.slicemasters.nodes);
  console.clear();
  console.log(pageContext.limit);
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <Pagination
        limit={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SlicemasterGrid>
        {slicemasters.map((slicemaster) => (
          <SlicemasterStyles key={slicemaster.id}>
            <Link to={`/slicemaster/${slicemaster.slug.current}`}>
              <h2>
                <span className="mark">{slicemaster.name}</span>
              </h2>
            </Link>
            <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
            <p>{slicemaster.description}</p>
          </SlicemasterStyles>
        ))}
      </SlicemasterGrid>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $limit: Int = 2) {
    slicemasters: allSanityPerson(skip: $skip, limit: $limit) {
      totalCount
      nodes {
        id
        name
        image {
          asset {
            fluid(maxWidth: 250) {
              ...GatsbySanityImageFluid
            }
          }
        }
        description
        slug {
          current
        }
      }
    }
  }
`;
