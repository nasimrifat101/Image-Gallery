import PropTypes from "prop-types";

const Navbar = ({ selectedImages, onDeleteSelectedImages }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="text-xs lg:text-xl font-bold">{selectedImages.length > 0 ? `${selectedImages.length} Files Selected` : "Gallery"}</a>
      </div>
      {selectedImages.length > 0 && (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
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

Navbar.propTypes = {
  selectedImages: PropTypes.array.isRequired,
  onDeleteSelectedImages: PropTypes.func.isRequired
};

export default Navbar;
