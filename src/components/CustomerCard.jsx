import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import { faker } from '@faker-js/faker';
import "./FreelancerCard.css"

const CustomerCard = () => {
  const customers = Array.from({ length: 3 }).map((_, index) => ({
    name: faker.person.fullName(),
    description: faker.person.bio(),
    rating: faker.datatype.number({ max: 5 }),
    image: faker.image.avatar(),
  }));

  return (
    <section className="freelancer-cards">

      <div className="freelancer-cards">
        {customers.map((customer, index) => (
          <Card key={index} className="card">
            <Image src={customer.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{customer.name}</Card.Header>
              <Card.Meta>{customer.description}</Card.Meta>
              <Card.Description>
                <Rating icon="star" defaultRating={customer.rating} maxRating={5} disabled />
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CustomerCard;