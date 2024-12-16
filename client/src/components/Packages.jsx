// import React, { useState, useEffect } from "react";
// import { Button, Modal } from "flowbite-react";
// import axios from "axios";

// const Packages = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [person, setPerson] = useState("");
//   const [data, setData] = useState([]);
//   // const [data2, setData2] = useState([]);
//   const [bookedPackages, setBookedPackages] = useState([]);

//   const [tripData, setTripData] = useState([]);
//   const [clientId, setClientId] = useState(null);

//   useEffect(() => {
//     const cliId = localStorage.getItem("clientId"); // Retrieve clientId from localStorage
//     setClientId(cliId); // Set clientId in state
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/getData");
//       setData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Fetch data when the component mounts
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleClick = (elem) => {
//     setOpenModal(true);
//     setTripData(elem);
//   };

//   const handleGenerateInvoice = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/generate-invoice",
//         {
//           person,
//           email,
//           name,
//           mobile,
//           clientId,
//           tripData,
//         },
//         { responseType: "blob" }
//       );

//       // Create a downloadable link
//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `invoice-${tripData._id}.pdf`;
//       link.click();

//       // Store booked trip data in localStorage
//       const existingBookings =
//         JSON.parse(localStorage.getItem("bookedPackages")) || [];
//       setBookedPackages([...existingBookings, tripData]); // Append new booked package
//       localStorage.setItem(
//         "bookedPackages",
//         JSON.stringify([...existingBookings, tripData])
//       );

//       setEmail("");
//       setMobile("");
//       setName("");
//       setPerson("");
//       setOpenModal(false);
//     } catch (error) {
//       console.error("Error generating invoice:", error);
//     }
//   };

//   useEffect(() => {
//     const clientId = localStorage.getItem("clientId");
//     if (clientId) {
//       const storedBookings =
//         JSON.parse(localStorage.getItem("bookedPackages")) || [];
//       setBookedPackages(
//         storedBookings.filter((booking) => booking.clientId === clientId)
//       );
//     }
//   }, []);

//   return (
//     <div>
//       <section class="package" id="package">
//         <div class="container">
//           <p class="section-subtitle">Popular Packeges</p>

//           <h2 class="h2 section-title">Checkout Our Packeges</h2>

//           <p class="section-text">
//             Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec
//             nemo, rutrum. Vestibulum cumque laudantium. Sit ornare mollitia
//             tenetur, aptent.
//           </p>

//           {data.map((elem, index) => (
//             <ul class="package-list">
//               <li>
//                 <div class="package-card h-[37rem] md:h-[20rem] xl:h-[24rem]">
//                   <figure class="card-banner">
//                     <img
//                       src={elem.image}
//                       alt="Experience The Great Holiday On Beach"
//                       loading="lazy"
//                       className=""
//                     />
//                   </figure>

//                   <div class="card-content">
//                     <h3 class="h3 card-title">
//                       {elem.place
//                         ? elem.place.split(" ").slice(0, 3).join(" ") + "..."
//                         : "N/A"}
//                     </h3>

//                     <p className="card-text">
//                       {elem.desc
//                         ? elem.desc.split(" ").slice(0, 8).join(" ") + "..."
//                         : "N/A"}
//                     </p>

//                     <ul class="card-meta-list">
//                       <li class="card-meta-item">
//                         <div class="meta-box">
//                           <ion-icon name="location"></ion-icon>
//                           <p class="text">{elem.location}</p>
//                         </div>
//                       </li>

//                       <li class="card-meta-item">
//                         <div class="meta-box">
//                           <ion-icon name="location"></ion-icon>
//                           {elem.from
//                             ? elem.from.split("-").reverse().join("-")
//                             : "N/A"}
//                         </div>
//                       </li>

//                       <li class="card-meta-item">
//                         <div class="meta-box">
//                           <ion-icon name="location"></ion-icon>
//                           {elem.to
//                             ? elem.to.split("-").reverse().join("-")
//                             : "N/A"}
//                         </div>
//                       </li>
//                     </ul>
//                   </div>

//                   <div class="card-price ">
//                     <p class="price md:-mt-40">
//                       ${elem.price}
//                       {/* <span>/ per person</span> */}
//                     </p>

//                     <button
//                       class={`btn btn-secondary md:-mt-16 ${
//                         bookedPackages.find((b) => b._id === elem._id)
//                           ? "bg-gray-500"
//                           : ""
//                       }`}
//                       onClick={() =>
//                         bookedPackages.find((b) => b._id === elem._id)
//                           ? null
//                           : handleClick(elem)
//                       }
//                       disabled={bookedPackages.find((b) => b._id === elem._id)}
//                     >
//                       {bookedPackages.find((b) => b._id === elem._id)
//                         ? "Booked"
//                         : "Book Now"}
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             </ul>
//           ))}
//         </div>
//       </section>

//       <Modal show={openModal} onClose={() => setOpenModal(false)}>
//         <Modal.Header></Modal.Header>
//         <Modal.Body>
//           <div className="w-full -mt-16 px-6 py-8">
//             <div className="mt-5 grid grid-cols-1 gap-4">
//               <div>
//                 <label className="font-semibold text-sm text-gray-600 pb-1 block">
//                   Name
//                 </label>
//                 <input
//                   className="border rounded-lg px-3 py-3 bg-gray-100 border-gray-300 mt-1 mb-2 text-sm w-full"
//                   type="text"
//                   id="email"
//                   placeholder="Name"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label
//                   className="font-semibold text-sm text-gray-600 pb-1 block"
//                   htmlFor="email"
//                 >
//                   Email
//                 </label>
//                 <input
//                   className="border rounded-lg px-3 py-3 bg-gray-100 border-gray-300 mt-1 mb-2 text-sm w-full"
//                   type="email"
//                   id="email"
//                   placeholder="Email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label
//                   className="font-semibold text-sm text-gray-600 pb-1 block"
//                   htmlFor="password"
//                 >
//                   Phone No.
//                 </label>
//                 <input
//                   placeholder="Phone N0"
//                   required
//                   className="border rounded-lg px-3 bg-gray-100 border-gray-300 py-3 mt-1 mb-2 text-sm"
//                   type="number"
//                   id="number"
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label
//                   className="font-semibold text-sm text-gray-600 pb-1 block"
//                   htmlFor="email"
//                 >
//                   No Of Travelers
//                 </label>
//                 <input
//                   className="border rounded-lg px-3 py-3 bg-gray-100 border-gray-300 mt-1 mb-2 text-sm w-full"
//                   type="number"
//                   id="email"
//                   placeholder="number"
//                   required
//                   value={person}
//                   onChange={(e) => setPerson(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="mt-1">
//               <button
//                 className="inline-block w-full px-6 py-3 mt-2 sm:py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-orange-700 to-orange-400"
//                 onClick={handleGenerateInvoice}
//               >
//                 Book
//               </button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default Packages;












import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";

const Packages = () => {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [person, setPerson] = useState("");
  const [data, setData] = useState([]);
  const [bookedPackages, setBookedPackages] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [tripData, setTripData] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();

    // Get clientId from localStorage
    const storedClientId = localStorage.getItem("clientId");
    setClientId(storedClientId);

    // Fetch booked packages based on clientId from localStorage
    if (storedClientId) {
      const storedBookings = JSON.parse(localStorage.getItem("bookedPackages")) || [];
      setBookedPackages(storedBookings.filter((booking) => booking.clientId === storedClientId));
    }
  }, []);

  // Fetching packages data
  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/getData");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = (elem) => {
    setOpenModal(true);
    setTripData(elem);
  };

  const handleGenerateInvoice = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/generate-invoice",
        {
          person,
          email,
          name,
          mobile,
          clientId, // Pass clientId
          tripData,
        },
        { responseType: "blob" }
      );

      // Create a downloadable link
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${tripData._id}.pdf`;
      link.click();

      // Add the new booking to localStorage
      const existingBookings = JSON.parse(localStorage.getItem("bookedPackages")) || [];
      setBookedPackages([...existingBookings, { ...tripData, clientId }]); // Append new booked package with clientId
      localStorage.setItem(
        "bookedPackages",
        JSON.stringify([...existingBookings, { ...tripData, clientId }])
      );

      // Clear form and modal
      setEmail("");
      setMobile("");
      setName("");
      setPerson("");
      setOpenModal(false);
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  };

  return (
    <div>
      <section className="package" id="package">
        <div className="container">
          <p className="section-subtitle">Popular Packages</p>
          <h2 className="h2 section-title">Checkout Our Packages</h2>
          <p className="section-text">
            Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec
            nemo, rutrum. Vestibulum cumque laudantium. Sit ornare mollitia
            tenetur, aptent.
          </p>

          {data.map((elem, index) => (
            <ul className="package-list" key={elem._id}>
              <li>
                <div className="package-card h-[37rem] md:h-[20rem] xl:h-[24rem]">
                  <figure className="card-banner">
                    <img
                      src={elem.image}
                      alt="Experience The Great Holiday On Beach"
                      loading="lazy"
                      className=""
                    />
                  </figure>

                  <div className="card-content">
                    <h3 className="h3 card-title">
                      {elem.place
                        ? elem.place.split(" ").slice(0, 3).join(" ") + "..."
                        : "N/A"}
                    </h3>
                    <p className="card-text">
                      {elem.desc
                        ? elem.desc.split(" ").slice(0, 8).join(" ") + "..."
                        : "N/A"}
                    </p>
                    <ul className="card-meta-list">
                      <li className="card-meta-item">
                        <div className="meta-box">
                          <ion-icon name="location"></ion-icon>
                          <p className="text">{elem.location}</p>
                        </div>
                      </li>
                      <li className="card-meta-item">
                        <div className="meta-box">
                          <ion-icon name="location"></ion-icon>
                          {elem.from
                            ? elem.from.split("-").reverse().join("-")
                            : "N/A"}
                        </div>
                      </li>
                      <li className="card-meta-item">
                        <div className="meta-box">
                          <ion-icon name="location"></ion-icon>
                          {elem.to
                            ? elem.to.split("-").reverse().join("-")
                            : "N/A"}
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="card-price">
                    <p className="price md:-mt-40">
                      ${elem.price}
                      {/* <span>/ per person</span> */}
                    </p>

                    <button
                      className={`btn btn-secondary md:-mt-16 ${
                        bookedPackages.find((b) => b._id === elem._id)
                          ? "bg-gray-500"
                          : ""
                      }`}
                      onClick={() =>
                        bookedPackages.find((b) => b._id === elem._id)
                          ? null
                          : handleClick(elem)
                      }
                      disabled={bookedPackages.find((b) => b._id === elem._id)}
                    >
                      {bookedPackages.find((b) => b._id === elem._id)
                        ? "Booked"
                        : "Book Now"}
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </section>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="w-full -mt-16 px-6 py-8">
            <div className="mt-5 grid grid-cols-1 gap-4">
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Name
                </label>
                <input
                  className="border rounded-lg px-3 py-3 bg-gray-100 border-gray-300 mt-1 mb-2 text-sm w-full"
                  type="text"
                  id="name"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border rounded-lg px-3 py-3 bg-gray-100 border-gray-300 mt-1 mb-2 text-sm w-full"
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                  htmlFor="mobile"
                >
                  Phone No.
                </label>
                <input
                  placeholder="Phone No"
                  required
                  className="border rounded-lg px-3 bg-gray-100 border-gray-300 py-3 mt-1 mb-2 text-sm"
                  type="number"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div>
                <label
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                  htmlFor="person"
                >
                  No Of Travelers
                </label>
                <input
                  className="border rounded-lg px-3 py-3 bg-gray-100 border-gray-300 mt-1 mb-2 text-sm w-full"
                  type="number"
                  id="person"
                  placeholder="Number of travelers"
                  required
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-1">
              <button
                className="inline-block w-full px-6 py-3 mt-2 sm:py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-orange-700 to-orange-400"
                onClick={handleGenerateInvoice}
              >
                Book
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Packages;
