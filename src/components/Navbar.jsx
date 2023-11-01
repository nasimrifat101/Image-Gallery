import PropTypes from "prop-types";

// Navbar component for displaying selected images count and delete button
const Navbar = ({ selectedImages, onDeleteSelectedImages }) => {
  return (
    <div className="navbar bg-base-100">
      {/* Left section of the Navbar */}
      <div className="flex-1">
        {/* Display selected images count or 'Gallery' if no images are selected */}
        <a className="text-xs lg:text-xl font-bold">
          {selectedImages.length > 0 ? `${selectedImages.length} Files Selected` : "Gallery"}
        </a>
      </div>
      
      {/* Right section of the Navbar, displayed only when images are selected */}
      {selectedImages.length > 0 && (
        <div className="flex-none">
          {/* Delete button */}
          <ul className="menu menu-horizontal px-1">
            <li>
              {/* Click event triggers onDeleteSelectedImages function */}
              <a className="text-red-500 font-bold" onClick={onDeleteSelectedImages}>
                Delete Files
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

// Prop type validation for Navbar component
Navbar.propTypes = {
  // 'selectedImages' prop is an array of selected image objects
  selectedImages: PropTypes.array.isRequired,
  // 'onDeleteSelectedImages' prop is a function to handle deleting selected images
  onDeleteSelectedImages: PropTypes.func.isRequired
};

// Export the Navbar component
export default Navbar;
