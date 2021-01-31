import React from 'react';
import { Card } from 'semantic-ui-react';

function PointCards ({points}) {
    return (
      <Card.Group centered>
        {points.map((pointSum) => (
            <Card>
                <Card.Content>
                    <Card.Header>{pointSum.name}</Card.Header>
                    <Card.Meta>{pointSum.points}</Card.Meta>
                </Card.Content>
            </Card>
        ))}
      </Card.Group>
    )
}

export default PointCards;
