import PropTypes from "prop-types";

function OrderContent({ children }) {
  return <div className="order-content">{children}</div>;
}

OrderContent.propTypes = {
  children: PropTypes.node.isRequired,
};
export default OrderContent;
