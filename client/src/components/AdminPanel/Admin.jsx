import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Checkbox, Label, TextInput, Table } from "flowbite-react";
import axios from "axios";
import { Avatar } from "flowbite-react";
import Navigationbar from "./Navigationbar";
import { Modal } from "flowbite-react";

const Admin = () => {
  const [value, setValue] = React.useState("1");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [location, setLocation] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fileBase64, setFileBase64] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);


  const [openModal, setOpenModal] = useState(false);

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/getData");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);




  const fetchData1 = async () => {
    try {
      const response = await axios.post("http://localhost:8080/getData1");
      setData1(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData1();
  }, []);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(); // Create a FileReader instance
    setFile(file);
    reader.onloadend = () => {
      const base64String = reader.result; // This is the Base64 string
      setFileBase64(base64String); // Log the Base64 string
      setUrl(URL.createObjectURL(e.target.files[0]));
    };

    reader.readAsDataURL(file);

    console.log(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/package", {
        place,
        price,
        desc,
        file: fileBase64,
        location,
        from,
        to,
      });

      const res = response.data;

      if (res.status === 201) {
        alert("Package Added");
        setFile("");
        setPlace("");
        setLocation("");
        setPrice("");
        setDesc("");
        fetchData();
      }
    } catch (error) {}
  };

  const handlepop = (elem) => {
    localStorage.setItem("elem", JSON.stringify(elem));
    setOpenModal(true);

    setPrice(elem.price);
    setDesc(elem.desc);
    setPlace(elem.place);
    setLocation(elem.location);
    
    
    setUrl(elem.image);
    setFileBase64(elem.image);
    setId(elem._id);

    const date = new Date(elem.to);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    setTo(formattedDate);



    const datefrom = new Date(elem.from);
    const formattedDate1 = `${datefrom.getMonth() + 1}/${datefrom.getDate()}/${datefrom.getFullYear()}`;
    setFrom(formattedDate1);
  };

  const handleDelete = async (elem) => {
    try {
      const response = await axios.delete("http://localhost:8080/delPackage", {
        data: { elem },
      });

      const res = response.data;
      alert("Deleted Successfully");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch("http://localhost:8080/update", {
        place,
        price,
        desc,
        file: fileBase64,
        location,
        from,
        to,
        id,
      });

      const res = response.data;

      if (res.status === 200) {
        alert("Package updated");
        setFile("");
        setPlace("");
        setLocation("");
        setPrice("");
        setDesc("");
        fetchData();
        setOpenModal(false)
      }
    } catch (error) {}
  };

  console.log(to);

  return (
    <div className=" overflow-hidden hide-scrollbar">
      <Navigationbar />
      <div className="mt-8 ">
        <Box
          className="flex flex-wrap justify-center w-full "
          sx={{ typography: "body1" }}
        >
          <TabContext
            value={value}
            className="flex flex-wrap justify-center w-full "
          >
            <Box
              sx={{ borderBottom: 1, borderColor: "divider" }}
              className=" w-[90vw]"
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Add Trip" value="1" />
                <Tab label="View Trip" value="2" />
                <Tab label="View Booking" value="3" className="" />
              </TabList>
            </Box>
            <TabPanel value="1" className="">
              <form
                className="flex  flex-col gap-4 w-[80vw] md:w-[50vw]"
                onSubmit={handleSubmit}
              >
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="Place" />
                  </div>
                  <TextInput
                    id="email1"
                    type="text"
                    style={{ backgroundColor: "#e5e4e2", color: "black" }}
                    required
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password1" value="Description" />
                  </div>
                  <TextInput
                    id="password1"
                    type="text"
                    required
                    style={{ backgroundColor: "#e5e4e2", color: "black" }}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="Price" />
                  </div>
                  <TextInput
                    id="email1"
                    type="number"
                    style={{ backgroundColor: "#e5e4e2", color: "black" }}
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="Location" />
                  </div>
                  <TextInput
                    id="email1"
                    style={{ backgroundColor: "#e5e4e2", color: "black" }}
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-wrap  w-full">
                  <div className="w-1/2 px-1">
                    <div className="mb-2 block">
                      <Label htmlFor="password1" value="From Date" />
                    </div>
                    <TextInput
                      id="password1"
                      type="date"
                      required
                      style={{ backgroundColor: "#e5e4e2", color: "black" }}
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </div>

                  <div className="w-1/2 px-1">
                    <div className="mb-2 block">
                      <Label htmlFor="password1" value="Too Date" />
                    </div>
                    <TextInput
                      id="password1"
                      type="date"
                      required
                      style={{ backgroundColor: "#e5e4e2", color: "black" }}
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="Image" />
                  </div>
                  <TextInput
                    id="email1"
                    type="file"
                    style={{ backgroundColor: "#e5e4e2", color: "black" }}
                    required
                    onChange={handleFile}
                  />
                </div>

                <Button type="submit">Submit</Button>
              </form>
            </TabPanel>

            <TabPanel value="2" className="overflow-scroll">
              <div className="overflow-x-scroll ">
                <Table
                  striped
                  className="overflow-x-scroll w-[80vw] border border-gray-300 rounded-xl "
                >
                  <Table.Head>
                    <Table.HeadCell className="w-40 text-center">
                      Image
                    </Table.HeadCell>
                    <Table.HeadCell className="w-[60rem] text-center">
                      Place
                    </Table.HeadCell>
                    <Table.HeadCell className="w-80 text-center">
                      Description
                    </Table.HeadCell>
                    <Table.HeadCell className="w-20 text-center">
                      Price
                    </Table.HeadCell>
                    <Table.HeadCell className="w-40">Location</Table.HeadCell>
                    <Table.HeadCell className="w-60">From Date</Table.HeadCell>
                    <Table.HeadCell className="w-60">To Date</Table.HeadCell>

                    <Table.HeadCell colSpan={2} className="w-40 text-center">
                      Operations
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {data &&
                      data.map &&
                      data.map((elem, index) => (
                        <Table.Row
                          key={index}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Avatar
                              img={
                                elem.image ||
                                "https://images.pexels.com/photos/731217/pexels-photo-731217.jpeg?auto=compress&cs=tinysrgb&w=600"
                              }
                              className=""
                            />
                          </Table.Cell>
                          <Table.Cell>{elem.place || "N/A"}</Table.Cell>
                          <Table.Cell>
                            {(elem.desc &&
                              elem.desc.split(" ").slice(0, 5).join(" ")) ||
                              "N/A"}
                          </Table.Cell>

                          <Table.Cell>${elem.price || "N/A"}</Table.Cell>
                          <Table.Cell>{elem.location || "N/A"}</Table.Cell>
                          <Table.Cell>{elem.from || "N/A"}</Table.Cell>
                          <Table.Cell>{elem.to || "N/A"}</Table.Cell>

                          <Table.Cell className="w-20">
                            <p
                              onClick={() => handlepop(elem)}
                              className="font-extrabold cursor-pointer text-green-600 hover:underline dark:text-cyan-500"
                            >
                              Update
                            </p>
                          </Table.Cell>
                          <Table.Cell className="w-20">
                            <p
                              className="font-extrabold cursor-pointer text-red-600  hover:underline dark:text-cyan-500"
                              onClick={() => handleDelete(elem)}
                            >
                              Delete
                            </p>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table>
              </div>
            </TabPanel>

            <TabPanel value="3">
              <div className="overflow-x-scroll flex flex-wrap justify-center">
              <Table
                  striped
                  className="overflow-x-scroll w-[80vw] border border-gray-300 rounded-xl "
                >
                  <Table.Head>
                    <Table.HeadCell className="w-40 text-center">
                      Image
                    </Table.HeadCell>
                    <Table.HeadCell className="w-[60rem] text-center">
                      Place
                    </Table.HeadCell>
                    <Table.HeadCell className="w-80 text-center">
                      Location
                    </Table.HeadCell>
                    <Table.HeadCell className="w-20 text-center">
                      Travelers
                    </Table.HeadCell>
                    <Table.HeadCell className="w-40">Mobile</Table.HeadCell>
                   

                   
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {data1 &&
                      data1.map &&
                      data1.map((elem, index) => (
                        <Table.Row
                          key={index}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Avatar
                              img={
                                elem.image ||
                                "https://images.pexels.com/photos/731217/pexels-photo-731217.jpeg?auto=compress&cs=tinysrgb&w=600"
                              }
                              className=""
                            />
                          </Table.Cell>
                          <Table.Cell className="text-center">{elem.place || "N/A"}</Table.Cell>
                          <Table.Cell className="text-center">
                            {elem.location}
                          </Table.Cell>

                          <Table.Cell className="text-center">{elem.travelers || "N/A"}</Table.Cell>
                          <Table.Cell>{elem.number || "N/A"}</Table.Cell>
                        
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table>
              </div>
            </TabPanel>
          </TabContext>
        </Box>

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <form
              className="flex  flex-col gap-4 w-full"
              onSubmit={handleUpdate}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Place" />
                </div>
                <TextInput
                  id="email1"
                  type="text"
                  style={{ backgroundColor: "#e5e4e2", color: "black" }}
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Description" />
                </div>
                <TextInput
                  id="password1"
                  type="text"
                  style={{ backgroundColor: "#e5e4e2", color: "black" }}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Price" />
                </div>
                <TextInput
                  id="email1"
                  type="number"
                  style={{ backgroundColor: "#e5e4e2", color: "black" }}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Location" />
                </div>
                <TextInput
                  id="email1"
                  style={{ backgroundColor: "#e5e4e2", color: "black" }}
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap  w-full">
                <div className="w-1/2 px-1">
                  <div className="mb-2 block">
                    <Label htmlFor="password1" value="From Date" />
                  </div>
                  <TextInput
                    id="password1"
                    type="date"
                    style={{ backgroundColor: "#e5e4e2", color: "black" }}
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>

                <div className="w-1/2 px-1">
                  <div className="mb-2 block">
                    <Label htmlFor="password1" value="Too Date" />
                  </div>
                  <TextInput
                    id="password1"
                    type="date"
                    style={{ backgroundColor: "#e5e4e2", color: "black" }}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
              </div>

              <img src={url} className="h-40 object-cover" />

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Image" />
                </div>
                <TextInput
                  id="email1"
                  type="file"
                  style={{ backgroundColor: "#e5e4e2", color: "black" }}
                  onChange={handleFile}
                />
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Admin;
