import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [isEditing, setIsEditing] = useState(false); // State to check if editing
  const [editIndex, setEditIndex] = useState(null); // Index of the card being edited

  // Load initial cards from localStorage or set defaults
  const [cardData, setCardData] = useState(() => {
    const savedCards = localStorage.getItem('cardData');
    return savedCards
      ? JSON.parse(savedCards)
      : [
          {
            title: 'Lizard',
            description: 'Lizards are a widespread group of squamate reptiles.',
            image: '/static/images/cards/contemplative-reptile.jpg',
          },
          {
            title: 'Snake',
            description: 'Snakes are elongated, legless, carnivorous reptiles.',
            image: '/static/images/cards/contemplative-snake.jpg',
          },
          {
            title: 'Turtle',
            description: 'Turtles are reptiles with a special bony or cartilaginous shell.',
            image: '/static/images/cards/contemplative-turtle.jpg',
          },
        ];
  });

  const [newCard, setNewCard] = useState({
    title: '',
    description: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCard((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setNewCard((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddCard = () => {
    if (isEditing) {
      const updatedCards = [...cardData];
      updatedCards[editIndex] = newCard; // Update the card at the specific index
      setCardData(updatedCards);
      localStorage.setItem('cardData', JSON.stringify(updatedCards));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      const updatedCards = [...cardData, newCard];
      setCardData(updatedCards);
      localStorage.setItem('cardData', JSON.stringify(updatedCards));
    }

    setNewCard({ title: '', description: '', image: '' });
    setShowModal(false); // Close modal after submission
  };

  const handleEditCard = (index) => {
    const cardToEdit = cardData[index];
    setNewCard(cardToEdit);
    setEditIndex(index);
    setIsEditing(true);
    setShowModal(true); // Open the modal for editing
  };

  const handleRemoveCard = (index) => {
    const updatedCards = cardData.filter((_, cardIndex) => cardIndex !== index);
    setCardData(updatedCards);
    localStorage.setItem('cardData', JSON.stringify(updatedCards));
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>

      <div className="dashboard-actions">
        <button
          className="add-card-button"
          onClick={() => {
            setNewCard({ title: '', description: '', image: '' });
            setIsEditing(false);
            setShowModal(true);
          }}
        >
          Add New Product
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={(e) => e.preventDefault()} className="form">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={newCard.title}
                  onChange={handleInputChange}
                  placeholder="Enter product title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={newCard.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  required
                />
              </div>
              <div className="form-group">
                <label>Image:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  required={!isEditing} // Image is not required during edit
                />
              </div>
              <div className="form-buttons">
                <button
                  type="button"
                  onClick={handleAddCard}
                  className="save-button"
                >
                  {isEditing ? 'Update' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Card List */}
      <div className="card-grid">
        {cardData.map((card, index) => (
          <div key={index} className="card">
            <img src={card.image} alt={card.title} className="card-image" />
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
            <div className="card-buttons">
              <button
                className="edit-card-button"
                onClick={() => handleEditCard(index)}
              >
                Edit
              </button>
              <button
                className="remove-card-button"
                onClick={() => handleRemoveCard(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
