import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import SEO from '../components/SEO';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters</span>
      </h2>
      <p>Our opening day crew</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now!</p>
      )}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}
function HotSlices({ hotslices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Signature pies, served by the slice</p>
      {!hotslices && <LoadingGrid count={4} />}
      {hotslices && !hotslices?.length && <p>Pizza Slices are SOLD OUT!</p>}
      {hotslices?.length && <ItemGrid items={hotslices} />}
    </div>
  );
}

export default function HomePage() {
  const { hotSlices, slicemasters } = useLatestData();
  const twomorrow = new Date();
  twomorrow.setDate(twomorrow.getDate() + 2);
  return (
    <>
      <SEO title="Homepage" />
      <div className="center">
        <h2>
          The <span className="mark">2nd</span> Best Pizza From The City You
          Live In!
        </h2>
        <p>
          🔥🔥 Revised grand re-re-opening:&nbsp;
          <strong>
            {twomorrow.toLocaleString('default', { month: 'long' })}{' '}
            {twomorrow.getDate()}
          </strong>
          &nbsp;🔥🔥
        </p>
        <HomePageGrid>
          <CurrentlySlicing slicemasters={slicemasters} />
          <HotSlices hotslices={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
}
