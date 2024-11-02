import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Image = styled.img`
  max-width: 500px;
  max-height: 300px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #6c757d;
`;

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/category/smartphones"
        );
        const smartphones = response.data.products;
        setImages(smartphones);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (images.length === 0) return <LoadingText>Loading images...</LoadingText>;

  return (
    <SliderContainer>
      <Button onClick={prevSlide}>Previous</Button>

      <Image
        src={images[currentIndex]?.thumbnail}
        alt={`Slide ${currentIndex + 1}`}
      />

      <Button onClick={nextSlide}>Next</Button>
    </SliderContainer>
  );
};

export default ImageSlider;
