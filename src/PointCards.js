import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

function PointCards () {
    const [points, setPoints] = useState([]);
    
    let { sectionId } = useParams();
    
    useEffect( () => {
        fetch(`/section/${sectionId}`)
            .then(res => res.json())
            .then(data => {
                setPoints(data);
                console.log(data);
            });
    },[sectionId]);

    if (points.length === 0) {
        return <h1>Loading...</h1>;
    }

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
