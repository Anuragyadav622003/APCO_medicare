import { useState, useEffect } from 'react';

const images = [
  {
    src: 'https://yi-files.s3.eu-west-1.amazonaws.com/products/1406000/1406333/2294881-cover.jpg',
    title: 'Slide 1 Title',
    subtitle: 'This is the subtitle for Slide 1.',
    reviews: 4.5,
    currentPrice: '₹199.99',
    previousPrice: '₹249.99',
    totalPrice: '₹199.99',
    description: 'This is a description for Slide 1. It contains some details about this image.',
    details: 'These are the details for Slide 1. It provides additional information about the product.',
    howToUse: 'To use Slide 1, follow these instructions: ...',
    row: ["premature ejaculation", "Low testosterone", "Talk to doctors", "Access Yourself"],
  },
  {
    src: 'https://yi-files.yellowimages.com/products/1873000/1873945/3019983-cover.jpg',
    title: 'Slide 2 Title',
    subtitle: 'This is the subtitle for Slide 2.',
    reviews: 4.0,
    currentPrice: '₹159.99',
    previousPrice: '₹199.99',
    totalPrice: '₹159.99',
    description: 'This is a description for Slide 2. It contains some details about this image.',
    details: 'These are the details for Slide 2. It provides additional information about the product.',
    howToUse: 'To use Slide 2, follow these instructions: ...',
    row: ["premature ejaculation", "Low testosterone", "Talk to doctors", "Access Yourself"],
  },
  {
    src: 'https://th.bing.com/th/id/OIP.u1Pf19ZgDJ6IK-tMuzCD7QAAAA?w=466&h=580&rs=1&pid=ImgDetMain',
    title: 'Slide 3 Title',
    subtitle: 'This is the subtitle for Slide 3.',
    reviews: 4.0,
    currentPrice: '₹200.99',
    previousPrice: '₹299.99',
    totalPrice: '₹200.99',
    description: 'This is a description for Slide 3. It contains some details about this image.',
    details: 'These are the details for Slide 3. It provides additional information about the product.',
    howToUse: 'To use Slide 3, follow these instructions: ...',
    row: ["premature ejaculation", "Low testosterone", "Talk to doctors", "Access Yourself"],
  },
  // Add other images as needed
];

const Corousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  const [isCartActive, setIsCartActive] = useState(false); // Track "Add to Cart" button state
  const [isBuyActive, setIsBuyActive] = useState(false); // Track "Buy Now" button state
  const [activeContent, setActiveContent] = useState('details');

  const incrementItemCount = () => {
    setItemCount(itemCount + 1);
  };

  const decrementItemCount = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const calculateDiscount = (previousPrice, currentPrice) => {
    const prevPrice = parseFloat(previousPrice.replace(/[₹,]/g, ''));
    const currPrice = parseFloat(currentPrice.replace(/[₹,]/g, ''));
    const discount = ((prevPrice - currPrice) / prevPrice) * 100;
    return discount.toFixed(0);
  };

  const discountPercentage = calculateDiscount(images[currentIndex].previousPrice, images[currentIndex].currentPrice);

  if (!isClient) return null;

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Carousel Images */}
      <div className="relative w-full md:w-1/2 overflow-hidden flex items-center justify-center">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${images.length * 100}%` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full shrink-0 flex justify-center">
              <img src={image.src} alt={`Slide ${index + 1}`} className="object-contain max-h-full max-w-full" />
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full focus:outline-none hover:bg-black/80 transition duration-300"
        >
          &#10094;
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full focus:outline-none hover:bg-black/80 transition duration-300"
        >
          &#10095;
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-black' : 'bg-gray-500/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Image Details */}
      <div className="w-full md:w-1/2 flex flex-col justify-start p-8 bg-gray-300">
        <h2 className="text-3xl font-bold mb-2">{images[currentIndex].title}</h2>
        <h3 className="text-2xl font-semibold text-gray-600 mb-4">{images[currentIndex].subtitle}</h3>

        {/* Reviews */}
        <div className="flex items-center mt-2 mb-4">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={`text-yellow-600 text-xl ${index < Math.round(images[currentIndex].reviews) ? 'fas fa-star' : 'far fa-star'}`}>
              ★
            </span>
          ))}
          <span className="ml-2 text-gray-600">{images[currentIndex].reviews} Reviews</span>
        </div>
        <div className="mt-2">
          {images[currentIndex].row.map((item, index) => (
            <span key={index} className="inline-block bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded mr-2 mb-2">
              {item}
            </span>
          ))}
        </div>

        {/* Prices and Buttons */}
        <div className="mt-4 flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-md font-semibold">
              Price &nbsp;
              <span className="bg-green-500 text-white px-2 py-1 rounded-lg">
                {discountPercentage}% Off
              </span>
            </p>
            <div className="flex flex-row gap-2 items-baseline py-2">
              <div>
                <sup className="pt-2 text-sm ">
                  <p className="line-through text-gray-600">{images[currentIndex].previousPrice}</p>
                </sup>
              </div>
              <p className="text-xl font-bold ">{images[currentIndex].currentPrice }</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500 font-bold">Total Price:</p>
              <div className="text-black text-2xl font-bold">
                {`₹${(parseFloat(images[currentIndex].currentPrice.replace(/[₹,]/g, '')) * itemCount).toFixed(2)}`}
              </div>
            </div>
          </div>

          {/* Item Count and Action Buttons */}
          <div className="flex flex-col items-end pr-4">
            <p className="pb-2 text-lg font-semibold">No. of months</p>
            <div className="flex items-center space-x-2 p-1 w-24 justify-center bg-gray-400 bottom-1 rounded-full mb-6">
              <button
                onClick={decrementItemCount}
                className=" bg-white rounded-full h-8 w-8 hover:bg-slate-800 hover:text-white transition duration-200 font-extrabold text-xl"
              >
                -
              </button>
              <span className="text-xl font-bold">{itemCount}</span>
              <button
                onClick={incrementItemCount}
                className=" bg-white rounded-full h-8 w-8 hover:bg-slate-800 hover:text-white transition duration-200 font-extrabold text-xl"
              >
                +
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setIsCartActive(!isCartActive);
                  if (isBuyActive) setIsBuyActive(false); // Deactivate Buy Now if Add to Cart is activated
                }}
                className={`font-bold px-4 py-2  rounded-lg transition duration-300 ${
                  isCartActive ? 'bg-black text-white' : 'bg-gray-500 text-white'
                }`}
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  setIsBuyActive(!isBuyActive);
                  if (isCartActive) setIsCartActive(false); // Deactivate Add to Cart if Buy Now is activated
                }}
                className={`font-bold px-4 py-2 rounded-lg transition duration-300 ${
                  isBuyActive ? 'bg-black text-white' : 'bg-gray-500 text-white'
                }`}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

       

          {/* Description and Details Sections */}
          <div className="mt-6">
          <div className="space-x-10">
            <button
              onClick={() => setActiveContent('details')}
              className={`flex-1 py-2 text-xl font-bold rounded-lg relative ${
                activeContent === 'details' ? 'text-gray-800' : 'text-gray-500'
              }`}
            >
              Details
              {activeContent === 'details' && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800" />
              )}
            </button>
            <button
              onClick={() => setActiveContent('howToUse')}
              className={`flex-1 py-2 text-xl font-bold rounded-lg relative ${
                activeContent === 'howToUse' ? 'text-gray-800' : 'text-gray-500'
              }`}
            >
              How to Use
              {activeContent === 'howToUse' && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Active Content Display */}
        <div className="mt-4">
          {activeContent === 'details' ? (
            <p>{images[currentIndex].details}</p>
          ) : (
            <p>{images[currentIndex].howToUse}</p>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default Corousel;
