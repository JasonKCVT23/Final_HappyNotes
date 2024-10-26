import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>HappyNote</h1>
      <button className={styles.button} onClick={() => navigate('/map')}>
        Go to Map
      </button>
    </div>
  );
};

export default Home;
