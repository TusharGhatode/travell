import React, { useState, useEffect } from "react";
import { Label, Select, Button, Table, TextInput } from "flowbite-react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("Male");
  const [city, setCity] = useState("All");

  const [inputGender, setInputGender] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState([]);



  const fetch = async () => {
    try {
      let resp = await axios.get("http://localhost:8080/formData");

      setData(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let resp = await axios.post("http://localhost:8080/formData", {
        inputCity,
        inputGender,
      });

      console.log(resp.data);

      fetch()
    } catch (err) {
      console.log(err);
    }
  };


  const handleCityChange = async (e) => {
    let selCity = e.target.value;
    setCity(selCity); // Update city state
  
    try {
      // Send both city and gender filters together
      let filters = {
        city: selCity,
        gender: value // Use existing gender value
      };
  
      let resp = await axios.get('http://localhost:8080/filterData', { params: filters });
      setData(resp.data.data); // Update the data
    } catch (err) {
      console.log(err);
    }
  };
  
  // Handle gender change
  const handleGenderChange = async (e) => {
    let selGender = e.target.value;
    setValue(selGender); // Update gender state
  
    try {
      // Send both city and gender filters together
      let filters = {
        city: city, // Use existing city value
        gender: selGender
      };
  
      let resp = await axios.get('http://localhost:8080/filterData', { params: filters });
      setData(resp.data.data); // Update the data
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="flex flex-wrap justify-center gap-20 flex-col ">
      <div className="flex flex-wrap justify-center gap-20 my-8">
        <div className="w-40">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Select your city" />
          </div>
          <Select
            id="countries"
            required
            onChange={handleCityChange}
          >
            <option value="All">All</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Indore">Indore</option>
          </Select>
        </div>

        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group font-bold">
            Gender
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleGenderChange}
          >
            <div>
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
            </div>
          </RadioGroup>
        </FormControl>
      </div>

      <form
        className="flex max-w-md flex-col gap-4 ml-[32rem]"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your City" />
          </div>
          <TextInput
            id="email1"
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Gender" />
          </div>
          <TextInput
            id="password1"
            type="text"
            value={inputGender}
            onChange={(e) => setInputGender(e.target.value)}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>

      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>City</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((elem, index) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{elem.city}</Table.Cell>
                <Table.Cell>{elem.gender}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default App;
