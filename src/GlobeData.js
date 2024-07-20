import React, { useState, useEffect } from 'react';

const GlobeData = () => {

  const circleContainerStyles = {
    position: 'relative',
    width: '1010px',
    height: '1210px',
    borderRadius: '50%',
    margin: 'auto',
  };

  const centerStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: '240px',
    height: '240px',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '12px',
    background: 'rgb(250,250,254)',
    background: '-moz-radial-gradient(circle, rgba(250,250,254,1) 0%, rgba(255,215,223,1) 100%)',
    background: '-webkit-radial-gradient(circle, rgba(250,250,254,1) 0%, rgba(255,215,223,1) 100%)',
    background: 'radial-gradient(circle, rgba(250,250,254,1) 0%, rgba(255,215,223,1) 100%)',
    filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#fafafe",endColorstr="#ffd7df",GradientType=1)',
    zIndex: 10
  };

  const getCircleRadius = (circle) => {
    switch (circle) {
      case 4: return 550; // Outermost circle
      case 2: return 240; // Middle circle
      case 3: return 400; // Inner circle
      default: return 0;
    }
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const port = process.env.REACT_APP_PORT;

  console.log(port);

  useEffect(() => {
    // Fetch data from the API
    fetch(port)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return console.log(error);
  }

  const centerItem = data.find(item => item.circle === 1);

  return (
    <div className=''>
      <div className='text-center mt-8 pt-6 font-bold text-4xl'><h1>Document Required for Study Abroad Loan</h1></div>
      <div className="flex justify-center items-center h-screen">
        <div style={circleContainerStyles}>
          <div style={centerStyles}>
            <h3 className="font-bold">{centerItem.title}</h3>
            <p className="text-sm text-gray-600 p-1">{centerItem.description}</p>
          </div>
          {data.filter(item => item.circle !== 1).map((item, index) => {
            const itemsInCircle = data.filter(d => d.circle === item.circle).length;
            const angleStep = 360 / itemsInCircle; // Calculate angle step for each item

            let angle;
            if (item.circle % 2 === 0)
              angle = angleStep * index;
            else
              angle = angleStep * index + (angleStep / 2); // Adjust angle for better spacing

            const radians = (angle * Math.PI) / 180;
            const radius = getCircleRadius(item.circle);
            const x = Math.cos(radians) * radius;
            const y = Math.sin(radians) * radius;

            const itemWidth = 200; // Adjust size as needed
            const itemHeight = 200; // Adjust size as needed

            const itemStyles = {
              position: 'absolute',
              top: `calc(50% + ${y}px - ${itemHeight / 2}px)`, // Center item vertically
              left: `calc(50% + ${x}px - ${itemWidth / 2}px)`, // Center item horizontally
              width: `${itemWidth}px`,
              height: `${itemHeight}px`,
              textAlign: 'center',
              borderRadius: '50%',
              backgroundColor: 'white',
              padding: '17px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              boxSizing: 'border-box',
              background: 'rgb(250,250,254)',
              background: '-moz-radial-gradient(circle, rgba(250,250,254,1) 0%, rgba(255,215,223,1) 100%)',
              background: '-webkit-radial-gradient(circle, rgba(250,250,254,1) 0%, rgba(255,215,223,1) 100%)',
              background: 'radial-gradient(circle, rgba(250,250,254,1) 0%, rgba(255,215,223,1) 100%)',
              filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#fafafe",endColorstr="#ffd7df",GradientType=1)',
              zIndex: 10
            };

            return (
              <div key={index} style={itemStyles}>
                <h3 className="font-bold mb-2 text-center px-6">{item.title}</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line p-1">{item.description}</p>
              </div>
            );
          })}
          {/* Dashed circles as pseudo-elements */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            border: '2px dashed #ddd',
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}></div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            border: '2px dashed #ddd',
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}></div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1100px',
            height: '1100px',
            borderRadius: '50%',
            border: '2px dashed #ddd',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            marginBottom: '10px'
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default GlobeData;
