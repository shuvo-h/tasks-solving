import logo from './logo.svg';
import './App.css';
import SocialDegreeRelation from './components/SocialDegreeRelation';
import DegreeFIn from './components/DegreeFIn';
import DegreesOfSeparation from './components/DegreesOfSeparation/DegreesOfSeparation';

function App() {
  return (
    <div className="App">
      {/* <DegreeFIn></DegreeFIn> */}
      <DegreesOfSeparation></DegreesOfSeparation>
    </div>
  );
}

export default App;
