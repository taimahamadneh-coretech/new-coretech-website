import './UICard.css';

const Card = ({ children, className = '', hover = false }) => {
  return (
    <div className={`ui-card ${className} ${hover ? 'hover-effect' : ''}`}>
      {children}
    </div>
  );
};

export default React.memo(Card);