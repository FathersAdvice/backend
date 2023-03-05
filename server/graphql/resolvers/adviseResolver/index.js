import { readFile, writeFile, updateFile } from '../crud';
export default {
  query: {
    getAdvices: () => readFile('advice'),
  }
}