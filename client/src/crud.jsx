import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import axios from "axios";


export default function App() {
  const [value, setValue] = React.useState("1");
  const [desc, setDesc] = React.useState("");
  const [img, setImg] = React.useState("");
  const [updesc, setUpDesc] = React.useState("");
  const [upimg, setUpImg] = React.useState("");
  const [arr, setArr] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [id, setId] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = function() {
        setImg(reader.result)
        setUpImg(reader.result)
    }
    reader.readAsDataURL(file);
  
  };

  

  

  React.useEffect(() => {
    const fetchApiData = async () => {
      try {
        const resp = await axios.get("http://localhost:8080/formData");
        setArr(resp.data.data);
        

        // setDesc("");
        // setImg("");
      } catch (err) {
        console.log(err);
      }
    };

    fetchApiData();
  }, []);


 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post("http://localhost:8080/formData", {img,desc});
      console.log(resp.data);

      setDesc("");
      setImg("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    console.log(id)
    try {
      const resp = await axios.delete(
        `http://localhost:8080/formData?desc=${id}`
      );
      console.log(resp.data);

      setArr((e) => e.filter((elem) => elem._id != id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleFav = async(id) => {
    setOpenModal(true);
    console.log(id)

    try {
      const resp = await axios.post('http://localhost:8080/dataId',{id});
      

      console.log(resp.data.data)
      setUpImg(resp.data.data.img)
     
      setUpDesc(resp.data.data.desc)
      setId(resp.data.data._id)



    } catch (err) {
      console.log(err);
    }
  };




  const handleUpdate = async(e) =>{
    e.preventDefault()
    try {
      const resp = await axios.patch(
        'http://localhost:8080/updateData',{updesc,upimg,id}
      );
      console.log(resp.data);
      
    setOpenModal(false);
    window.location.reload()

    } catch (err) {
      console.log(err);
    }

  }

  return (
    <Box
      sx={{ width: "100%", typography: "body1" }}
      className="flex flex-wrap justify-center flex-col  h-screen items-center"
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Add Data" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div>
             
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                onChange={handleImage}
                accept="image/*"
                type="file"
                placeholder="name@flowbite.com"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <Button type="submit">Submit</Button>
          </form>
        </TabPanel>
        <TabPanel value="2">
          <div className="mt-4 ">
            {arr.length === 0 ? (
              ""
            ) : (
              <div className="w-full   flex flex-wrap gap-4">
                <div className="flex flex-wrap gap-4">
                  {
                    arr.map((elem,index)=>{

                      
                      return(
                        
                          <div className="h-40 relative  w-40 rounded-xl shadow-sm shadow-gray-600">
                            <img src={elem.img} className="h-40 w-40" />
      
                            <div
                              className="bg-gray-400 absolute bottom-0 right-0 m-2 p-2 cursor-pointer rounded-full h-10 w-10 flex flex-wrap justify-center items-center"
                              onClick={() => handleDelete(elem._id)}
                            >
                              <DeleteIcon />
                            </div>
      
                            {index === 0 ? (
                              <div
                                className="bg-gray-400 absolute left-0 top-0 m-2 cursor-pointer p-2 rounded-full h-10 w-10 flex flex-wrap justify-center items-center"
                                onClick={() => handleFav(elem._id)}
                              >
                                <StarRateIcon />
                              </div>
                            ) : (
                              <div
                                className="bg-gray-400 absolute left-0 top-0 m-2 cursor-pointer p-2 rounded-full h-10 w-10 flex flex-wrap justify-center items-center"
                                onClick={() => handleFav(elem._id)}
                              >
                                <StarBorderIcon />
                              </div>
                            )}
      
                            <p>{elem.desc}</p>
      
                            <Modal
                              show={openModal}
                              onClose={() => setOpenModal(false)}
                            >
                              <Modal.Header>Terms of Service</Modal.Header>
                              <Modal.Body>
      
                                <img src={upimg}  className="h-28 w-28 rounded-full ml-40"/>
                                <form
                                  className="flex max-w-md flex-col gap-4"
                                  onSubmit={handleUpdate}
                                >
                                  <div>
                                    <div className="mb-2 block">
                                      <Label htmlFor="email1" value="Your email" />
                                    </div>
                                    <TextInput
      
                                    type="file"
                                    onChange={handleImage}
      
                                    />
                                  </div>
      
                                  <input
                                    type="text"
                                    placeholder="Description..."
                                    value={updesc}
                                    onChange={(e) => setUpDesc(e.target.value)}
                                  />
      
                                  <Button type="submit">Submit</Button>
                                </form>
                              </Modal.Body>
                            </Modal>
                          </div>
                        
                      )
                    })
                  }
                </div>
              </div>
            )}
          </div>
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}








