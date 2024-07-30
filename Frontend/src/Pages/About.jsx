import React from 'react';
import Navbar from '../Components/Navbar';

const About = () => {
  return (
    <>
    <Navbar/>
    <section className=" py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to Our BR Collection
          </p>
          <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
            We are dedicated to providing you with the best online shopping experience.
            BR Collection is a well-known Kurti set
company that specializes in trendy and
fashionable ethnic wear for women. They offer
a wide range of Kurti sets in various designs,
colors, and fabrics to cater to different
preferences. BR Collection focuses on
providing high-quality products that are both
stylish and comfortable to wear. They often
incorporate traditional Indian embroidery
techniques and modern silhouettes to create
unique pieces that appeal to a wide audience.
Additionally, BR Collection is known for its
attention to detail, excellent craftsmanship,
and commitment to customer satisfaction.
They frequently update their collections to
keep up with the latest fashion trends and
offer a diverse selection for customers to
choose from. Overall, BR Collection is a
reputable brand in the Kurti set industry,
known for its quality products and
contemporary designs.
          </p>
        </div>
        <div className="mt-10">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="lg:w-1/3">
              <div className="flex items-center justify-center h-64 bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/400/300?random=1)' }}>
                <span className="sr-only">Product Image 1</span>
              </div>
              <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">Our Mission</h3>
              <p className="mt-2 text-base text-gray-500">
                Our mission is to provide high-quality products at affordable prices, ensuring customer satisfaction with every purchase.
              </p>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/3">
              <div className="flex items-center justify-center h-64 bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/400/300?random=2)' }}>
                <span className="sr-only">Product Image 2</span>
              </div>
              <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">Our Vision</h3>
              <p className="mt-2 text-base text-gray-500">
                We envision a world where everyone has access to the products they need, delivered right to their doorstep with convenience and reliability.
              </p>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/3">
              <div className="flex items-center justify-center h-64 bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/400/300?random=3)' }}>
                <span className="sr-only">Product Image 3</span>
              </div>
              <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">Our Values</h3>
              <p className="mt-2 text-base text-gray-500">
                Integrity, customer satisfaction, and innovation are the core values that drive us to excel in our service and offerings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default About;
