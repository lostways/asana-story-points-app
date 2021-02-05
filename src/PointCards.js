import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Container, Header, Loader, Button } from 'semantic-ui-react';

function PointCards () {
    const [points, setPoints] = useState([]);
    
    let { sectionId } = useParams();
    
    function fetchPoints(sectionId) {
        setPoints([])
        fetch(`/section/${sectionId}`)
            .then(res => res.json())
            .then(data => {
                setPoints(data);
                console.log(data);
            });
    }
    
    useEffect( () => {
        fetchPoints(sectionId)
    },[sectionId]);

    return (
       <Container style={{ marginTop: "3em" }}  text>
        <Loader active={points.length === 0} />
          <Card.Group className="point-cards" itemsPerRow={2} centered>
            {points.map((pointSum) => (
                <Card key={pointSum.name}>
                    <Card.Content header={pointSum.name.toUpperCase()} />
                    <Card.Content style={{ textAlign: 'center' }}>
                     <Header as='h2'> {pointSum.points} </Header>
                    </Card.Content>
                </Card>
            ))}
          </Card.Group>
        </Container>
    )
}

export default PointCards;
