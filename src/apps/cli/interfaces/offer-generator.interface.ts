import { IOffer } from '../../../core';

export interface IOfferGenerator {
    generateItem(): IOffer;
    generateTsvStr(): string;
}
