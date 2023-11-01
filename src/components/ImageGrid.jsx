import { useState } from "react";
import PropTypes from "prop-types";

const ImageGrid = ({ imgs, index, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(imgs.id)}
          className="absolute checkbox-md top-2 left-2 z-10"
        />
      )}
      <div className="relative">
        <img
          src={imgs.img}
          alt={`Image ${index + 1}`}
          className="object-cover w-full h-full rounded-lg border-2"
        />
        {isHovered && (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-lg"></div>
        )}
        {isSelected && (
           <div className="absolute top-0 left-0 w-full h-full bg-white opacity-75 rounded-lg flex justify-center items-center">
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

ImageGrid.propTypes = {
  imgs: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ImageGrid;
