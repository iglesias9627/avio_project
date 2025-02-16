import { Router } from 'express';
import Flight from '../models/Flight.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: Route API to manage flights
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Flight:
 *       type: object
 *       required:
 *         - aircraft
 *         - flightNumber
 *         - schedule
 *         - departure
 *         - destination
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the flight
 *         aircraft:
 *           type: string
 *           description: Aircraft type
 *         flightNumber:
 *           type: string
 *           description: Flight number
 *         schedule:
 *           type: object
 *           properties:
 *             std:
 *               type: string
 *               format: date-time
 *               description: Scheduled departure time
 *             sta:
 *               type: string
 *               format: date-time
 *               description: Scheduled arrival time
 *         departure:
 *           type: string
 *           description: Departure airport code
 *         destination:
 *           type: string
 *           description: Destination airport code
 */

/**
 * @swagger
 * /flights:
 *   get:
 *     summary: Get all flights
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of flights
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flight'
 *       403:
 *         description: Access denied
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

/**
 * @swagger
 * /flights:
 *   post:
 *     summary: Create a new flight
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flight'
 *     responses:
 *       201:
 *         description: Flight created successfully
 *       400:
 *         description: Invalid payload
 *       403:
 *         description: Access denied
 *       401:
 *         description: Invalid token
 */
router.post('/', verifyToken, async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    const savedFlight = await newFlight.save();
    res.status(201).json(savedFlight);
  } catch (error) {
    res.status(400).json({ error: 'Invalid payload' });
  }
});

/**
 * @swagger
 * /flights/{flightId}:
 *   get:
 *     summary: Get a flight by ID
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: flightId
 *         schema:
 *           type: string
 *         required: true
 *         description: Flight ID
 *     responses:
 *       200:
 *         description: Flight details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flight'
 *       403:
 *         description: Access denied
 *       401:
 *         description: Invalid token
 *       404:
 *         description: Flight not found
 */
router.get('/:flightId', verifyToken, async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.flightId);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

/**
 * @swagger
 * /flights/{flightId}:
 *   patch:
 *     summary: Update a flight
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: flightId
 *         schema:
 *           type: string
 *         required: true
 *         description: Flight ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flight'
 *     responses:
 *       200:
 *         description: Flight updated successfully
 *       404:
 *         description: Flight not found
 *       400:
 *         description: Invalid payload
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Access denied
 *
 */
router.patch('/:flightId', verifyToken, async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(req.params.flightId, req.body, { new: true });
    if (!updatedFlight) return res.status(404).json({ error: 'Flight not found' });
    res.json(updatedFlight);
  } catch (error) {
    res.status(400).json({ error: 'Invalid payload' });
  }
});

/**
 * @swagger
 * /flights/{flightId}:
 *   delete:
 *     summary: Delete a flight
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: flightId
 *         schema:
 *           type: string
 *         required: true
 *         description: Flight ID
 *     responses:
 *       204:
 *         description: Flight deleted successfully
 *       404:
 *         description: Flight not found
 *       401:
 *         description: Invalid token
 *       403:
 *         description: Access denied
 */
router.delete('/:flightId', verifyToken, async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.flightId);
    if (!deletedFlight) return res.status(404).json({ error: 'Flight not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
