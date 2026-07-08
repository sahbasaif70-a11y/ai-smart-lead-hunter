import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
    cardType: string;
    extractedData: any;
    imageUrl: string;
    createdAt: Date;
}

const LeadSchema: Schema = new Schema({
    cardType: { type: String, required: true },
    extractedData: { type: Object, required: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ILead>('Lead', LeadSchema);
