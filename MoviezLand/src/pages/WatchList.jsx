import WatchList from '../components/CardWatchList';
import Navbar from '../components/Navbar/Navbar';

const Watchlist = () => {
  return (
    <div>
      <Navbar/>
      <h1>Watchlist</h1>
      <WatchList />
    </div>
  );
};

export default Watchlist;