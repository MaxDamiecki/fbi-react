import React, { useState, useEffect } from 'react';

const RandomPerson = () => {
  const [randomPerson, setRandomPerson] = useState(null);

  useEffect(() => {
    fetchRandomPerson();
  }, []);

  const fetchRandomPerson = () => {
    fetch("https://api.fbi.gov/wanted/v1/list")
      .then((response) => response.json())
      .then((data) => {
        // Get a random index to select a person from the list
        const randomIndex = Math.floor(Math.random() * data.items.length);
        const randomPersonData = data.items[randomIndex];
        setRandomPerson(randomPersonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getImagesHTML = (images) => {
    if (images && images.length > 0) {
      return images.map((image) => (
        <img src={image.original} alt="Person's Images" width="200" height="200" key={image.id} />
      ));
    } else {
      return <p>No images available.</p>;
    }
  };

  return (
    <div>
      {randomPerson ? (
        <div>
          <h2>Name: {randomPerson.title}</h2>
          <p>Wanted For or DOC: {randomPerson.description}</p>
          <h3>Physical Attributes:</h3>
          <ul>
            <li>Eyes: {randomPerson.eyes}</li>
            <li>Hair: {randomPerson.hair}</li>
            <li>Height: {randomPerson.height_max}"</li>
            <li>Weight: {randomPerson.weight} pounds</li>
            <li>Complexion: {randomPerson.complexion || 'N/A'}</li>
            <li>Scars and Marks: {randomPerson.scars_and_marks || 'None'}</li>
          </ul>
          <p>Additional Details: </p>
          <h3>Images:</h3>
          {getImagesHTML(randomPerson.images)}
          <button onClick={fetchRandomPerson}>Get Next Person</button>
        </div>
      ) : (
        <p>Person Loading</p>
      )}
    </div>
  );
};

export default RandomPerson;
