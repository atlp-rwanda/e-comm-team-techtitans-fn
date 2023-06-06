import '../../styles/interface.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SuccessfulPaymentContent from '../../components/Payment/SuccessfulPaymentContent';

const SuccessfulPayment = () => {
  return (
    <>
      <Header />
      <SuccessfulPaymentContent />
      <Footer />
    </>
  );
};

export default SuccessfulPayment;
