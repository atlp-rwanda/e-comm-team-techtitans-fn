import '../../styles/interface.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ShippingForm from '../../components/Payment/ShippingForm';

const Checkout = () => {
  return (
    <>
      <Header />
      {/* <Page1Indicator /> */}
      <ShippingForm />
      <Footer />
    </>
  );
};

export default Checkout;
