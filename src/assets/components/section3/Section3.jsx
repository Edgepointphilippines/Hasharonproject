import React from 'react';
import CustomCard from '../card/CustomCard';
import './Section3.css';

const Section3 = () => {
  const cardData = JSON.parse(localStorage.getItem('cardData')) || [];

  return (
    <div className="section3-container">
      <section id="section3" className="card-section">
        {cardData.map((card, index) => (
          <CustomCard
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </section>
    </div>
  );
};

export default Section3;
