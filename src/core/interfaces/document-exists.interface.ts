export interface IDocumentExistService {
    exists(documentId: string): Promise<boolean>;
}
