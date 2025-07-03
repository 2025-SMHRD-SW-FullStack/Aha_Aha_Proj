import './assets/styles/global.css'
import { AmazonFormProvider } from './provider/AmazonFormContext';
import Router from './routes/Router';
import { ShopeeFormProvider } from './provider/ShopeeFormContext';

const App = () => {

  return (
    <div className='global-container'>
      <AmazonFormProvider>
        <ShopeeFormProvider>
          <Router/>
        </ShopeeFormProvider>
      </AmazonFormProvider>
    </div>
  )
}
export default App;
