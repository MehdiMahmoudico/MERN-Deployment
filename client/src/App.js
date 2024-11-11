
import './App.css';
import { Routes , Route } from 'react-router-dom';
import Create from './components/Create';
import Meals from './components/Meals';
import Detail from './components/Detail';
import Edit from './components/Edit';
import Viewmeals from './components/Viewmeals';
function App() {
  return (
    <div className="App container">
      <h1>Speedy Meals</h1>
      <Routes>
        <Route exact path="/" element={<Viewmeals/>} />
        <Route exact path="/meals/new" element={<Create />} />
        <Route exact path="/meals/:id/details" element={<Detail />} />
        <Route exact path="/meals/:id/edit" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
