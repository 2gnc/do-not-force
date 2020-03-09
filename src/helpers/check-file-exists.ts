import * as fs from 'fs';

export default function(filePath: string): boolean {
    try {
        fs.statSync(filePath);
        return true;
    } catch (error) {
        return false;
    }
}
