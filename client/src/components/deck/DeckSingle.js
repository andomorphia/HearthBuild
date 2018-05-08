import React from 'react';
import PropTypes from 'prop-types';

import DeckMeta from './DeckMeta';
import DeckRating from './DeckRating';
import DeckList from './DeckList';
import DeckDesc from './DeckDesc';
import DeckComments from './comments/DeckComments';
import Spinner from '../common/Spinner';

const DeckSingle = ({ deckId, auth, decksLoading, decks }) => {
  if (decksLoading) {
    return (
      <main>
        <section className="section" id="deck-single">
          <div className="container">
            <div className="deck">
              <div className="columns">
                <Spinner />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const deck = decks.find(deck => deck._id === deckId );

  console.log(deck);

  return (
    <main>
      <section className="section" id="deck-single">
        <div className="container">
          <div className="deck">
            <div className="columns">                
              <DeckMeta
                meta={deck}
                author={deck.author.name}
              />
              <DeckRating
                deckId={deckId}
                likes={deck.likes}
                views={deck.views}
                auth={auth}
              />
            </div>
            <DeckList cards={deck.cards} />
            <DeckDesc desc={deck.description} />
            <DeckComments
              comments={deck.comments}
              auth={auth}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

DeckSingle.propTypes = {
  decksLoading: PropTypes.bool.isRequired,
  decks: PropTypes.arrayOf(PropTypes.object),
};

DeckSingle.defaultProps = {
  decks: [],
}

export default DeckSingle;
