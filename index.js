import { useEffect, useState } from 'react';
import HeroCard from '../components/HeroCard';

const Home = () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      const baseUrl = 'https://superheroapi.com/api.php/ba80a1e6b4bc9b8ebf1610199099f736/';

      const heroIds = [200, 465];
      const heroData = await Promise.all(
        heroIds.map(async id => {
          const res = await fetch(`${baseUrl}${id}`);
          const data = await res.json();
          return data;
        })
      );

      setHeroes(heroData);
    };

    fetchHeroes();
  }, []);

  return (
    <div id="heroes">
      {heroes.map(hero => (
        <HeroCard
          key={hero.id}
          name={hero.name}
          intelligence={hero.powerstats.intelligence}
          strength={hero.powerstats.strength}
          image={hero.image.url}
        />
      ))}
    </div>
  );
};

export default Home;

