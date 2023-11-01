import { useState } from "react";
import PropTypes from "prop-types";

// ImageGrid component for displaying individual images with hover effects and selection functionality
const ImageGrid = ({ imgs, index, isSelected, onSelect }) => {
  // State to track whether the image is being hovered over
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      // Event handlers for mouse hover effects
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox for image selection displayed on hover */}
      {isHovered && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(imgs.id)}
          className="absolute checkbox-md top-2 left-2 z-10"
        />
      )}
      {/* Container for the image with hover and selection effects */}
      <div className="relative">
        {/* Image element displaying the actual image */}
        <img
          src={imgs.img}
          alt={`Image ${index + 1}`}
          className="object-cover w-full h-full rounded-lg border-2"
        />
        {/* Semi-transparent overlay on hover */}
        {isHovered && (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-lg"></div>
        )}
        {/* Checkmark icon displayed on selected images */}
        {isSelected && (
           <div className="absolute top-0 left-0 w-full h-full bg-white opacity-75 rounded-lg flex justify-center items-center">
           {/* SVG checkmark icon */}
           <svg
             xmlns="http://www.w3.org/2000/svg"
             className="w-14 h-14 text-black"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="2"
               d="M5 13l4 4L19 7"
             />
           </svg>
         </div>
        )}
      </div>
    </div>
  );
};

// Prop type validation for ImageGrid component
ImageGrid.propTypes = {
  // Shape of the 'imgs' prop containing 'id' and 'img' properties
  imgs: PropTypes.shape({
    id: PropTypes.number.isRequired, // 'id' property is a required number
    img: PropTypes.string.isRequired, // 'img' property is a required string (URL)
  }).isRequired,
  index: PropTypes.number.isRequired, // 'index' property is a required number
  isSelected: PropTypes.bool.isRequired, // 'isSelected' property is a required boolean
  onSelect: PropTypes.func.isRequired, // 'onSelect' property is a required function
};

// Export the ImageGrid component
export default ImageGrid;
