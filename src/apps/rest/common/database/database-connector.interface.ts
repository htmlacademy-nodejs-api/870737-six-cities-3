export interface IDatabaseConnector {
    connect(uri: string): Promise<void>;
    disconnect(): Promise<void>;
}
