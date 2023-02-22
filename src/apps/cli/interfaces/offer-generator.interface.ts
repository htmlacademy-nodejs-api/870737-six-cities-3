import { IOffer } from '../../../core/interfaces/offer.interface.js';

export interface IOfferGenerator {
    generateItem(): IOffer;
    generateTsvStr(): string;
}
