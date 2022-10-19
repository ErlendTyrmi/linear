export interface User {
    id: string;
    modifiedTime: Date;
    name: string;
    email: string;
    agencyId: string;
    userName: string;
    canDownloadMaterial: boolean;
    canWrite: boolean;
    canRead: boolean;
}
