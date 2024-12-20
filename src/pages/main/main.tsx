import { LocationType, OfferType, Point } from '../../types.ts';
import Header from '../../components/header/header.tsx';
import OfferList from '../../components/offer-list/offer-list.tsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CityMap from '../../components/city-map/city-map.tsx';
import { DEFAULT_CITY } from '../../const.ts';

type Props = {
  offers: OfferType[];
}

function Main({ offers }: Props) {
  const [activeOfferId, setActiveOfferId] = useState<string | null> (null);
  const handleActiveOffer = (id: string | null) => {
    setActiveOfferId(id);
  };

  const points: Point[] = offers.map((offer) => ({
    id: offer.id,
    location: offer.location,
  }));

  const city: LocationType = offers.length > 0 ? offers[0].city.location : DEFAULT_CITY;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Paris</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Cologne</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Brussels</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item tabs__item--active" to='#'>
                  <span>Amsterdam</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Hamburg</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Dusseldorf</span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferList offers={offers} onActiveOffer={handleActiveOffer}/>
            </section>
            <div className="cities__right-section">
              <CityMap activeOfferId={activeOfferId} points={points} city={city}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
