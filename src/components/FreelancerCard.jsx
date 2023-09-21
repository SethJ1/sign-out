import "./FreelancerCard.css"
import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import { faker } from '@faker-js/faker';

const FreelancerCard = () => {
  const freelancers = Array.from({ length: 3 }).map((_, index) => ({
    name: faker.person.fullName(),
    description: faker.person.jobTitle(),
    rating: faker.datatype.number({ max: 5 }),
    image: faker.image.avatar(),
  }));

  return (
    <section className="freelancer-cards">
      {freelancers.map((freelancer, index) => (
        <Card key={index}>
          <Image src={freelancer.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{freelancer.name}</Card.Header>
            <Card.Meta>{freelancer.description}</Card.Meta>
            <Card.Description>
              <Rating icon="star" defaultRating={freelancer.rating} maxRating={5} disabled />
            </Card.Description>
          </Card.Content>
        </Card>
      ))}
    </section>
  );
};

export default FreelancerCard;
