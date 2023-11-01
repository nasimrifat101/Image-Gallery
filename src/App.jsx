import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ImageGrid from "./components/ImageGrid";
import Navbar from "./components/Navbar";

function App() {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    fetch(`img.json`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      });
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = Array.from(images);
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setImages(reorderedImages);
  };

  const handleSelect = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDeleteSelectedImages = () => {
    const updatedImages = images.filter(
      (img) => !selectedImages.includes(img.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  return (
    <div>
      <Navbar
        selectedImages={selectedImages}
        onDeleteSelectedImages={handleDeleteSelectedImages}
      />
      <div className="mb-10">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="image-gallery" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid gap-2 lg:grid-cols-5 lg:gap-10"
              >
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
                <div>
                  
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

export default App;
