const [img, setImg] = useState([]);


  const handleImage = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImg((e) => [...e, reader.result]);
    };

    reader.readAsDataURL(file);
  };
  console.log(img);