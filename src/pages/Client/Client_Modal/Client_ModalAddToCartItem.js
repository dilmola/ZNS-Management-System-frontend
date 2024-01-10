// ModalAddToCartItem component
const ModalAddToCartItem = ({ isOpen, closeModal, selectedItem }) => {
    if (!isOpen || !selectedItem) {
      return null;
    }
  
    return (
      // Your modal content using details from selectedItem
      <div>
        <h2>{selectedItem.name_of_item}</h2>
        <p>{selectedItem.description_item}</p>
        <p>{selectedItem.price_item}</p>
        {/* Add more details as needed */}
        <button onClick={closeModal}>Close</button>
      </div>
    );
  };
  
  export default ModalAddToCartItem;
  