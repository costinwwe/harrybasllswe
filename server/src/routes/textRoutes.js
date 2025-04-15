// src/routes/textRoutes.js
const express = require('express');
const router = express.Router();
const Text = require('../models/textModels.js');

// Get all texts
router.get('/', async (req, res) => {
  try {
    const texts = await Text.find({});
    res.json(texts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get text by ID
router.get('/:id', async (req, res) => {
  try {
    const text = await Text.findById(req.params.id);
    if (!text) {
      return res.status(404).json({ message: 'Text not found' });
    }
    res.json(text);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new text
router.post('/', async (req, res) => {
  try {
    const text = new Text(req.body);
    const savedText = await text.save();
    res.status(201).json(savedText);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a text
router.put('/:id', async (req, res) => {
  try {
    const text = await Text.findById(req.params.id);
    if (!text) {
      return res.status(404).json({ message: 'Text not found' });
    }
    
    const updatedText = await Text.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedText);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a text
router.delete('/:id', async (req, res) => {
  try {
    const text = await Text.findById(req.params.id);
    if (!text) {
      return res.status(404).json({ message: 'Text not found' });
    }
    
    await Text.findByIdAndDelete(req.params.id);
    res.json({ message: 'Text removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;