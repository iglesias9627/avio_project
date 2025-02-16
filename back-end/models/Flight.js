import { Schema, model } from 'mongoose';

const FlightSchema = new Schema({
  aircraft: { type: String, required: true, maxlength: 10 },
  flightNumber: { type: String, required: true, maxlength: 10 },
  schedule: {
    std: { type: Date, required: true },
    sta: { type: Date, required: true },
  },
  departure: { type: String, required: true, minlength: 4, maxlength: 4 },
  destination: { type: String, required: true, minlength: 4, maxlength: 4 },
}, { collection: 'flights' });

export default model('Flight', FlightSchema);
