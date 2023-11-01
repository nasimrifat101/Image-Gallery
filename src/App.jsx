import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ImageGrid from "./components/ImageGrid";
import Navbar from "./components/Navbar";

function App() {
  // State to store images and selected images
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // Fetch images data from 'img.json' on component mount
  useEffect(() => {
    fetch(`img.json`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      });
  }, []);

  // Handle drag and drop functionality for reordering images
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // Reorder images based on drag-and-drop result
    const reorderedImages = Array.from(images);
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    // Update images state with reordered images
    setImages(reorderedImages);
  };

  // Handle image selection
  const handleSelect = (imageId) => {
    if (selectedImages.includes(imageId)) {
      // If image is already selected, unselect it
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      // If image is not selected, select it
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  // Handle deleting selected images
  const handleDeleteSelectedImages = () => {
    // Filter out selected images from the images state
    const updatedImages = images.filter(
      (img) => !selectedImages.includes(img.id)
    );

    // Update images state with non-selected images and clear selected images
    setImages(updatedImages);
    setSelectedImages([]);
  };

  // Render the UI
  return (
    <div>
      {/* Navbar component with selected images count and delete button */}
      <Navbar
        selectedImages={selectedImages}
        onDeleteSelectedImages={handleDeleteSelectedImages}
      />
      {/* Image gallery with drag-and-drop functionality */}
      <div className="mb-10">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="image-gallery" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid gap-2 lg:grid-cols-5 lg:gap-10"
              >
                {/* Map through images and render each draggable image */}
                {images.map((imgs, index) => (
                  <Draggable key={imgs.id.toString()} draggableId={imgs.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`relative ${
                          index === 0 ? "col-span-2 row-span-2" : ""
                        }`}
                      >
                        {/* ImageGrid component for displaying images */}
                        <ImageGrid
                          imgs={imgs}
                          index={index}
                          isSelected={selectedImages.includes(imgs.id)}
                          onSelect={handleSelect}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {/* Placeholder for new image */}
                <div>
                  {/* Hardcoded new image */}
                  <img
                    src="https://i.postimg.cc/26c5TGK2/360-F-180311099-Vlj8ufd-Hvec4on-KSDLxxdr-Ni-P6y-X4-Pn-P.jpg"
                    className="border-dotted border-4 rounded-lg"
                    alt=""
                  />
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

// Export the App component
export default App;
