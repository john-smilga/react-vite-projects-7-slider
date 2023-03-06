import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  const [people, setPeople] = useState(data);
  const [currentPerson, setCurrentPerson] = React.useState(0);

  const nextSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson + 1) % people.length;
      return result;
    });
  };
  const prevSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson - 1 + people.length) % people.length;
      return result;
    });
  };

  useEffect(() => {
    let slider = setInterval(() => {
      setCurrentPerson((oldPerson) => {
        const result = (oldPerson + 1) % people.length;
        return result;
      });
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [currentPerson]);
  return (
    <>
      <section className='section'>
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;

          return (
            <article
              style={{
                transform: `translateX(${
                  100 * (personIndex - currentPerson)
                }%)`,
                opacity: personIndex === currentPerson ? 1 : 0,
              }}
              key={id}
            >
              <img src={image} alt={name} className='person-img' />
              <h5>{name}</h5>
              <p className='title'>{title}</p>
              <p className='text'>{quote}</p>
              <FaQuoteRight className='icon' />
            </article>
          );
        })}
        <button className='prev' onClick={prevSlide}>
          <FiChevronLeft />
        </button>
        <button className='next' onClick={nextSlide}>
          <FiChevronRight />
        </button>
      </section>
    </>
  );
}

export default App;
