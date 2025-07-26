import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  hero: any;
  about: any;
  campaigns: any;
  announcements: any;
  gallery: any;
  help: any;
  footer: any;
}

const ContentSchema: Schema = new Schema({
  hero: { type: Object, default: {} },
  about: { type: Object, default: {} },
  campaigns: { type: Object, default: {} },
  announcements: { type: Object, default: {} },
  gallery: { type: Object, default: {} },
  help: { type: Object, default: {} },
  footer: { type: Object, default: {} },
}, { timestamps: true });

const Content = mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);
export default Content; 