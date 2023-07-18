import { useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";
import CardComp from "./component/CardComp";
import "./App.css";

const cardImages = [
  { src: "/helmet-1.png", matched:false},
  { src: "/potion-1.png", matched:false},
  { src: "/ring-1.png", matched:false},
  { src: "/scroll-1.png", matched:false},
  { src: "/shield-1.png", matched:false},
  { src: "/sword-1.png", matched:false},
];

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn]=useState(0);
  const [choice1, setChoice1]=useState(null);
  const [choice2, setChoice2]=useState(null);

  // shuffle cards
  const shuffleCard = () => {
    const cards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuidv4() }));
    setCards(cards);
    setTurn(0);
  };


  const handleChoices=(card)=>{
    choice1 ? setChoice2(card) : setChoice1(card);
     
  }

  useEffect(() =>{
    if(choice1 && choice2){
      if(choice1.src === choice2.src){
        setCards(prevCard=>{
          return prevCard.map(card =>{
            if(card.src === choice1.src){
              return {...card, matched: true}
            }else {
              return card
            }
          })
        });
        reSet()

      } else{
        setTimeout(()=>reSet(),1000)
      } 
    }
  },[choice1,choice2]);
  
  console.log(cards)

  const reSet=()=>{
    setChoice1(null);
    setChoice2(null);
    setTurn(prev=>prev+1);
  }
  
  return (
    <>
      <div className="app">
        <h1>MAGIC GAME</h1>
        <button onClick={shuffleCard}>New Game</button>
        <h1>Turns: {turn}</h1>
        <div className="card-grid">
          
          {cards.map((card) => (
            <CardComp 
            key={card.id} 
            card={card} 
            handleChoices={handleChoices}
            flipped={card === choice1 || card === choice2 || card.matched}
            />
            
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
