const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/imgs/products');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/add-medicine', upload.single('medicineImage'), (req, res) => {
  const { medicineName, medicinePrice } = req.body;
  const medicineImage = req.file.filename;

  const newMedicine = {
    name: medicineName,
    price: medicinePrice,
    image: medicineImage
  };

  fs.readFile('medicines.json', (err, data) => {
    if (err) throw err;
    const medicines = JSON.parse(data);
    medicines.push(newMedicine);
    fs.writeFile('medicines.json', JSON.stringify(medicines), (err) => {
      if (err) throw err;
      res.redirect('/AdminPanel.html');
    });
  });
});

app.get('/medicines', (req, res) => {
  fs.readFile('medicines.json', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.delete('/medicines/:name', (req, res) => {
  const medicineName = req.params.name;

  fs.readFile('medicines.json', (err, data) => {
    if (err) throw err;
    let medicines = JSON.parse(data);
    medicines = medicines.filter(medicine => medicine.name !== medicineName);
    fs.writeFile('medicines.json', JSON.stringify(medicines), (err) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});