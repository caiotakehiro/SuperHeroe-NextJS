## Caio Takehiro Magnoli Igari 10437809
### Sistemas de Informação, 02J L12
## SuperHeroe-NextJS
Esta atividade tem como obejtivo reconstruir uma aplicação utilizando NextJS e seus recursos, nessa aplicação será nescessário o uso de uma API(SuperHeroe) da onde irá ser retirado as informações de cada personagem(nome, foto e atributos) que estarão presentes no resultado final do site.

## Funcionamento básico da API
Para poder acessar os dados da API, constrói-se uma URL conforme a documentação. Neste caso, utilizou-se a seguinte:

https://superheroapi.com/api.php/ba80a1e6b4bc9b8ebf1610199099f736/

## Fetch
O fetch é uma função que serve para buscar dados de forma assíncrona, ele foi essencial nessa atividade para buscar as infromações dos hérois, como é visto nos trechos do código a seguir:
``` javascript
import { useEffect, useState } from 'react';
import HeroCard from '../components/HeroCard';
import '../styles/globals.css';

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
```
No código é possivel encontrar alguma coisas importantes, como a URL citada anteriormente para poder acessar a API, os "ID" de cada herói que é representado por um número e a partir dele que será possivel conseguir as informações de cada um como seu nome, foto, força, inteligência entre vários outras características. É interessente notar as importações que essa parte do código faz, no caso o HeroCard e os estilos globais, esses trechos serão comentados em breve.
