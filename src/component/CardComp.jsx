import '../component/style.css'
export default function CardComp({ card , handleChoices, flipped}) {
const handleClick=()=>{
    handleChoices(card)
}

  return (
    <div className="card">
        
        <div className={flipped? "flipped" : ""}>
            <img className="front" src={card.src} alt="front-image" />
      <img 
      className='back'
      src="/img/cover.png" 
      alt="back-image"
      onClick={handleClick}
       />
       </div>
      
    </div>
  );
}
