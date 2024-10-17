"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Michael Lee",
      comment:
        "What sets Waseem and team apart is their ability to understand the client's vision and translate it into reality. They approached our project with enthusiasm and skill, and the end product exceeded all our expectations. I'm genuinely grateful for their efforts and would not hesitate to hire them for future ventures",
      position: "Web Developer",
    },
    {
      id: 2,
      name: "Jane Smith",
      comment:
        "Praesent commodo tellus in nisi sodales, et malesuada nunc tincidunt. Proin ut tristique tellus. Nullam facilisis ligula vel sem congue, sit amet luctus eros laoreet.",
      position: "UX Designer",
    },

    {
      id: 3,
      name: "John Doe",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed turpis et odio tincidunt fermentum. Sed finibus eros eu dolor tempus, ac venenatis justo gravida.",
      position: "Web Developer",
    },
    {
      id: 4,
      name: "Jane Smith",
      comment:
        "Praesent commodo tellus in nisi sodales, et malesuada nunc tincidunt. Proin ut tristique tellus. Nullam facilisis ligula vel sem congue, sit amet luctus eros laoreet.",
      position: "UX Designer",
    },
    // Add more testimonials here
  ];

  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div
        id="testimonials-section"
        className="bg-gray-100 p-5 md:p-10 lg:p-16 relative"
        style={{ zIndex: 1 }}
      >
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-3xl font-light mb-10">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonialsData.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-4 border rounded-lg shadow-lg bg-white max-w-sm"
              >
                <p className="text-gray-600 mb-4">{testimonial.comment}</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  {/* <p>{testimonial.position}</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="bg-gray-100 py-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <Slider {...settings}>
                            {testimonialsData.map(testimonial => (
                                <div key={testimonial.id} className="p-4 border rounded-lg shadow-lg bg-white max-w-sm">
                                    <p className="text-gray-600 mb-4">{testimonial.comment}</p>
                                    <div>
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p>{testimonial.position}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div> */}
    </>
  );
};

export default Testimonials;
