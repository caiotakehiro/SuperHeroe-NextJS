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

No código é possivel encontrar alguma coisas importantes, veja a URL que foi citada anteriormente, é nescessário tornaça um parâmetro para o fetch, e em seguida usar o "await", pois é preciso esperar a solução do método para assim poder continuar e converter para JSON, os "IDs" de cada herói também é um ponto pertinente, eles são representados por um número e a partir deles que será possivel conseguir as informações sobre cada herói como seu nome, foto, força, inteligência entre vários outras características. É interessente notar as importações que essa parte do código faz, no caso o HeroCard e os estilos globais, esses trechos serão comentados em breve.

Na imagem abaixo é possivel ver a relação de ids com heróis, a API utilizada possui muitos recursos, tanto que nem todos foram aplicados na atividade.
![387791372-18956b7d-7483-4eb4-82ee-ef1548766a95](https://github.com/user-attachments/assets/5ae9735a-90f5-42fb-8df3-6ff3589c7ed9)

## HeroCard
O  HeroCard é um componente criado que é responsável por "organizar" as informações dos heróis em um código, visto que ele recebe 4 propriedades de cada herói que irão aparecer no layout final do projeto, elas são o nome, força, inteligencia e a imagem.
``` javascript
const HeroCard = ({ name, intelligence, strength, image }) => {
  return (
    <article>
      <img src={image} alt={name} />
      <h1>{name}</h1>
      <p>Intelligence: <span style={{ width: `${intelligence}%`, backgroundColor: '#F9B32F' }}></span></p>
      <p>Strength: <span style={{ width: `${strength}%`, backgroundColor: '#FF7C6C' }}></span></p>
    </article>
  );
};

export default HeroCard;
```
## Estilos Globais
Os estilos globais podem ser acessado pela aplicação todo, ele é um código css básico que deixa todo o HTML com uma aparência consistente.
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

html, body {
  max-width: 100vw;
  overflow-x: hidden;
  background-color: #f0f0f0;
  font-family: monospace;
  height: 100%;
}

#heroes {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 100%;
  padding: 20px;
}

#heroes article {
  height: 720px;
  width: 300px;
  background-color: #fff;
  border-radius: 10px;
  margin: 10px;
}

#heroes article img {
  border-radius: 10px 10px 0 0;
  width: 100%;
  max-height: 400px;
}

#heroes h1 {
  text-align: center;
}

#heroes article p {
  padding: 0 10px;
  width: calc(100% - 20px);
}

#heroes article p span {
  background-color: red;
  height: 10px;
  display: block;
  margin-top: 5px;
  border-radius: 5px;
}
```

## Resultado visual 
Quando o código é executado esse é o resultado esperado, apresentando os cards do super heróis do canto esquerdo para o direito e suas informações:
![387800584-7b4811ce-648e-4749-bdc7-1750260e5cf3](https://github.com/user-attachments/assets/b2647781-aff2-43ec-bb19-2b63608e3763)

