// import React, { useEffect, useState } from 'react';
// import Navbar from '../Components/Navbar';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../Firebase/Config';
// import { setProduct } from '../Redux/Products/ProductReducer';

// const MyOrders = () => {


//   const { id } = useParams();
//   const [product, setProduct] = useState();
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const {userId} = useSelector(state=>state.user);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const querySnapshot = await getDoc(doc(db, "Products", id));
//     setProduct(querySnapshot.data());
//     setLoading(false);
//   }
//   return (
//     <>
//       <Navbar />
//       <div>
//         <div className=''>
//           <div className='text-3xl font-bold text-center mt-10'>Users name Table</div>
//           <div className="w-full shadow-md sm:rounded-lg mt-4">
//             <table className="w-full text-sm text-left rtl:text-right text-gray-500">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3">
//                     Order Id
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Status
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Items Quantity
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Amount
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* Table body content */}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyOrders;

import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/Config';
import { setProduct } from '../Redux/Products/ProductReducer';

const MyOrders = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.user);

  useEffect(() => {
    if (id) {
      fetchData();
    } else {
      console.error("Product ID is undefined");
      setLoading(false);
    }
  }, [id]);

  const fetchData = async () => {
    try {
      console.log("Fetching document with ID:", id);
      const docRef = doc(db, "Products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
        dispatch(setProduct(docSnap.data())); // Assuming you want to update the Redux store as well
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div>
        <div className=''>
          <div className='text-3xl font-bold text-center mt-10'>Users name Table</div>
          <div className="w-full shadow-md sm:rounded-lg mt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Items Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Table body content */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;

